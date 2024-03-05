"use client";

import { useModalsContext } from "@/app/providers/ModalsProvider";
import useGetStores from "@/hooks/stores/useGetStores";
import {
    ActionIcon,
    Divider,
    Flex,
    Loader,
    NavLink,
    Stack,
    Text,
} from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    IoAdd,
    IoHome,
    IoSettings,
    IoStorefront,
    IoClipboard,
} from "react-icons/io5";
function Navbar({ activeStoreId }: { activeStoreId: string }) {
    const pathname = usePathname();
    const { onOpenStoreModal } = useModalsContext();
    const { stores, isLoadingStores } = useGetStores();
    const links = [
        {
            label: "Home",
            href: `/${activeStoreId}`,
            isActive: pathname === `/${activeStoreId}`,
            icon: <IoHome />,
        },
        {
            label: "Billboards",
            href: `/${activeStoreId}/billboards`,
            isActive: pathname === `/${activeStoreId}/billboards`,
            icon: <IoClipboard />,
        },
        {
            label: "Settings",
            href: `/${activeStoreId}/settings`,
            isActive: pathname === `/${activeStoreId}/settings`,
            icon: <IoSettings />,
        },
    ];
    return (
        <Stack>
            <Stack>
                <Flex align="center" justify="space-between">
                    <Text size="sm">Stores</Text>
                    <ActionIcon onClick={onOpenStoreModal}>
                        <IoAdd />
                    </ActionIcon>
                </Flex>

                <Stack>
                    {isLoadingStores ? (
                        <Loader size="xs" />
                    ) : (
                        stores?.map((store) => (
                            <NavLink
                                leftSection={<IoStorefront />}
                                key={store.id}
                                label={store.name}
                                component={Link}
                                href={`/${store.id}`}
                                active={store.id === activeStoreId}
                                variant="filled"
                            />
                        ))
                    )}
                </Stack>
            </Stack>
            <Divider my="sm" />
            <Stack>
                {links.map((link) => (
                    <NavLink
                        leftSection={link.icon}
                        key={link.label}
                        label={link.label}
                        component={Link}
                        href={link.href}
                        active={link.isActive}
                        variant="subtle"
                    />
                ))}
            </Stack>
        </Stack>
    );
}

export default Navbar;
