import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Lightbulb, LayoutGrid, Sparkles, Target, Palette, ListChecks, ArrowRight, ArrowLeft } from 'lucide-react';

interface GenerateStrategyProps {
  onNext?: () => void;
  onBack?: () => void;
}

const GenerateStrategy: React.FC<GenerateStrategyProps> = ({ onNext, onBack }) => {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const icp = {
    name: "Small Business Owners",
    painPoints: [
      "Struggling with social media presence",
      "Lack of time for content creation", 
      "Unsure about effective content strategies",
    ],
    goals: [
      "Increase brand visibility",
      "Drive website traffic",
      "Generate leads through social media",
    ],
  };

  const moodboard = [
    "Professional yet approachable visuals",
    "Warm color palettes (ambers, oranges)",
    "Authentic imagery (behind-the-scenes, team photos)",
    "Clean and modern typography",
  ];

  const contentPillars = [
    "Educational Content: Tips and tutorials related to their industry.",
    "Promotional Content: Showcasing products/services and special offers.",
    "Engagement Content: Questions, polls, and interactive posts to encourage participation.",
    "Behind-the-Scenes: Highlighting company culture and personal stories.",
  ];

  const handleGenerateStrategy = () => {
    navigate('/generate-content');
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Target className="text-primary w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Your Personalized Social Media Strategy</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Review the key elements of your tailored strategy below, designed specifically for your business goals.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Strategy
            </Badge>
          </div>
        </div>

        {/* Strategy Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ICP Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                Ideal Customer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-accent/50 rounded-lg">
                <p className="text-lg font-semibold text-foreground mb-2">Target Audience:</p>
                <p className="text-primary font-bold text-xl">{icp.name}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-destructive" />
                    Pain Points
                  </h4>
                  <ul className="space-y-2">
                    {icp.painPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary text-sm mt-1">•</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Goals
                  </h4>
                  <ul className="space-y-2">
                    {icp.goals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary text-sm mt-1">•</span>
                        <span className="text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Moodboard Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                Visual & Brand Moodboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your visual identity will be defined by:
              </p>
              <div className="grid gap-3">
                {moodboard.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Pillars - Full Width */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ListChecks className="w-6 h-6 text-primary" />
              </div>
              Core Content Pillars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 text-lg">
              Your content strategy will focus on these key themes to maximize audience engagement:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {contentPillars.map((pillar, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium min-w-fit">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{pillar}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button
            onClick={handleGenerateStrategy}
            size="lg"
            className="flex items-center gap-3 text-lg px-8 py-6"
          >
            <Sparkles className="w-5 h-5" />
            Generate My Content Strategy
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateStrategy;