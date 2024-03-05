import { useModalsContext } from "@/app/providers/ModalsProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useDeleteBillboard() {
    const queryClient = useQueryClient();
    const { onCloseDeleteBillboardModal } = useModalsContext();

    const router = useRouter();
    const { mutate: deleteBillboard, isPending: isDeleteBillboardPending } =
        useMutation({
            mutationKey: ["delete-billboard"],
            mutationFn: async ({
                id,
                storeId,
            }: {
                id: string;
                storeId: string;
            }) => {
                const response = await axios.delete(
                    `/api/stores/${storeId}/billboards/${id}`
                );
                const data = response.data;
                return data;
            },
            onSuccess: () => {
                toast.success("Store deleted successfully");
                queryClient.invalidateQueries({
                    queryKey: ["get-billboards"],
                });
                onCloseDeleteBillboardModal();
                router.refresh();
            },
            onError: () => {
                toast.error("Failed to delete store");
            },
        });

    return {
        deleteBillboard,
        isDeleteBillboardPending,
    };
}

export default useDeleteBillboard;
