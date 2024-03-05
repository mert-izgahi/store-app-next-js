"use client";

import { useModalsContext } from "@/app/providers/ModalsProvider";
import useDeleteBillboard from "@/hooks/billboards/useDeleteBillboard";
import { Alert, Button, Flex, Modal, Stack, Text } from "@mantine/core";
import React from "react";
import { BsTrash } from "react-icons/bs";

interface Props {
    params: {
        storeId: string;
        billboardId: string;
    };
}

function DeleteBillboardModal({ params }: Props) {
    const { isOpenDeleteBillboardModal, onCloseDeleteBillboardModal } =
        useModalsContext();
    const { deleteBillboard, isDeleteBillboardPending } = useDeleteBillboard();
    return (
        <Modal
            opened={isOpenDeleteBillboardModal}
            onClose={onCloseDeleteBillboardModal}
            title="Delete Store"
        >
            <Stack gap="xl">
                <Alert
                    variant="light"
                    color="red"
                    title="Delete Store Action"
                    icon={<BsTrash />}
                >
                    <Text>Are you sure you want to delete this billboard?</Text>
                    <Text c="red" size="sm">
                        This action cannot be undone.
                    </Text>
                </Alert>
                <Flex justify="flex-end" gap="md">
                    <Button onClick={onCloseDeleteBillboardModal} type="button">
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        type="button"
                        onClick={() =>
                            deleteBillboard({
                                id: params.billboardId,
                                storeId: params.storeId,
                            })
                        }
                        disabled={isDeleteBillboardPending}
                        loading={isDeleteBillboardPending}
                    >
                        Delete
                    </Button>
                </Flex>
            </Stack>
        </Modal>
    );
}

export default DeleteBillboardModal;
