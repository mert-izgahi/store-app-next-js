import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { billboardInputSchema } from "@/lib/validations";
interface Props {
    params: {
        storeId: string;
        billboardId: string;
    };
}

export async function GET(req: NextRequest, { params }: Props) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            },
        });

        if (!billboard) {
            return new NextResponse("Billboard not found", { status: 404 });
        }

        if (billboard.userId !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return new NextResponse(JSON.stringify(billboard), { status: 200 });
    } catch (error) {
        console.log("BILLBOARD_GET: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const billboard = await prisma.billboard.delete({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            },
        });

        return new NextResponse(JSON.stringify("billboard"), { status: 200 });
    } catch (error) {
        console.log("BILLBOARD_DELETE: ", error);
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

        const isValid = billboardInputSchema.safeParse({
            ...body,
        });

        if (!isValid.success) {
            return new NextResponse("Invalid input", { status: 400 });
        }

        const billboard = await prisma.billboard.update({
            where: {
                id: params.billboardId,
            },
            data: {
                ...body,
            },
        });

        return new NextResponse(JSON.stringify(billboard), { status: 200 });
    } catch (error) {
        console.log("BILLBOARD_PATCH: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
