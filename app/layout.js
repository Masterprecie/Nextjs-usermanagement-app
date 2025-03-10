import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next js course",
  description: "This is Next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-[90%] mx-auto">{children}</body>
    </html>
  );
}
