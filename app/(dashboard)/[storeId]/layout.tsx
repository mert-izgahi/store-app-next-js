import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import React from "react";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
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
import Navbar from "@/components/layout/Navbar";
import DeleteBillboardModal from "@/components/modals/DeleteBillboardModal";

interface Props {
    children: React.ReactNode;
    params: { storeId: string; billboardId?: string };
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
            <AppShell
                padding="md"
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "sm",
                }}
            >
                <AppShellHeader withBorder={false} bg={"gray.1"}>
                    <Header activeStoreId={store.id} />
                </AppShellHeader>
                <AppShellNavbar p={"md"}>
                    <Navbar activeStoreId={store.id} />
                </AppShellNavbar>
                <AppShellMain>
                    <StoreModal isOpen={false} />
                    <DeleteStoreModal storeId={store.id} />

                    {children}
                </AppShellMain>
            </AppShell>
        </HydrationBoundary>
    );
}

export default layout;
