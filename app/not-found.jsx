import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
      <h4 className="text-6xl font-bold gradient-title mb-4">404</h4>
      <h2 className="text-2xl text-gray-500 font-semibold mb-4">Page Not Found</h2>
      <p className="text-white mb-8 ">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/">
        <Button className="flex items-center gap-2 px-6 py-2 bg-transparent text-transparent bg-clip-text 
             bg-gradient-to-r from-white to-purple-500 font-bold border border-white 
             transition duration-200 
             hover:from-gray-100 hover:to-purple-300 
             active:bg-green-500 active:text-white active:bg-clip-border">Return Home</Button>
      </Link>
    </div>
  );
};

