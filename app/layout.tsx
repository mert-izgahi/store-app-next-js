import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";

import Providers from "./providers";
import StoreModal from "@/components/modals/StoreModal";

const font = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
    title: "Store Admin Dashboard",
    description: "Store Admin Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={font.className}>
                    <Providers>
                        <StoreModal />
                        {children}
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
