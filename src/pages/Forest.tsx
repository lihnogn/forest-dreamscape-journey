import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Leaf, Flower2 } from "lucide-react";

const Forest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 text-primary animate-pulse-glow mx-auto" />
          <p className="text-muted-foreground">Loading your forest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" />
        
        {/* Floating decorative elements */}
        <Star className="absolute top-32 right-1/4 h-6 w-6 text-accent/30 animate-pulse-glow" />
        <Leaf className="absolute top-1/3 left-10 h-8 w-8 text-primary/30 animate-float-slow" />
        <Flower2 className="absolute bottom-32 right-10 h-7 w-7 text-secondary/30 animate-float" />
        <Sparkles className="absolute top-1/2 right-20 h-5 w-5 text-accent/40 animate-pulse-glow" />
      </div>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-forest bg-clip-text text-transparent animate-float">
            Your Enchanted Forest
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to your magical sanctuary. Customize your forest, drive your car, and discover hidden treasures.
          </p>
        </div>

        {/* Spline 3D Embed */}
        <Card className="glass-strong glow-dreamy overflow-hidden max-w-6xl mx-auto">
          <CardContent className="p-0">
            <div className="aspect-video w-full bg-gradient-glow relative">
              <iframe
                src="https://my.spline.design/untitled-83cc7b73e80d47d68c1d1f8fb8fdbedd/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="absolute inset-0"
                title="Forest Journey 3D Scene"
              />
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
          <Card className="glass hover:glow-soft transition-all duration-300">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Collect Items</h3>
              <p className="text-sm text-muted-foreground">
                Drive through glowing stars, leaves, and flowers to unlock achievements
              </p>
            </CardContent>
          </Card>

          <Card className="glass hover:glow-soft transition-all duration-300">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Customize Forest</h3>
              <p className="text-sm text-muted-foreground">
                Add trees, lights, and change themes to make your forest unique
              </p>
            </CardContent>
          </Card>

          <Card className="glass hover:glow-soft transition-all duration-300">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg">Share Journey</h3>
              <p className="text-sm text-muted-foreground">
                Take snapshots and share your forest stories with the community
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Forest;
