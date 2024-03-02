import React from "react";
import { Toaster } from "react-hot-toast";
function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster />
            {children}
        </>
    );
}

export default ToastProvider;
