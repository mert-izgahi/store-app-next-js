import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { storeInputSchema } from "@/lib/validations";
interface Props {
    params: {
        storeId: string;
    };
}

export async function GET(req: NextRequest, { params }: Props) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const store = await prisma.store.findUnique({
            where: {
                id: params.storeId,
            },
        });

        if (!store) {
            return new NextResponse("Store not found", { status: 404 });
        }

        if (store.userId !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return new NextResponse(JSON.stringify(store), { status: 200 });
    } catch (error) {
        console.log("STORE_GET: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const store = await prisma.store.delete({
            where: {
                id: params.storeId,
            },
        });

        return new NextResponse(JSON.stringify(store), { status: 200 });
    } catch (error) {
        console.log("STORE_DELETE: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: Props) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();

        const { name, description } = body;
        const isValid = storeInputSchema.safeParse({ name, description });

        if (!isValid.success) {
            return new NextResponse("Invalid input", { status: 400 });
        }

        const store = await prisma.store.update({
            where: {
                id: params.storeId,
            },
            data: {
                name,
                description,
            },
        });

        return new NextResponse(JSON.stringify(store), { status: 200 });
    } catch (error) {
        console.log("STORE_PATCH: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
