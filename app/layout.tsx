import type { ReactNode } from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
interface MainLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Proprty Pulse",
  keywords: "Rental, Property, RealEstate",
  descirption: "Find Perfect Rental Property.",
};
const MainLayout = async ({ children }: MainLayoutProps) => {
  const session = await getServerSession(authOptions);
  return (
    <AuthProvider session={session}>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
