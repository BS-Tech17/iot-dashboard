
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import  { Button } from "@/components/ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import { CheckCircle, XCircle, Check, TriangleAlert } from "lucide-react";
const Header = async () => {

  await checkUser();

  return (
   <div className="fixed top-1 w-full bg-gray-800 backdrop-blur-md z-50 border-t-2 
    border-r-2 border-b-4 border-l-2 border-t-blue-300 
    border-r-blue-300 border-b-blue-300 border-l-blue-300 rounded-3xl p-1">
      <nav className="container mx-auto px-4 py-2 flex items-center justify-between ">
        <Link href="/">
        
       <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-white text-2xl">
  IoT Device Simulator
</h1>

        
        </Link>
    
       
<div className="flex items-center space-x-4">
 
  
       <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard"><Button className="flex items-center gap-2 px-6 py-2 bg-transparent text-transparent bg-clip-text 
             bg-gradient-to-r from-white to-blue-500 font-bold border border-white 
             transition duration-200 
             hover:from-gray-100 hover:to-teal-300 
             active:bg-green-500 active:text-white active:bg-clip-border px-8 py-3
              text-lg font-bold rounded-xl">Log In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{elements:
                {
                  avatarBox:"w-10 h-10",
                  
                }
              }} />
            </SignedIn>
            </div>
            </nav>
    </div>
  );
};

export default Header;