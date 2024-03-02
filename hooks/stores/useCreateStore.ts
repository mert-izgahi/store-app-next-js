import { useModalsContext } from "@/app/providers/ModalsProvider";
import { storeInputSchema } from "@/lib/validations";
import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

function useCreateStore() {
    const { onCloseStoreModal } = useModalsContext();
    const router = useRouter();
    const { mutate: createStore, isPending: isCreateStorePending } =
        useMutation({
            mutationKey: ["create-store"],
            mutationFn: async (args: z.infer<typeof storeInputSchema>) => {
                const response = await axios.post("/api/stores", args);
                const data = response.data;
                return data;
            },
            onSuccess: (data: Store) => {
                onCloseStoreModal();
                toast.success("Store created successfully");
                const { id } = data;
                router.push(`/${id}`);
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
