import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetStore(id: string) {
    const { data: store, isLoading: isLoadingStore } = useQuery({
        queryKey: ["get-store", id],
        queryFn: async () => {
            const response = await axios.get(`/api/stores/${id}`);
            const _data = await response.data;
            console.log(_data);

            return _data;
        },
    });

    return {
        store,
        isLoadingStore,
    };
}

export default useGetStore;
