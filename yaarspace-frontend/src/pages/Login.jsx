import React from 'react'
import { supabase } from '@/services/supabaseClient'
import { handleGoogleLogin } from '@/services/handleGoogleLogin'
const Login = () => {

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://localhost:5173",
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) console.error('Error logging in:', error.message)
  }
   

  return (
    <div>
      <h1>login page</h1>
      <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
    </div>
  )
}

export default Login
