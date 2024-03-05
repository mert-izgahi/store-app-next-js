import { billboardInputSchema } from "@/lib/validations";
import { Billboard } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

function useCreateBillboard() {
    const queryClient = useQueryClient();

    const { mutate: createBillboard, isPending: isCreatingBillboard } =
        useMutation({
            mutationKey: ["create-billboard"],
            mutationFn: async (args: z.infer<typeof billboardInputSchema>) => {
                const response = await axios.post("/api/billboards", args);
                const data = response.data;
                return data;
            },
            onSuccess: (data: Billboard) => {
                toast.success("Billboard created successfully");

                queryClient.invalidateQueries({ queryKey: ["get-billboards"] });
            },
            onError: () => {
                toast.error("Failed to create billboard");
            },
        });

    return {
        createBillboard,
        isCreatingBillboard,
    };
}

export default useCreateBillboard;
