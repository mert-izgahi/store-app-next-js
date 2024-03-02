"use client";
import { useModalsContext } from "@/app/providers/ModalsProvider";
import { Button, Flex, Modal, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React from "react";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

function StoreModal() {
    const { isOpenStoreModal, onCloseStoreModal } = useModalsContext();

    const form = useForm<z.infer<typeof formSchema>>({
        initialValues: {
            name: "",
        },
        validate: zodResolver(formSchema),
    });
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };
    return (
        <Modal
            title="Create Store"
            opened={isOpenStoreModal}
            onClose={onCloseStoreModal}
        >
            <form onSubmit={form.onSubmit(onSubmit)} noValidate>
                <Stack>
                    <TextInput
                        label="Name"
                        description="E-Commerce name will be used as store name"
                        placeholder="E-Commerce Name"
                        withAsterisk
                        {...form.getInputProps("name")}
                    />
                    <Flex justify="flex-end" gap="md">
                        <Button
                            type="button"
                            variant="subtle"
                            onClick={onCloseStoreModal}
                        >
                            Close
                        </Button>
                        <Button type="submit">Continue</Button>
                    </Flex>
                </Stack>
            </form>
        </Modal>
    );
}

export default StoreModal;
