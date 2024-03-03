import DeleteStoreButton from "@/components/buttons/DeleteStoreButton";
import SettingsForm from "@/components/forms/SettingsForm";
import ApiAlert from "@/components/ui/ApiAlert";
import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import React from "react";

interface Props {
    params: { storeId: string };
}

function SettingsPage({ params }: Props) {
    const { storeId } = params;

    return (
        <Container fluid>
            <Stack>
                <Flex align="flex-start" justify="space-between">
                    <Stack>
                        <Title>Settings</Title>
                        <Text>Manage your store settings.</Text>
                    </Stack>

                    <DeleteStoreButton />
                </Flex>

                <SettingsForm storeId={storeId} />

                <ApiAlert
                    storeId={storeId}
                    collection="stores"
                    title="Get Store Data"
                    authType="Admin"
                    method="GET"
                />
            </Stack>
        </Container>
    );
}

export default SettingsPage;
