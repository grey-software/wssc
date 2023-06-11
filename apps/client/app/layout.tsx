import Header from "@/components/Header";
import "./globals.css";
import { Providers } from "../global_state/Provider";
import Notification from "@/components/Notification";
import DesktopMenu from "@/components/DesktopMenu";

export const metadata = {
  title: "WSSCM",
  description: "Water & Sanitation Services Company Mardan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className="bg-white sm:bg-slate-100 md:bg-slate-100 lg:bg-slate-100 xl:bg-slate-100">
          <Providers>
            {/* Toast - Notification */}
            <Notification />

            <Header />
            <main className="flex items-center justify-center m-auto w-screen">
              <div className="grid grid-cols-3 mx-0  sm:mx-0 md:mx-3 lg:mx-3 xl:mx-3 items-start justify-center gap-3 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10 max-w-5xl">
                {/* <div className="sticky top-0">
                  <DesktopMenu />
                </div> */}

                <div className="max-w-3xl col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-2 px-4 pb-6 pt-20 sm:pt-10 md:pt-6 lg:pt-6 xl:pt-6 mt-0 sm:mt-10  md:mt-[70px] lg:mt-[70px] xl:mt-[70px]  border-0 sm:border-0 md:border-2  lg:border-2 xl:border-2 border-gray-200 rounded-md bg-white mb-4">
                  {children}
                </div>
              </div>
            </main>
          </Providers>
        </body>
      </html>
    </>
  );
}
