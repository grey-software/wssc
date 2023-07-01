import "../globals.css";
import { Inter } from "next/font/google";
import Notification from "../../components/Notification";

import { Providers } from "@/GlobalState/Provider";
import Navbar from "@/components/Supervisor components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "supervisor",
  description: "Supervisors to manage their activities"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={`-ml-[280px] -mr-10 -mt-20 overflow-x-hidden ${inter.className}`}
    >
      <Providers>
        {/* React-Toast notification */}
        <Notification />
        <Navbar />
        <main>{children}</main>
      </Providers>
    </section>
  );
}
