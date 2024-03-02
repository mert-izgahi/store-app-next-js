import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import React from "react";
import { AppShell, AppShellHeader, AppShellMain, Group } from "@mantine/core";
import Header from "@/components/layout/Header";
import StoreModal from "@/components/modals/StoreModal";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";

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
                <AppShellHeader withBorder={false} bg={"gray.1"} p="md">
                    <Header activeStoreId={store.id} currentUserId={userId} />
                </AppShellHeader>
                <AppShellMain>
                    <StoreModal />
                </AppShellMain>
                {children}
            </AppShell>
        </HydrationBoundary>
    );
}

export default layout;
