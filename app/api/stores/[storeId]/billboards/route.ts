import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { billboardInputSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await req.json();

        const isValid = billboardInputSchema.safeParse(body);

        if (!isValid.success) {
            return new NextResponse("Invalid input", { status: 400 });
        }

        const billboard = await prisma.billboard.create({
            data: {
                ...body,
                userId,
            },
        });

        return new NextResponse(JSON.stringify(billboard), { status: 201 });
    } catch (error) {
        console.log("BILLBOARDS_POST: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const billboards = await prisma.billboard.findMany({
            where: {
                userId,
            },
            include: {
                store: true,
            },
        });
        return new NextResponse(JSON.stringify(billboards), { status: 200 });
    } catch (error) {
        console.log("BILLBOARDS_GET: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
