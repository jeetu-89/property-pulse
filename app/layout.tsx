import type { ReactNode } from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Proprty Pulse",
  keywords: "Rental, Property, RealEstate",
  descirption: "Find Perfect Rental Property.",
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <html>
      <body>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
