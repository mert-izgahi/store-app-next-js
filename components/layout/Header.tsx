"use client";

import {
    Button,
    Flex,
    Group,
    Loader,
    NavLink,
    Select,
    Text,
} from "@mantine/core";
import React, { useMemo } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useModalsContext } from "@/app/providers/ModalsProvider";
import { usePathname, useRouter } from "next/navigation";
import { BsShopWindow } from "react-icons/bs";
import useGetStores from "@/hooks/stores/useGetStores";

interface Props {
    activeStoreId: string;
}
function Header({ activeStoreId }: Props) {
    const pathname = usePathname();
    const links = [
        {
            label: "Home",
            href: `/${activeStoreId}`,
            isActive: pathname === `/${activeStoreId}`,
        },
        {
            label: "Settings",
            href: `/${activeStoreId}/settings`,
            isActive: pathname === `/${activeStoreId}/settings`,
        },
    ];
    const { stores, isLoadingStores } = useGetStores();
    const { onOpenStoreModal } = useModalsContext();
    const router = useRouter();
    const storesData = useMemo(() => {
        if (!stores) return [];
        return stores.map((store) => ({
            value: store.id,
            label: store.name,
        }));
    }, [stores]);

    const onStoreChange = (storeId: string) => {
        router.push(`/${storeId}`);
    };

    return (
        <Flex h={60} align="center" gap={"md"}>
            <Select
                disabled={isLoadingStores}
                rightSection={isLoadingStores ? <Loader size="xs" /> : null}
                data={storesData}
                value={activeStoreId}
                allowDeselect={false}
                searchable={true}
                leftSection={<BsShopWindow />}
                onChange={(id) => {
                    onStoreChange(id!);
                }}
            />
            <Button type="button" onClick={onOpenStoreModal}>
                New Store
            </Button>
            {/* <Button
                type="button"
                variant="subtle"
                component={Link}
                href={`/${activeStoreId}/settings`}
            >
                Settings
            </Button> */}
            <Flex align="center" gap="md">
                {links.map((link) => (
                    <NavLink
                        key={link.label}
                        label={link.label}
                        component={Link}
                        href={link.href}
                        active={link.isActive}
                        variant="subtle"
                        styles={{
                            root: {
                                borderRadius: "var(--mantine-radius-sm)",
                            },
                        }}
                    />
                ))}
            </Flex>
            <Flex ms={"auto"}>
                <UserButton afterSignOutUrl="/" />
            </Flex>
        </Flex>
    );
}

export default Header;
