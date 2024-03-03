import { useModalsContext } from "@/app/providers/ModalsProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useDeleteStore() {
    const queryClient = useQueryClient();
    const { onCloseDeleteStoreModal } = useModalsContext();
    const router = useRouter();
    const { mutate: deleteStore, isPending: isDeleteStorePending } =
        useMutation({
            mutationKey: ["delete-store"],
            mutationFn: async (id: string) => {
                const response = await axios.delete(`/api/stores/${id}`);
                const data = response.data;
                return data;
            },
            onSuccess: () => {
                toast.success("Store deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["get-stores"] });
                onCloseDeleteStoreModal();
                router.refresh();
            },
            onError: () => {
                toast.error("Failed to delete store");
            },
        });

    return {
        deleteStore,
        isDeleteStorePending,
    };
}

export default useDeleteStore;
