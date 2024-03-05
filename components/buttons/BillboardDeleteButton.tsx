"use client";

import { useModalsContext } from "@/app/providers/ModalsProvider";
import { ActionIcon } from "@mantine/core";
import React from "react";
import { BsTrash } from "react-icons/bs";
import DeleteBillboardModal from "../modals/DeleteBillboardModal";

interface Props {
    storeId: string;
    billboardId: string;
}

function BillboardDeleteButton({ storeId, billboardId }: Props) {
    const { onOpenDeleteBillboardModal } = useModalsContext();

    return (
        <>
            <ActionIcon color="red" onClick={onOpenDeleteBillboardModal}>
                <BsTrash />
            </ActionIcon>

            <DeleteBillboardModal params={{ storeId, billboardId }} />
        </>
    );
}

export default BillboardDeleteButton;
