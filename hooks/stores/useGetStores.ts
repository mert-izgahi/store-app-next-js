import { Store } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetStores() {
    const { data: stores, isLoading: isLoadingStores } = useQuery<Store[]>({
        queryKey: ["get-stores"],
        queryFn: async () => {
            const response = await axios.get("/api/stores");
            const _data = await response.data;
            return _data;
        },
    });

    return {
        stores,
        isLoadingStores,
    };
}

export default useGetStores;
