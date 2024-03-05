import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetBillboard(storeId: string, billboardId: string) {
    const { data: billboard, isLoading: isLoadingBillboard } = useQuery({
        queryKey: ["get-billboard", storeId, billboardId],
        queryFn: async () => {
            const response = await axios.get(
                `/api/stores/${storeId}/billboards/${billboardId}`
            );
            const _data = await response.data;

            return _data;
        },
    });

    return {
        billboard,
        isLoadingBillboard,
    };
}

export default useGetBillboard;
