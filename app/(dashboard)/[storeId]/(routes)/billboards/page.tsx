import BillboardsTable from "@/components/tables/BillboardsTable";
import { Button, Container, Flex, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface Props {
    params: { storeId: string };
}
function Billboards({ params }: Props) {
    const storeId = params.storeId;
    return (
        <Container fluid>
            <Flex align="flex-start" justify="space-between" mb="xl">
                <Stack>
                    <Title>Billboards</Title>
                    <Text>Manage your billboards.</Text>
                </Stack>

                <Button component={Link} href={`/${storeId}/billboards/create`}>
                    Create Billboard
                </Button>
            </Flex>

            <BillboardsTable storeId={storeId} />
        </Container>
    );
}

export default Billboards;
