"use client";
import { useModalsContext } from "@/app/providers/ModalsProvider";
import useCreateStore from "@/hooks/stores/useCreateStore";
import { storeInputSchema } from "@/lib/validations";
import { Button, Flex, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React from "react";
import { z } from "zod";

function StoreModal() {
    const { isOpenStoreModal, onCloseStoreModal } = useModalsContext();
    const { createStore, isCreateStorePending } = useCreateStore();
    const form = useForm<z.infer<typeof storeInputSchema>>({
        initialValues: {
            name: "",
            description: "",
        },
        validate: zodResolver(storeInputSchema),
    });
    const onSubmit = (data: z.infer<typeof storeInputSchema>) =>
        createStore(data);
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

                    <Textarea
                        label="Description"
                        placeholder="E-Commerce Description"
                        {...form.getInputProps("description")}
                    />

                    <Flex justify="flex-end" gap="md">
                        <Button
                            type="button"
                            variant="subtle"
                            onClick={onCloseStoreModal}
                        >
                            Close
                        </Button>
                        <Button
                            loading={isCreateStorePending}
                            disabled={isCreateStorePending}
                            type="submit"
                        >
                            Continue
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </Modal>
    );
}

export default StoreModal;
