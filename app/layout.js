import { Geist, Geist_Mono, Inter } from "next/font/google";
import Header from "@/app/appcomp/header";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
const inter= Inter({subsets:["latin"]});
import { Toaster } from "@/components/ui/sonner"
import { ProjectProvider } from "@/context/ProjectContext";

export const metadata = {
  title: "IoT Device Simulator",
  description: "Simulate IoT devices and export data",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
      className={`${inter.className} bg-gray-50`}
      >
        <ProjectProvider>
          <Header/>
          <main className="bg-gray-50" >
            <Toaster richColors/>
            {children}
          </main>
          <footer className="bg-gray-100 py-9">
            <div className="container mx-auto px-4 text-center text-gray-600"> 
              <p>Made by Bhoomika</p>
            </div>
          </footer>
        </ProjectProvider>
      </body>
     
    </html>
    </ClerkProvider>
  );
}
