import Header from "@/components/Header";
import "./globals.css";
import {Providers} from '../Redux-toolkit/Provider'

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
        <body>
          <Providers>
          <Header />
          {children}
          </Providers>
        </body>
      </html>
    </>
  );
}
