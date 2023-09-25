import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC } from "react";

import { AuthProvider } from "@/components";
import { IChildren } from "@/interface";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Change BD",
  description: "Generated by Baitul Hikmah Team",
};

const RootLayout: FC<IChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <AuthProvider>{children}</AuthProvider>
    </body>
  </html>
);

export default RootLayout;
