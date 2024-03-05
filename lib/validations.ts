import { z } from "zod";

export const storeInputSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
});

export const billboardInputSchema = z.object({
    storeId: z.string().min(1, "Store is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image is required"),
    userId: z.string().min(1, "User is required"),
});
