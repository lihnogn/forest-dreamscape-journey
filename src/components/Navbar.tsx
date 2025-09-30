import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Home, User, Users, LogOut, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            <span className="text-2xl font-bold bg-gradient-forest bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Forest Journey
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="rounded-full hover:bg-primary/10"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Forest
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/profile")}
                  className="rounded-full hover:bg-accent/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/community")}
                  className="rounded-full hover:bg-secondary/10"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="rounded-full bg-gradient-forest hover:opacity-90 transition-opacity"
              >
                Get Started
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
