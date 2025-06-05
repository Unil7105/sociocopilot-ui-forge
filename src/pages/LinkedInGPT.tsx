import { useState } from "react";
import { Sparkles, Copy, Edit3, ChevronDown, Brain, Briefcase, Target, History, RotateCcw, Send, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const promptCategories = [
  { id: "career", label: "🧠 Career Tips", icon: Brain, prompts: [
    "Share a remote work productivity tip",
    "Write about career growth strategies",
    "Discuss work-life balance insights"
  ]},
  { id: "business", label: "📢 Business Content", icon: Briefcase, prompts: [
    "Share a startup lesson learned",
    "Write about leadership challenges", 
    "Discuss product launch experience"
  ]},
  { id: "personal", label: "🎯 Personal Brand", icon: Target, prompts: [
    "Share a professional milestone",
    "Write about overcoming challenges",
    "Discuss industry predictions"
  ]}
];

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "bold", label: "Bold" }
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
  const [selectedTone, setSelectedTone] = useState("professional");
  const [showAllPrompts, setShowAllPrompts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

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
        timestamp: "Just now",
        engagement: { likes: Math.floor(Math.random() * 50) + 10, comments: Math.floor(Math.random() * 20) + 3, shares: Math.floor(Math.random() * 15) + 2 }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const allPrompts = promptCategories.flatMap(cat => cat.prompts);
  const visiblePrompts = showAllPrompts ? allPrompts : allPrompts.slice(0, 3);

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

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#fffaf3] to-[#fef7ed] flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">LinkedIn GPT</h1>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <Button
                variant={!showHistory ? "secondary" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => setShowHistory(false)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                New Post
              </Button>
              <Button
                variant={showHistory ? "secondary" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => setShowHistory(true)}
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 max-w-2xl mx-auto w-full px-8 py-12">
            
            {/* Content Ideas Section */}
            {!showHistory && (
              <div className="mb-12">
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-gray-500 mb-2">Here are 3 content ideas to get started...</h2>
                </div>
                
                <div className="space-y-3">
                  {visiblePrompts.map((prompt, index) => (
                    <div
                      key={index}
                      onClick={() => setInput(prompt)}
                      className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                          📝
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed flex-1">{prompt}</p>
                      </div>
                    </div>
                  ))}
                  
                  {!showAllPrompts && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllPrompts(true)}
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 w-full"
                    >
                      Show more ideas
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Generated Post Display */}
            {!showHistory && (
              <div className="mb-8">
                {messages.filter(m => m.type === 'ai').map((message) => (
                  <Card key={message.id} className="bg-white border-gray-100 shadow-sm rounded-2xl animate-fade-in">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-900">AI Copilot</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Select value={selectedTone} onValueChange={setSelectedTone}>
                                <SelectTrigger className="w-28 h-6 text-xs bg-gray-50 border-0">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {toneOptions.map((tone) => (
                                    <SelectItem key={tone.value} value={tone.value} className="text-xs">
                                      {tone.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                <Copy className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy to clipboard</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Regenerate</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="prose prose-sm max-w-none">
                        {/* Post Title/Hook */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
                            {message.content.split('\n')[0]}
                          </h3>
                        </div>
                        
                        {/* Post Body */}
                        <div className="text-base leading-relaxed text-gray-700 space-y-3">
                          {message.content.split('\n').slice(1).map((line, index) => {
                            if (line.trim() === '') return null;
                            if (line.startsWith('→')) {
                              return (
                                <div key={index} className="flex items-start gap-2">
                                  <span className="text-amber-500 mt-1">•</span>
                                  <span>{line.substring(2)}</span>
                                </div>
                              );
                            }
                            if (line.includes('#')) {
                              return (
                                <p key={index} className="text-sm">
                                  {line.split(' ').map((word, wordIndex) => 
                                    word.startsWith('#') ? (
                                      <span key={wordIndex} className="text-amber-600 font-medium">
                                        {word}{' '}
                                      </span>
                                    ) : (
                                      <span key={wordIndex}>{word}{' '}</span>
                                    )
                                  )}
                                </p>
                              );
                            }
                            return <p key={index}>{line}</p>;
                          })}
                        </div>
                      </div>
                      
                      {/* Footer with engagement */}
                      {message.engagement && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Predicted:</span>
                              <div className="flex gap-1">
                                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                  👍 {message.engagement.likes}
                                </span>
                                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                  💬 {message.engagement.comments}
                                </span>
                                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                                  🔁 {message.engagement.shares}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{message.timestamp}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {messages.filter(m => m.type === 'ai').length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Edit3 className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to create amazing content</h3>
                    <p className="text-gray-600">Choose an idea above or describe your own below</p>
                  </div>
                )}
              </div>
            )}

            {/* History View */}
            {showHistory && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Post History</h2>
                {savedPosts.map((post) => (
                  <Card key={post.id} className="bg-white border-gray-100 hover:shadow-md transition-shadow rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed line-clamp-3">{post.preview}</p>
                          <div className="flex items-center gap-3 mt-4">
                            <span className="text-sm text-gray-500">{post.timestamp}</span>
                            <div className="flex gap-1">
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                👍 {post.engagement.likes}
                              </span>
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                💬 {post.engagement.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-600">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Fixed Chat-Style Input */}
          <div className="border-t border-gray-100 bg-white p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input
                    placeholder="What would you like to post about today?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border-gray-200 focus:border-amber-300 focus:ring-amber-200 rounded-xl text-base"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6 py-2 flex items-center gap-2"
                >
                  Generate
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}