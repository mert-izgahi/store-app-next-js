import { Center } from "@mantine/core";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
    return <Center h={"100vh"}>{children}</Center>;
}

export default layout;
