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

  const promptSuggestions = [
    "Share a productivity tip",
    "Talk about a recent win", 
    "Share a career challenge",
    "Discuss remote work insights",
    "Write about leadership lessons"
  ];

  return (
    <div className="min-h-screen bg-[#fffaf2] font-['Inter',sans-serif]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Writer Copilot</h1>
          </div>
          <p className="text-gray-600">SocioCopilot</p>
        </div>

        {/* Content Suggestions moved to bottom */}

        {/* Loading State */}
        {isGenerating && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white animate-pulse" />
              </div>
              <span className="text-sm text-gray-600">AI Copilot is writing...</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {/* Generated Posts */}
        {messages.filter(m => m.type === 'ai').map(message => (
          <div key={message.id} className="mt-6 mb-4 pl-6 animate-fade-in">
            {/* AI Response Container */}
            <div className="bg-[#fff4e8]/30 rounded-md p-6 max-w-[640px]">
              {/* AI Identity Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🟠</span>
                  <span>AI Copilot</span>
                  <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                    {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)} ▼
                  </span>
                </div>
                <TooltipProvider>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1 text-gray-400 hover:text-amber-600 opacity-60 hover:opacity-100 hover:scale-105 transition-all">
                          <Copy className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1 text-gray-400 hover:text-amber-600 opacity-60 hover:opacity-100 hover:scale-105 transition-all">
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Try Again</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
              
              {/* Post Content */}
              <div className="space-y-4">
                {/* Title */}
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                  {message.content.split('\n')[0]}
                </h2>
                
                {/* Body */}
                <div className="text-gray-600 text-base leading-relaxed space-y-4">
                  {message.content.split('\n').slice(1).map((line, index) => {
                    if (line.trim() === '') return null;
                    if (line.startsWith('→')) {
                      return (
                        <div key={index} className="flex items-start gap-3 ml-4">
                          <span className="text-amber-500 mt-1 text-sm">•</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    if (line.includes('#')) {
                      return (
                        <p key={index} className="text-sm">
                          {line.split(' ').map((word, wordIndex) => 
                            word.startsWith('#') ? (
                              <span key={wordIndex} className="text-amber-600 mr-1">
                                {word}
                              </span>
                            ) : (
                              <span key={wordIndex} className="mr-1">{word}</span>
                            )
                          )}
                        </p>
                      );
                    }
                    return <p key={index}>{line}</p>;
                  })}
                </div>
              </div>
              
              {/* Timestamp */}
              <div className="mt-4 text-xs text-neutral-400">
                just now
              </div>
              
              {/* Engagement Footer */}
              {message.engagement && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Predicted engagement: {message.engagement.likes} likes • {message.engagement.comments} comments • {message.engagement.shares} shares
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!isGenerating && messages.filter(m => m.type === 'ai').length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to create amazing content</h3>
            <p className="text-gray-600">Use the quick ideas below or describe your own</p>
          </div>
        )}
      </div>

      {/* Enhanced Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#fffaf2] via-[#fffaf2] to-[#fffaf2]/95 backdrop-blur-sm border-t border-gray-200/80 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Horizontal Suggestions */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-600">Quick ideas:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {promptSuggestions.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="flex-shrink-0 bg-white/60 hover:bg-white border border-gray-100 hover:border-amber-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Container */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:border-amber-300 focus-within:shadow-amber-100/50">
            {/* Tone indicator in textarea header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Tone:</span>
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full font-medium">
                  {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)}
                </span>
              </div>
              <div className="flex gap-1">
                {toneOptions.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setSelectedTone(tone.value)}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${
                      selectedTone === tone.value
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-end gap-4 p-4">
              <div className="flex-1">
                <Textarea 
                  placeholder="Describe what you'd like to write about... (e.g., 'Share a productivity tip for remote workers')" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[80px] max-h-[140px] border-0 bg-transparent text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-0 w-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isGenerating}
                />
              </div>
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isGenerating}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 h-12 font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Writing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Generate</span>
                    <Send className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
            
            {/* Character Count & Hints */}
            <div className="px-4 pb-3 flex items-center justify-between text-xs text-gray-500">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span className={input.length > 200 ? 'text-amber-600' : ''}>
                {input.length}/500
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}