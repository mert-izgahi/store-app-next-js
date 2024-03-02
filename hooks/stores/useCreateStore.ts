import { useModalsContext } from "@/app/providers/ModalsProvider";
import { storeInputSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

function useCreateStore() {
    const { onCloseStoreModal } = useModalsContext();
    const { mutate: createStore, isPending: isCreateStorePending } =
        useMutation({
            mutationKey: ["create-store"],
            mutationFn: async (args: z.infer<typeof storeInputSchema>) => {
                await axios.post("/api/stores", args);
            },
            onSuccess: () => {
                onCloseStoreModal();
                toast.success("Store created successfully");
            },
            onError: () => {
                toast.error("Failed to create store");
            },
        });

    return {
        createStore,
        isCreateStorePending,
    };
}

export default useCreateStore;
