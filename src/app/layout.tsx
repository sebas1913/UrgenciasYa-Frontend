import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./style/globals.scss";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar";

const inter = Poppins({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Urgencias YA",
  description: "Encuentra rápidamente clínicas cercanas a tu ubicación basadas en tu EPS, que pueden atenderte en caso de urgencia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
