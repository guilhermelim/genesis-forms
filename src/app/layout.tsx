import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/auth/context/JWTContext";
import Menu from "@/components/Menu";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Genesis - Seleção de Membros e Serviços",
  description: "Aplicação para gerenciamento de membros e serviços",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <DataProvider>
            <Menu />
            {children}
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
