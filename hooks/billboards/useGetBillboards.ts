import { Billboard } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetBillboards(storeId: string) {
    const { data: billboards, isLoading: isLoadingBillboards } = useQuery<
        Billboard[]
    >({
        queryKey: ["get-billboards"],
        queryFn: async () => {
            const response = await axios.get(
                `/api/stores/${storeId}/billboards`
            );
            const _data = await response.data;
            return _data;
        },
    });

    return {
        billboards,
        isLoadingBillboards,
    };
}

export default useGetBillboards;
