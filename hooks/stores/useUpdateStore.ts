import { storeInputSchema } from "@/lib/validations";
import { Store } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";

function useUpdateStore() {
    const queryClient = useQueryClient();

    const { mutate: updateStore, isPending: isUpdateStorePending } =
        useMutation({
            mutationKey: ["update-store"],
            mutationFn: async ({
                id,
                args,
            }: {
                id: string;
                args: z.infer<typeof storeInputSchema>;
            }) => {
                const response = await axios.patch(`/api/stores/${id}`, args);
                const data = response.data;
                return data;
            },
            onSuccess: () => {
                toast.success("Store updated successfully");
                queryClient.invalidateQueries({ queryKey: ["get-stores"] });
                queryClient.invalidateQueries({ queryKey: ["get-store"] });
            },
            onError: () => {
                toast.error("Failed to update store");
            },
        });

    return {
        updateStore,
        isUpdateStorePending,
    };
    return {};
}

export default useUpdateStore;
