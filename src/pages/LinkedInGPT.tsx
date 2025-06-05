import { useState } from "react";
import { Send, User, Sparkles, Copy, ThumbsUp, ThumbsDown, Edit3, Megaphone, PenTool, Rocket, TrendingUp, BarChart3, Clock, Save, RotateCcw, Info, Plus, History, Hash, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      <div className="min-h-screen bg-gradient-to-br from-[#fff7ec] to-[#fef3c7]">
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
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full p-1">
              <TabsTrigger value="current" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-md transition-all duration-200">
                <Edit3 className="w-4 h-4 mr-2" />
                Current Post
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-md transition-all duration-200">
                <History className="w-4 h-4 mr-2" />
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
                        <CardContent className={message.type === "ai" ? "pt-0 p-6" : "p-4"}>
                          {message.type === "ai" ? (
                            <div className="text-sm leading-relaxed whitespace-pre-line">
                              {message.content.split('\n').map((line, index) => {
                                if (line.includes('#')) {
                                  return (
                                    <p key={index} className="mb-2">
                                      {line.split(' ').map((word, wordIndex) => 
                                        word.startsWith('#') ? (
                                          <span key={wordIndex} className="text-amber-700 font-medium">
                                            {word}{' '}
                                          </span>
                                        ) : (
                                          <span key={wordIndex}>{word}{' '}</span>
                                        )
                                      )}
                                    </p>
                                  );
                                }
                                return <p key={index} className="mb-2">{line}</p>;
                              })}
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-line">
                              {message.content}
                            </p>
                          )}
                          
                          {message.type === "ai" && message.engagement && (
                            <div className="mt-6 pt-4 border-t border-amber-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-medium text-neutral-600">Predicted engagement:</span>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                    {message.engagement.likes}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                                    <MessageCircle className="w-3 h-3 mr-1" />
                                    {message.engagement.comments}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                                    <Share className="w-3 h-3 mr-1" />
                                    {message.engagement.shares}
                                  </Badge>
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
                          <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">{post.preview}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-neutral-500">{post.timestamp}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {post.engagement.likes}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              {post.engagement.comments}
                            </Badge>
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

          {/* Fixed Input at Bottom */}
          <div className="pb-32">
            {/* Spacer to prevent content from being hidden behind fixed input */}
          </div>
        </div>
        
        {/* Fixed Input Area */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-gradient-to-t from-[#fef3c7] via-[#fef3c7] to-transparent">
          <div className="max-w-5xl mx-auto">
            <Card className="border-amber-200 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-3 text-amber-600">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <Textarea
                      placeholder="✍️ Describe the LinkedIn post you want to create..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[80px] pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-200 resize-none rounded-lg"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    onClick={handleSend} 
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-lg"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Floating CTA */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce hover:animate-none"
                onClick={() => setInput("")}
              >
                <Plus className="w-7 h-7" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Create new post</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}