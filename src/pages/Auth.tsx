import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, TreeDeciduous } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Welcome to Forest Journey! ✨",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Welcome back! 🌲",
        description: "You've successfully signed in.",
      });
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-dreamy opacity-30" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md glass-strong animate-float-slow relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-forest rounded-full flex items-center justify-center glow-soft">
            <TreeDeciduous className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-forest bg-clip-text text-transparent flex items-center justify-center gap-2">
              Forest Journey
              <Sparkles className="h-6 w-6 text-accent animate-pulse-glow" />
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Begin your magical journey through the enchanted forest
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full p-1 glass">
              <TabsTrigger value="signin" className="rounded-full">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input
                    id="email-signin"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input
                    id="password-signin"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-forest hover:opacity-90 transition-opacity glow-soft"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-dreamy hover:opacity-90 transition-opacity glow-dreamy"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
