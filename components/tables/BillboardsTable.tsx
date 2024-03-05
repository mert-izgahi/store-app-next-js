"use client";
import useGetBillboards from "@/hooks/billboards/useGetBillboards";
import React from "react";
import { DataTable } from "mantine-datatable";
import dayjs from "dayjs";
import Link from "next/link";
import { Anchor } from "@mantine/core";
import BillboardDeleteButton from "../buttons/BillboardDeleteButton";

interface Props {
    storeId: string;
}

function BillboardsTable({ storeId, ...props }: Props) {
    const { billboards, isLoadingBillboards } = useGetBillboards(storeId);

    const columns = [
        {
            accessor: "id",
            title: "ID",
            width: "400px",
        },
        {
            accessor: "name",
            title: "Name",
            width: "400px",
            render: (record: any) => {
                return (
                    <Anchor href={`/${storeId}/billboards/${record.id}`}>
                        {record.name}
                    </Anchor>
                );
            },
        },
        {
            accessor: "description",
            title: "Description",
        },
        {
            accessor: "created_at",
            title: "Created At",
            render: (record: any) => {
                return dayjs(record.created_at).format("DD/MM/YYYY");
            },
        },
        {
            accessor: "#",
            title: "Actions",
            render: (record: any) => {
                return (
                    <>
                        <BillboardDeleteButton
                            storeId={storeId}
                            billboardId={record.id}
                        />
                    </>
                );
            },
        },
    ];
    return (
        <DataTable
            minHeight={300}
            columns={columns}
            records={billboards}
            withTableBorder
            withRowBorders={false}
            withColumnBorders
            fetching={isLoadingBillboards}
            {...props}
        />
    );
}

export default BillboardsTable;
