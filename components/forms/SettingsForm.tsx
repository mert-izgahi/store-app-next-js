"use client";
import useGetStore from "@/hooks/stores/useGetStore";
import useGetStores from "@/hooks/stores/useGetStores";
import useUpdateStore from "@/hooks/stores/useUpdateStore";
import { storeInputSchema } from "@/lib/validations";
import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Store } from "@prisma/client";
import React, { useEffect } from "react";
import { z } from "zod";

interface Props {
    storeId: string;
}

function SettingsForm({ storeId }: Props) {
    const { store, isLoadingStore } = useGetStore(storeId);
    const { updateStore, isUpdateStorePending } = useUpdateStore();
    const form = useForm<z.infer<typeof storeInputSchema>>({
        initialValues: {
            name: "",
            description: "",
        },
        validate: zodResolver(storeInputSchema),
    });

    const onSubmit = async (data: z.infer<typeof storeInputSchema>) => {
        const args = {
            id: storeId,
            name: data.name,
            description: data.description,
        } as Store;

        if (updateStore) {
            await updateStore({ id: storeId, args });
        }
    };

    useEffect(() => {
        if (store) {
            form.setValues({
                name: store.name,
                description: store.description,
            });
        }
    }, [store]);

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
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
                    description="E-Commerce description will be used as store description"
                    placeholder="E-Commerce Description"
                    withAsterisk
                    {...form.getInputProps("description")}
                />

                <Button
                    disabled={isUpdateStorePending}
                    loading={isUpdateStorePending}
                    style={{ alignSelf: "flex-start" }}
                    type="submit"
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
}

export default SettingsForm;
