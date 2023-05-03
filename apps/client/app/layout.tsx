import Header from "@/components/Header";
import "./globals.css";
import {Providers} from '../global_state/Provider'
import Notification from "@/components/Notification";


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
            {/* Toast - Notification */}
            <Notification/>
            
          <Header />
          {children}
          </Providers>
        </body>
      </html>
    </>
  );
}
