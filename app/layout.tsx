import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";
import { CartProvider } from "@/components/context/CartContext";
import {AuthProvider} from "@/components/context/AuthContext";



const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
        {/* Le CartProvider englobe toute l'application */}
        <AuthProvider>

            <CartProvider>

                <Navbar />
                <div className="flex-grow main-content">{children}</div>
                <Footer />


            </CartProvider>
        </AuthProvider>


        </body>
        </html>
    );
}
