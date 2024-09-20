import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import "../style/globals.scss";
import { AuthProvider } from "@/components/context/AuthContext";

const raleway = Raleway({ subsets: ["latin"] });

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
      <body className={raleway.className}>
        <AuthProvider>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
