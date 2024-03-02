import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { storeInputSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
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

        const store = await prisma.store.create({
            data: {
                name,
                description,
                userId,
            },
        });

        return new NextResponse(JSON.stringify(store), { status: 201 });
    } catch (error) {
        console.log("STORES_POST: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
