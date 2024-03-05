import { billboardInputSchema, storeInputSchema } from "@/lib/validations";
import { Store } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

function useUpdateBillboard() {
    const queryClient = useQueryClient();

    const { mutate: updateBillboard, isPending: isUpdateBillboardPending } =
        useMutation({
            mutationKey: ["update-billboard"],
            mutationFn: async ({
                id,
                args,
            }: {
                id: string;
                args: z.infer<typeof billboardInputSchema>;
            }) => {
                console.log(args);

                const response = await axios.patch(
                    `/api/stores/${args.storeId}/billboards/${id}`,
                    args
                );
                const data = response.data;
                return data;
            },
            onSuccess: () => {
                toast.success("Billboard updated successfully");
                queryClient.invalidateQueries({ queryKey: ["get-billboards"] });
                queryClient.invalidateQueries({ queryKey: ["get-billboard"] });
            },
            onError: () => {
                toast.error("Failed to update billboard");
            },
        });

    return {
        updateBillboard,
        isUpdateBillboardPending,
    };
}

export default useUpdateBillboard;
