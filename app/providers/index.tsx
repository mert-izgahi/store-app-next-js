"use client";
import { MantineProvider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ModalsProvider from "./ModalsProvider";
import theme from "../theme";

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
            <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
    );
}

export default Providers;
