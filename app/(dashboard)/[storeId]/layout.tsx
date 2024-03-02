import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import React from "react";

interface Props {
    children: React.ReactNode;
    params: { storeId: string };
}

async function layout({ children, params }: Props) {
    const { userId } = auth();
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
        <>
            <>Sidebar</>
            {children}
        </>
    );
}

export default layout;
