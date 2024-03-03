"use client";

import { Button, Flex, Loader, NavLink, Select, Text } from "@mantine/core";
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
    return (
        <Flex h={60} align="center" gap={"md"} px={"md"}>
            <Text component={Link} href="/">
                Shop-it
            </Text>
            <Flex ms={"auto"}>
                <UserButton afterSignOutUrl="/" />
            </Flex>
        </Flex>
    );
}

export default Header;
