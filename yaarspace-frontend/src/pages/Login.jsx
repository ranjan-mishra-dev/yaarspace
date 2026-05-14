import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons.jsx"; // Assuming you have a Google icon component
// import {Icons} from '../components/ui/'
import { FcGoogle } from "react-icons/fc";

{/* <FcGoogle className="h-5 w-5" /> */}
import { supabase } from '@/services/supabaseClient'
// import { handleGoogleLogin } from '@/services/handleGoogleLogin'
const Login = () => {

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "https://yaarspace-frontend.onrender.com",
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) console.error('Error logging in:', error.message)
  }
   

  return (
    // <div>
    //   <h1>login page</h1>
    //   <button onClick={handleGoogleLogin}>
    //   Sign in with Google
    // </button>
    // </div>

    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your credentials or continue with Google
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            variant="outline" 
            className="w-full py-6 text-base font-medium transition-all hover:bg-slate-100" 
            onClick={handleGoogleLogin}
          >
            {/* <Icons.google className="mr-2 h-5 w-5" /> */}
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Secure Authentication
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
