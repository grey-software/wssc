import "../globals.css";
import { Inter } from "next/font/google";

import { Providers } from "../GlobalState/Provider";
import Navbar from "@/components/Supervisor components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "supervisor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        <Providers>
          <Navbar />
            <main className=" ">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
