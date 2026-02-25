import React from 'react'
import {SignUp} from "@clerk/nextjs";
const page = () => {
  return (
 

    <div className="flex justify-center items-center min-h-screen">
      <SignUp 
        forceRedirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </div>


  );
}

export default page

