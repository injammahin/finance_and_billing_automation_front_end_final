// SignOutPage.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import  Cookies  from 'js-cookie';

const SignOutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear the stored authentication token
    localStorage.removeItem("auth_token");
    
//http only cookie can not be removed :)
    //Cookies.remove('Session', { path: '/signin' });

    // Redirect to the signin page
    window.location.href = '/signin';
    //router.push("/signin");
  }, [router]);

  return null; // This component doesn't render anything
};

export default SignOutPage;
