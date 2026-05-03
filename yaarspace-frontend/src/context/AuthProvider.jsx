import { useContext, useEffect, useState } from "react";

import { supabase } from "@/services/supabaseClient";
import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const[userProfilePicture, setUserProfilePicture] = useState("");

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    const currentUser = session?.user ?? null;
    setSession(session);
    setUser(currentUser);
    setUserProfilePicture(currentUser?.user_metadata?.avatar_url);
    
    setLoading(false);
  });
  
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    const currentUser = session?.user ?? null;
    setSession(session);

    setUser(currentUser);
    setUserProfilePicture(currentUser?.user_metadata?.avatar_url);

    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{session, user, loading, handleLogout, userProfilePicture, setUserProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
