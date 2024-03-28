import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import BottomNav from "./_components/BottomNav";
import Provider from "@/utils/Providers";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Expense",
  description:		"It is a website to keep track of your financial expenses in a convenient and organized way. It typically allows you to input information about your purchases, income, and other financial transactions, and provides tools for analyzing and categorizing this information to help you better understand your spending habits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Toaster/>
          <NavBar/>
          {children}
          <BottomNav/>
        </body>
      </Provider>
    </html>
  );
}
