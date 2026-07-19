import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "E-Shop",
  description: "Plateforme e-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-black">

        <Navbar />

        {children}

        <Footer />

        <Toaster />

      </body>
    </html>
  );
}