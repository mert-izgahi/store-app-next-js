"use client";

import { useModalsContext } from "@/app/providers/ModalsProvider";
import useDeleteStore from "@/hooks/stores/useDeleteStore";
import { Alert, Button, Flex, Modal, Stack, Text } from "@mantine/core";
import React from "react";
import { BsTrash } from "react-icons/bs";

interface Props {
    storeId: string;
}

function DeleteStoreModal({ storeId }: Props) {
    const { isOpenDeleteStoreModal, onCloseDeleteStoreModal } =
        useModalsContext();

    const { deleteStore, isDeleteStorePending } = useDeleteStore();

    return (
        <Modal
            opened={isOpenDeleteStoreModal}
            onClose={onCloseDeleteStoreModal}
            title="Delete Store"
        >
            <Stack gap="xl">
                <Alert
                    variant="light"
                    color="red"
                    title="Delete Store Action"
                    icon={<BsTrash />}
                >
                    <Text>Are you sure you want to delete this store?</Text>
                    <Text c="red" size="sm">
                        This action cannot be undone.
                    </Text>
                </Alert>
                <Flex justify="flex-end" gap="md">
                    <Button onClick={onCloseDeleteStoreModal} type="button">
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        type="button"
                        onClick={() => deleteStore(storeId)}
                        disabled={isDeleteStorePending}
                        loading={isDeleteStorePending}
                    >
                        Delete
                    </Button>
                </Flex>
            </Stack>
        </Modal>
    );
}

export default DeleteStoreModal;
