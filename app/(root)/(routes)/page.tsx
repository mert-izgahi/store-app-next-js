import StoreModal from "@/components/modals/StoreModal";
import {
    dehydrate,
    QueryClient,
    HydrationBoundary,
} from "@tanstack/react-query";
export default function Home() {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StoreModal />
        </HydrationBoundary>
    );
}
