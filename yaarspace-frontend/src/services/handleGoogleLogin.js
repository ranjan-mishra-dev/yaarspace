import { supabase } from '@/services/supabaseClient'

export const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "https://yaarspace-backend.onrender.com",
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) console.error('Error logging in:', error.message)
  }