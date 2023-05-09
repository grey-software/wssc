import "./globals.css";
import { Inter } from "next/font/google";
import Notification from "../components/Notification";
import Aside from "../components/Aside";
import Header from "../components/Header";
import { Providers } from "./GlobalState/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WSSC-Dashboard",
  description: "Dashboard for WSSC complaints management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="flex w-full">
          <Providers>
            <Notification />
            <Aside />
            <div className="pl-[200px] w-full">
              <Header />
              <main className="ml-8 mt-6 mr-8">{children}</main>
            </div>
          </Providers>
        </section>
      </body>
    </html>
  );
}
