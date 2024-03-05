import BillboardForm from "@/components/forms/BillboardForm";
import { auth } from "@clerk/nextjs";
import { Container, Stack, Text, Title } from "@mantine/core";
import React from "react";

interface Props {
    params: { storeId: string };
}

function CreateBillboardPage({ params }: Props) {
    const { userId } = auth();
    return (
        <Container fluid>
            <Stack mb="md">
                <Title>Create Billboard</Title>
                <Text>Fill out the form to create a new billboard.</Text>
            </Stack>
            <BillboardForm storeId={params.storeId} userId={userId!} />
        </Container>
    );
}

export default CreateBillboardPage;
