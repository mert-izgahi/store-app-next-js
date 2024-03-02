"use client";
import { MantineProvider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ModalsProvider from "./ModalsProvider";
import theme from "../theme";
import ReactQueryProvider from "./ReactQueryProvider";
import ToastProvider from "./ToastProvider";

function Providers({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <MantineProvider theme={theme}>
            <ReactQueryProvider>
                <ModalsProvider>
                    <ToastProvider>{children}</ToastProvider>
                </ModalsProvider>
            </ReactQueryProvider>
        </MantineProvider>
    );
}

export default Providers;
