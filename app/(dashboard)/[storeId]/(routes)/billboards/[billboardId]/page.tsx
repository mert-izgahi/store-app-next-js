import BillboardForm from "@/components/forms/BillboardForm";
import { auth } from "@clerk/nextjs";
import { Container, Stack, Text, Title } from "@mantine/core";
import React from "react";

interface Props {
    params: { storeId: string; billboardId: string };
}

function EditBillboardPage({ params }: Props) {
    const { userId } = auth();
    return (
        <Container fluid>
            <Stack mb="md">
                <Title>Edit Billboard</Title>
                <Text>Fill out the form to edit the billboard.</Text>
            </Stack>
            <BillboardForm
                storeId={params.storeId}
                billboardId={params.billboardId}
                userId={userId!}
            />
        </Container>
    );
}

export default EditBillboardPage;
