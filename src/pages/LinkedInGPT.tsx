import { useState } from "react";
import { Sparkles, Copy, Edit3, ChevronDown, Brain, Briefcase, Target, History, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      <div className="min-h-screen bg-[#fefaf5]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          
          {/* Header - Clean & Minimal */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                LinkedIn GPT
              </h1>
            </div>
            <p className="text-gray-600 text-base leading-relaxed ml-13">
              AI-powered content writer for better LinkedIn engagement
            </p>
          </div>

          {/* Zone 1: Prompt Suggestions */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Content Ideas</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllPrompts(!showAllPrompts)}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
              >
                {showAllPrompts ? "Show Less" : "More"}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAllPrompts ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            <div className="grid gap-3">
              {visiblePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => setInput(prompt)}
                  className="h-auto p-4 text-left justify-start bg-white border-gray-200 hover:bg-amber-50 hover:border-amber-200 transition-all duration-200 rounded-xl shadow-sm"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Edit3 className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Zone 2: Post Generator Output */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Generated Content</h2>
              <div className="flex items-center gap-3">
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger className="w-36 bg-white border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value} className="rounded-lg">
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                >
                  <History className="w-4 h-4 mr-1" />
                  History
                </Button>
              </div>
            </div>

            {/* Current Post */}
            {!showHistory && (
              <div className="space-y-6">
                {messages.filter(m => m.type === 'ai').map((message) => (
                  <Card key={message.id} className="bg-white border-gray-200 shadow-sm rounded-xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">AI Copilot</span>
                        </div>
                        <div className="flex gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                                <Copy className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Regenerate</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="prose prose-sm max-w-none">
                        <div className="text-base leading-relaxed text-gray-900 whitespace-pre-line">
                          {expandedPost === message.id ? 
                            message.content.split('\n').map((line, index) => {
                              if (line.includes('#')) {
                                return (
                                  <p key={index} className="mb-3">
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
                              return <p key={index} className="mb-3">{line}</p>;
                            }) :
                            <>
                              {truncateContent(message.content).split('\n').map((line, index) => {
                                if (line.includes('#')) {
                                  return (
                                    <p key={index} className="mb-3">
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
                                return <p key={index} className="mb-3">{line}</p>;
                              })}
                              {message.content.length > 200 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setExpandedPost(expandedPost === message.id ? null : message.id)}
                                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0 h-auto font-normal"
                                >
                                  Show more
                                </Button>
                              )}
                            </>
                          }
                        </div>
                      </div>
                      
                      {/* Engagement Metrics */}
                      {message.engagement && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-medium text-gray-500">Predicted engagement:</span>
                              <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                  👍 {message.engagement.likes}
                                </Badge>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                  💬 {message.engagement.comments}
                                </Badge>
                                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                                  🔁 {message.engagement.shares}
                                </Badge>
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
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Edit3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to create</h3>
                    <p className="text-gray-600 text-base">Describe your LinkedIn post idea below to get started</p>
                  </div>
                )}
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="space-y-3">
                {savedPosts.map((post) => (
                  <Card key={post.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow rounded-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-base text-gray-700 leading-relaxed line-clamp-2">{post.preview}</p>
                          <div className="flex items-center gap-3 mt-4">
                            <span className="text-sm text-gray-500">{post.timestamp}</span>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                👍 {post.engagement.likes}
                              </Badge>
                              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                💬 {post.engagement.comments}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Zone 3: Fixed Input & CTA at Bottom */}
          <div className="pb-32">
            {/* Spacer to prevent content from being hidden behind fixed input */}
          </div>
        </div>
        
        {/* Fixed Input Area */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-gradient-to-t from-[#fefaf5] via-[#fefaf5] to-transparent">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border-gray-200 shadow-xl rounded-xl">
              <CardContent className="p-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Textarea
                      placeholder="e.g. Share a remote work story or product launch tip..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[100px] border-gray-200 focus:border-amber-300 focus:ring-amber-200 resize-none rounded-xl text-base leading-relaxed"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-2">Press ⌘+Enter to generate</p>
                  </div>
                  <Button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8 py-3 text-base font-medium"
                  >
                    ✨ Generate Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}