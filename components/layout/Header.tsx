"use client";

import { Button, Flex, Group, Loader, Select, Text } from "@mantine/core";
import React, { useMemo } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useModalsContext } from "@/app/providers/ModalsProvider";
import { useRouter } from "next/navigation";
import { BsShopWindow } from "react-icons/bs";
import useGetStores from "@/hooks/stores/useGetStores";

interface Props {
    activeStoreId: string;
}
function Header({ activeStoreId }: Props) {
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
        <Group h="100%" align="center">
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
            <Text component={Link} href="/">
                Settings
            </Text>
            <Flex ms={"auto"}>
                <UserButton afterSignOutUrl="/" />
            </Flex>
        </Group>
    );
}

export default Header;
