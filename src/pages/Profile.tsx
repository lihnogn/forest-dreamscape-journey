import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award, Sparkles, TreeDeciduous } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserEmail(session.user.email || "");
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
          {/* Profile Header */}
          <Card className="glass-strong glow-soft">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-forest rounded-full flex items-center justify-center glow-soft">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Forest Explorer</CardTitle>
                  <p className="text-muted-foreground">{userEmail}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-center">
                <div className="flex-1 p-4 glass rounded-2xl">
                  <div className="text-3xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Items Collected</div>
                </div>
                <div className="flex-1 p-4 glass rounded-2xl">
                  <div className="text-3xl font-bold text-accent">0</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
                <div className="flex-1 p-4 glass rounded-2xl">
                  <div className="text-3xl font-bold text-secondary">0m</div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-accent" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 glass rounded-2xl opacity-50">
                  <div className="flex items-center gap-3 mb-2">
                    <TreeDeciduous className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold">🌱 Tree Planter</div>
                      <div className="text-sm text-muted-foreground">Plant 10 trees</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-full">Locked</Badge>
                </div>

                <div className="p-4 glass rounded-2xl opacity-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="h-8 w-8 text-accent" />
                    <div>
                      <div className="font-semibold">🌟 Star Collector</div>
                      <div className="text-sm text-muted-foreground">Collect 20 stars</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-full">Locked</Badge>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-6">
                Start exploring to unlock achievements!
              </p>
            </CardContent>
          </Card>

          {/* My Forest Snapshots */}
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>My Forest Snapshots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No snapshots yet. Capture your forest moments!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
