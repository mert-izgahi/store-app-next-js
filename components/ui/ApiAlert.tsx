"use client";

import useOrigin from "@/hooks/utils/useOrigin";
import {
    ActionIcon,
    Badge,
    Code,
    CopyButton,
    Flex,
    Paper,
    Text,
} from "@mantine/core";
import React, { useMemo } from "react";
import { IoServerOutline } from "react-icons/io5";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";

interface Props {
    storeId: string;
    title: string;
    authType: "Public" | "Admin" | "User";
    method: "GET" | "POST" | "PUT" | "DELETE";
    collection: "stores";
}

function ApiAlert({ storeId, title, collection, authType, method }: Props) {
    const { origin } = useOrigin();
    const apiUrl = useMemo(() => {
        return `${origin}/api/${collection}/${storeId}`;
    }, [origin]);

    const apiAuthColor = useMemo(() => {
        switch (authType) {
            case "Public":
                return "blue";
            case "Admin":
                return "red";
            case "User":
                return "green";
            default:
                return "gray";
        }
    }, [authType]);

    const apiMethodColor = useMemo(() => {
        switch (method) {
            case "GET":
                return "blue";
            case "POST":
                return "green";
            case "PUT":
                return "yellow";
            case "DELETE":
                return "red";
            default:
                return "gray";
        }
    }, [method]);

    return (
        <Paper withBorder p={"md"}>
            <Flex align={"center"} gap={"md"} mb={"md"}>
                <IoServerOutline />
                <Text>{title}</Text>
                <Badge radius="xs" color={apiAuthColor} ml={"xl"}>
                    {authType}
                </Badge>

                <Badge radius="xs" color={apiMethodColor} ml={"auto"}>
                    {method}
                </Badge>
            </Flex>

            <Flex align={"center"} gap={"md"}>
                <Code fw={"bolder"} w={"100%"} p={"sm"}>
                    {apiUrl}
                </Code>
                <CopyButton value={apiUrl}>
                    {({ copied, copy }) => (
                        <ActionIcon
                            color={copied ? "teal" : "gray"}
                            onClick={copy}
                            size={"lg"}
                        >
                            {copied ? <IoCheckmark /> : <IoCopyOutline />}
                        </ActionIcon>
                    )}
                </CopyButton>
            </Flex>
        </Paper>
    );
}

export default ApiAlert;
