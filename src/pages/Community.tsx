import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Sparkles, Users } from "lucide-react";

const Community = () => {
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
        <Sparkles className="h-12 w-12 text-primary animate-pulse-glow" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-dreamy bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Users className="h-10 w-10 text-accent" />
              Community Feed
            </h1>
            <p className="text-muted-foreground">
              Share your forest journey and connect with fellow explorers
            </p>
          </div>

          {/* Example Posts */}
          <Card className="glass-strong glow-soft">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-forest rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Forest Explorer</div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video glass rounded-2xl bg-gradient-glow flex items-center justify-center">
                <Sparkles className="h-16 w-16 text-primary/30" />
              </div>
              <p className="text-muted-foreground">
                Just discovered a hidden glowing tree in the night forest! The stars are so beautiful tonight ✨🌙
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Heart className="h-4 w-4 mr-2" />
                  12 likes
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  3 comments
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>More posts coming soon!</p>
              <p className="text-sm mt-2">Share your forest adventures to see them here</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Community;
