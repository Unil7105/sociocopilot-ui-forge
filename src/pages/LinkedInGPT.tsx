import { useState } from "react";
import { Send, User, Sparkles, Copy, ThumbsUp, ThumbsDown, Edit3, Megaphone, PenTool, Rocket, TrendingUp, BarChart3, Clock, Save, RotateCcw, Info, Plus, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const promptSuggestions = [
  { text: "Write a post about remote work benefits", icon: PenTool },
  { text: "Create content about career growth tips", icon: TrendingUp },
  { text: "Generate a post about startup lessons", icon: Rocket },
  { text: "Write about leadership in tech", icon: BarChart3 },
  { text: "Create content about work-life balance", icon: Edit3 }
];

const conversationHistory = [
  {
    id: 1,
    type: "user",
    content: "Write a LinkedIn post about the importance of continuous learning in tech",
    timestamp: "2 minutes ago"
  },
  {
    id: 2,
    type: "ai",
    content: "🚀 The tech industry moves at lightning speed.\n\nWhat got you here won't get you there.\n\nI learned this the hard way when I realized my coding skills from 5 years ago were already becoming outdated.\n\nHere's what I've discovered about staying relevant:\n\n→ Dedicate 30 minutes daily to learning\n→ Follow industry leaders and trends\n→ Build side projects with new technologies\n→ Join tech communities and discussions\n→ Don't fear making mistakes while learning\n\nThe moment you stop learning is the moment you start falling behind.\n\nWhat's one new skill you're currently developing? 👇\n\n#TechCareers #ContinuousLearning #TechTips",
    timestamp: "1 minute ago",
    engagement: { likes: 24, comments: 8, shares: 5 }
  }
];

export function LinkedInGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(conversationHistory);
  const [activeTab, setActiveTab] = useState("current");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      type: "user" as const,
      content: input,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai" as const,
        content: "I'll help you create an engaging LinkedIn post about that topic. Let me craft something compelling for you...",
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const savedPosts = [
    {
      id: 1,
      preview: "🚀 The tech industry moves at lightning speed...",
      timestamp: "2 hours ago",
      engagement: { likes: 24, comments: 8, shares: 5 }
    },
    {
      id: 2,
      preview: "💡 Leadership isn't about having all the answers...",
      timestamp: "1 day ago",
      engagement: { likes: 42, comments: 12, shares: 8 }
    }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="p-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="pt-10 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                  LinkedIn GPT
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral-600">AI-powered LinkedIn content writer</p>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-amber-600 hover:text-amber-700" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Generate engaging LinkedIn posts using AI.<br />Just describe what you want to write about!</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <Card className="mb-6 border-amber-100 bg-white/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 ring-2 ring-amber-200">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700">
                    <User className="w-7 h-7" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Unil's AI LinkedIn Writer</h3>
                  <p className="text-sm text-neutral-600">Ready to create engaging content for your audience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Suggestions */}
          <Card className="mb-8 border-amber-100 bg-white/60 backdrop-blur-sm shadow-lg">
            <CardContent className="px-6 py-4">
              <h3 className="text-sm font-medium text-amber-700 mb-4 flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Quick prompts to get started:
              </h3>
              <div className="flex flex-wrap gap-3">
                {promptSuggestions.map((prompt, index) => {
                  const IconComponent = prompt.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(prompt.text)}
                      className="text-xs bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:from-amber-100 hover:to-orange-100 hover:border-amber-300 transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      <IconComponent className="w-3 h-3 mr-1.5 text-amber-600" />
                      {prompt.text}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Content Area with Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-amber-100 border border-amber-200">
              <TabsTrigger value="current" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
                Current Post
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-amber-700">
                <History className="w-4 h-4 mr-1" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4 mt-4">
              {/* Current Conversation */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Megaphone className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-2xl ${message.type === "user" ? "order-first" : ""}`}>
                      <Card className={message.type === "user" 
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-300 shadow-lg" 
                        : "bg-white border-amber-100 shadow-lg"}>
                        {message.type === "ai" && (
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Edit3 className="w-4 h-4 text-amber-600" />
                                <span className="text-sm font-medium text-amber-700">Generated Post</span>
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-amber-600 hover:bg-amber-50">
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-amber-600 hover:bg-amber-50">
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-amber-600 hover:bg-amber-50">
                                  <RotateCcw className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                        )}
                        <CardContent className={message.type === "ai" ? "pt-0" : "p-4"}>
                          <p className={`text-sm whitespace-pre-line ${message.type === "ai" ? "font-mono" : ""}`}>
                            {message.content}
                          </p>
                          
                          {message.type === "ai" && message.engagement && (
                            <div className="mt-4 pt-4 border-t border-amber-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-neutral-600">
                                  <span className="font-medium">Predicted engagement:</span>
                                  <div className="flex items-center gap-1 text-green-600">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{message.engagement.likes}</span>
                                  </div>
                                  <span>{message.engagement.comments} comments</span>
                                  <span>{message.engagement.shares} shares</span>
                                </div>
                                <div className="flex items-center text-xs text-neutral-500">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {message.timestamp}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      {message.type === "user" && (
                        <div className="text-xs text-neutral-500 mt-1 text-right">
                          {message.timestamp}
                        </div>
                      )}
                    </div>

                    {message.type === "user" && (
                      <Avatar className="w-8 h-8 ring-2 ring-amber-200">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="space-y-3">
                {savedPosts.map((post) => (
                  <Card key={post.id} className="border-amber-100 bg-white/60 backdrop-blur-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 line-clamp-2 font-mono">{post.preview}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-neutral-600">
                            <span>{post.timestamp}</span>
                            <div className="flex items-center gap-1 text-green-600">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{post.engagement.likes}</span>
                            </div>
                            <span>{post.engagement.comments} comments</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-50">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Input */}
          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Describe the LinkedIn post you want to create..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 border-amber-200 focus:border-amber-400 focus:ring-amber-200"
                />
                <Button 
                  onClick={handleSend} 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Floating CTA */}
          <Button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110"
            onClick={() => setInput("")}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}