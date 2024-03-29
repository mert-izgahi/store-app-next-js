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

    const store = await prisma.store.findFirst({
        where: {
            userId,
        },
    });

    if (store) {
        return redirect(`/${store.id}`);
    }

    return <>{children}</>;
}

export default layout;
