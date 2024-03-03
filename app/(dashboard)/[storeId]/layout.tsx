import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import React from "react";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    Container,
    Group,
} from "@mantine/core";
import Header from "@/components/layout/Header";
import StoreModal from "@/components/modals/StoreModal";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import DeleteStoreModal from "@/components/modals/DeleteStoreModal";

interface Props {
    children: React.ReactNode;
    params: { storeId: string };
}

async function layout({ children, params }: Props) {
    const { userId } = auth();
    const queryClient = new QueryClient();
    if (!userId) {
        return redirect("/sign-in");
    }

    const store = await prisma.store.findUnique({
        where: {
            id: params.storeId,
        },
    });

    if (!store) {
        return redirect("/");
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AppShell padding="md" header={{ height: 60 }}>
                <AppShellHeader withBorder={false} bg={"gray.1"}>
                    <Container size="xl">
                        <Header activeStoreId={store.id} />
                    </Container>
                </AppShellHeader>
                <AppShellMain>
                    <Container size="xl" py={"xl"}>
                        <StoreModal isOpen={false} />
                        <DeleteStoreModal storeId={store.id} />
                        {children}
                    </Container>
                </AppShellMain>
            </AppShell>
        </HydrationBoundary>
    );
}

export default layout;
