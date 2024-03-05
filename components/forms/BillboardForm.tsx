"use client";
import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { billboardInputSchema } from "@/lib/validations";
import { z } from "zod";
import {
    Box,
    Button,
    FileInput,
    Image,
    Skeleton,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import { CldUploadWidget } from "next-cloudinary";
import useCreateBillboard from "@/hooks/billboards/useCreateBillboard";
import useGetBillboards from "@/hooks/billboards/useGetBillboards";
import useGetBillboard from "@/hooks/billboards/useGetBillboard";
import useUpdateBillboard from "@/hooks/billboards/useUpdateBillboard";

interface Props {
    storeId: string;
    billboardId?: string;
    userId: string;
}
function BillboardForm({ storeId, billboardId, userId }: Props) {
    const { createBillboard, isCreatingBillboard } = useCreateBillboard();
    const { updateBillboard, isUpdateBillboardPending } = useUpdateBillboard();
    const form = useForm<z.infer<typeof billboardInputSchema>>({
        initialValues: {
            storeId,
            userId,
            name: "",
            description: "",
            image: "",
        },
        validate: zodResolver(billboardInputSchema),
    });

    const { billboard } = useGetBillboard(storeId, billboardId!);

    const onSubmit = async (data: z.infer<typeof billboardInputSchema>) => {
        if (billboardId) {
            await updateBillboard({
                id: billboardId,
                args: { ...data },
            });
        } else {
            await createBillboard(data);
        }
    };

    useEffect(() => {
        if (billboard) {
            form.setValues(billboard);
        }
    }, [billboard]);

    return (
        <form onSubmit={form.onSubmit(onSubmit)} noValidate>
            <Stack>
                <TextInput
                    label="Name"
                    placeholder="Billboard Name"
                    withAsterisk
                    {...form.getInputProps("name")}
                />
                <Box>
                    {form.values.image ? (
                        <Image
                            src={form.values.image}
                            width={600}
                            height={300}
                        />
                    ) : (
                        <Skeleton width={"100%"} height={300} />
                    )}
                </Box>
                <CldUploadWidget
                    uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    onSuccess={(result, { widget }) => {
                        if (!result?.info) return;
                        // @ts-ignore
                        const url = result?.info?.url as string;
                        form.setFieldValue("image", url);
                        widget.close();
                    }}
                >
                    {({ open }) => {
                        function handleOnClick() {
                            open();
                        }
                        return (
                            <Button onClick={handleOnClick}>
                                Upload Image
                            </Button>
                        );
                    }}
                </CldUploadWidget>

                <Textarea
                    label="Description"
                    placeholder="Billboard Description"
                    withAsterisk
                    {...form.getInputProps("description")}
                />

                <Button
                    type="submit"
                    style={{ alignSelf: "flex-end" }}
                    disabled={isCreatingBillboard || isUpdateBillboardPending}
                    loading={isCreatingBillboard || isUpdateBillboardPending}
                >
                    {billboardId ? "Update" : "Create"}
                </Button>
            </Stack>
        </form>
    );
}

export default BillboardForm;
