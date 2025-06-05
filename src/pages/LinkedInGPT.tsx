import { useState } from "react";
import { Sparkles, Copy, Edit3, ChevronDown, Brain, Briefcase, Target, History, RotateCcw, Send, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
const promptCategories = [{
  id: "career",
  label: "🧠 Career Tips",
  icon: Brain,
  prompts: ["Share a remote work productivity tip", "Write about career growth strategies", "Discuss work-life balance insights"]
}, {
  id: "business",
  label: "📢 Business Content",
  icon: Briefcase,
  prompts: ["Share a startup lesson learned", "Write about leadership challenges", "Discuss product launch experience"]
}, {
  id: "personal",
  label: "🎯 Personal Brand",
  icon: Target,
  prompts: ["Share a professional milestone", "Write about overcoming challenges", "Discuss industry predictions"]
}];
const toneOptions = [{
  value: "professional",
  label: "Professional"
}, {
  value: "friendly",
  label: "Friendly"
}, {
  value: "bold",
  label: "Bold"
}];
const conversationHistory = [{
  id: 1,
  type: "user",
  content: "Write a LinkedIn post about the importance of continuous learning in tech",
  timestamp: "2 minutes ago"
}, {
  id: 2,
  type: "ai",
  content: "🚀 The tech industry moves at lightning speed.\n\nWhat got you here won't get you there.\n\nI learned this the hard way when I realized my coding skills from 5 years ago were already becoming outdated.\n\nHere's what I've discovered about staying relevant:\n\n→ Dedicate 30 minutes daily to learning\n→ Follow industry leaders and trends\n→ Build side projects with new technologies\n→ Join tech communities and discussions\n→ Don't fear making mistakes while learning\n\nThe moment you stop learning is the moment you start falling behind.\n\nWhat's one new skill you're currently developing? 👇\n\n#TechCareers #ContinuousLearning #TechTips",
  timestamp: "1 minute ago",
  engagement: {
    likes: 24,
    comments: 8,
    shares: 5
  }
}];
export function LinkedInGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(conversationHistory);
  const [selectedTone, setSelectedTone] = useState("professional");
  const [showAllPrompts, setShowAllPrompts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const handleSend = () => {
    if (!input.trim()) return;
    setIsGenerating(true);
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
        content: "🚀 The tech industry moves at lightning speed.\n\nWhat got you here won't get you there.\n\nI learned this the hard way when I realized my coding skills from 5 years ago were already becoming outdated.\n\nHere's what I've discovered about staying relevant:\n\n→ Dedicate 30 minutes daily to learning\n→ Follow industry leaders and trends\n→ Build side projects with new technologies\n→ Join tech communities and discussions\n→ Don't fear making mistakes while learning\n\nThe moment you stop learning is the moment you start falling behind.\n\nWhat's one new skill you're currently developing? 👇\n\n#TechCareers #ContinuousLearning #TechTips",
        timestamp: "Just now",
        engagement: {
          likes: Math.floor(Math.random() * 50) + 10,
          comments: Math.floor(Math.random() * 20) + 3,
          shares: Math.floor(Math.random() * 15) + 2
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };
  const allPrompts = promptCategories.flatMap(cat => cat.prompts);
  const visiblePrompts = showAllPrompts ? allPrompts : allPrompts.slice(0, 3);
  const savedPosts = [{
    id: 1,
    preview: "🚀 The tech industry moves at lightning speed...",
    timestamp: "2 hours ago",
    engagement: {
      likes: 24,
      comments: 8,
      shares: 5
    }
  }, {
    id: 2,
    preview: "💡 Leadership isn't about having all the answers...",
    timestamp: "1 day ago",
    engagement: {
      likes: 42,
      comments: 12,
      shares: 8
    }
  }];
  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };
  return <TooltipProvider>
      <div className="min-h-screen bg-[#fff8f1] flex font-['Inter',sans-serif]">
        {/* Left Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Writer Copilot</h1>
                <p className="text-sm text-gray-500">SocioCopilot</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="space-y-1">
              <Button variant={!showHistory ? "secondary" : "ghost"} className="w-full justify-start text-sm h-10 rounded-lg" onClick={() => setShowHistory(false)}>
                <Edit3 className="w-4 h-4 mr-3" />
                New Post
              </Button>
              <Button variant={showHistory ? "secondary" : "ghost"} className="w-full justify-start text-sm h-10 rounded-lg" onClick={() => setShowHistory(true)}>
                <History className="w-4 h-4 mr-3" />
                History
              </Button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tone</span>
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger className="w-24 h-7 text-xs bg-amber-50 border-amber-200 rounded-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map(tone => <SelectItem key={tone.value} value={tone.value} className="text-xs">
                        {tone.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#fff8f1]">
          <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
            
            {/* Content Ideas Section */}
            {!showHistory && <div className="mb-8">
                <div className="mb-6">
                  <h2 className="text-base font-medium text-gray-600 leading-relaxed">Here are 3 content ideas to get started...</h2>
                </div>
                
                <div className="space-y-4">
                  {visiblePrompts.map((prompt, index) => <div key={index} onClick={() => setInput(prompt)} className="group bg-white rounded-xl p-5 shadow-md border-0 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in" style={{
                animationDelay: `${index * 150}ms`
              }}>
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-lg">📝</span>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">{prompt}</p>
                      </div>
                    </div>)}
                  
                  {!showAllPrompts && <Button variant="ghost" size="sm" onClick={() => setShowAllPrompts(true)} className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 w-full mt-3 rounded-lg">
                      Show more ideas
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>}
                </div>
              </div>}

            {/* Generated Post Display */}
            {!showHistory && <div className="mb-20">
                {isGenerating && <div className="bg-white rounded-xl p-6 shadow-md border-0 animate-fade-in mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">AI Copilot is writing...</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{
                  animationDelay: '0.2s'
                }}></div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{
                  animationDelay: '0.4s'
                }}></div>
                    </div>
                  </div>}
                
                {messages.filter(m => m.type === 'ai').map(message => <div key={message.id} className="bg-white rounded-xl p-6 shadow-md border-0 animate-fade-in mb-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">AI Copilot</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                              {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)} ▼
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy to clipboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Regenerate</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-4">
                      {/* Title/Hook */}
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                        {message.content.split('\n')[0]}
                      </h3>
                      
                      {/* Body Content */}
                      <div className="text-base leading-relaxed text-gray-700 space-y-4">
                        {message.content.split('\n').slice(1).map((line, index) => {
                    if (line.trim() === '') return null;
                    if (line.startsWith('→')) {
                      return <div key={index} className="flex items-start gap-3 ml-4">
                                <span className="text-amber-500 mt-1.5 text-sm">•</span>
                                <span className="flex-1">{line.substring(2)}</span>
                              </div>;
                    }
                    if (line.includes('#')) {
                      return <p key={index} className="text-sm font-medium">
                                {line.split(' ').map((word, wordIndex) => word.startsWith('#') ? <span key={wordIndex} className="text-amber-600 bg-amber-50 px-1 py-0.5 rounded mr-2">
                                      {word}
                                    </span> : <span key={wordIndex} className="mr-1">{word}</span>)}
                              </p>;
                    }
                    return <p key={index} className="leading-relaxed">{line}</p>;
                  })}
                      </div>
                    </div>
                    
                    {/* Footer with Engagement */}
                    {message.engagement && <div className="mt-8 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">Predicted engagement:</span>
                            <div className="flex gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium cursor-help">
                                    👍 {message.engagement.likes}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>Expected likes</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium cursor-help">
                                    💬 {message.engagement.comments}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>Expected comments</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-medium cursor-help">
                                    🔁 {message.engagement.shares}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>Expected shares</TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{message.timestamp}</span>
                        </div>
                      </div>}
                  </div>)}
                
                {!isGenerating && messages.filter(m => m.type === 'ai').length === 0 && <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Edit3 className="w-10 h-10 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to create amazing content</h3>
                    <p className="text-gray-600 text-base leading-relaxed">Choose an idea above or describe your own below</p>
                  </div>}
              </div>}

            {/* History View */}
            {showHistory && <div className="space-y-6 mb-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-8">Your Post History</h2>
                {savedPosts.map(post => <div key={post.id} className="bg-white rounded-xl p-6 shadow-md border-0 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed text-base mb-4">{post.preview}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                          <div className="flex gap-2">
                            <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium">
                              👍 {post.engagement.likes}
                            </span>
                            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                              💬 {post.engagement.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg h-8 w-8 p-0">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy post</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>)}
              </div>}
          </div>

          {/* Fixed Chat-Style Input */}
          <div className="fixed bottom-0 left-72 right-0 bg-white border-t border-gray-200 p-6 backdrop-blur-sm bg-white/95">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input placeholder="What would you like to post about today?" value={input} onChange={e => setInput(e.target.value)} className="h-12 border-gray-300 focus:border-amber-400 focus:ring-amber-300 rounded-xl text-base px-4 shadow-sm" onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }} disabled={isGenerating} />
                </div>
                <Button onClick={handleSend} disabled={!input.trim() || isGenerating} className="h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl px-8 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                  {isGenerating ? <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </> : <>
                      Generate
                      <Send className="w-4 h-4" />
                    </>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>;
}