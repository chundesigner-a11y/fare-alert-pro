import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const UserContext = createContext<User | null>(null);

// Mirrors _authenticated/route.tsx's beforeLoad guard, but as a client-side
// check (no SSR here), so we render nothing until the session check resolves.
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "authed" | "anon">("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setStatus("anon");
        return;
      }
      setUser(data.user);
      setStatus("authed");
    });
    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") return null;
  if (status === "anon") return <Navigate to="/auth" replace />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useAuthedUser(): User {
  const user = useContext(UserContext);
  if (!user) throw new Error("useAuthedUser must be used within a ProtectedRoute");
  return user;
}
