import "./globals.css";
import { Inter } from "next/font/google";
import Notification from "../components/Notification";
import Aside from "../components/Aside";
import Header from "../components/Header";
import { Providers } from "../GlobalState/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WSSC-Dashboard",
  description: "Dashboard for WSSC company",
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
          {/* React-Toast Notifiction  */}
          <Notification />
          <Header />
          <div className="w-full mt-12 absolute ">
            <Aside />
            <main className="ml-[280px] mt-8 mr-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
