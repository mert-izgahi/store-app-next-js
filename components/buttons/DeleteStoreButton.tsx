"use client";

import { useModalsContext } from "@/app/providers/ModalsProvider";
import { ActionIcon } from "@mantine/core";
import React from "react";
import { BsTrash } from "react-icons/bs";

function DeleteStoreButton() {
    const { onOpenDeleteStoreModal } = useModalsContext();
    return (
        <ActionIcon color="red" onClick={onOpenDeleteStoreModal}>
            <BsTrash />
        </ActionIcon>
    );
}

export default DeleteStoreButton;
