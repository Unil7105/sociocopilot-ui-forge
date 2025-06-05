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
    <div className="min-h-screen bg-[#fffaf2] font-['Inter',sans-serif] pb-40">
      {/* Header */}
      <div className="sticky top-0 bg-[#fffaf2]/95 backdrop-blur-sm border-b border-amber-200/30 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Writer Copilot</h1>
              <p className="text-sm text-gray-500">SocioCopilot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {messages.length === 0 && !isGenerating && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to create amazing content</h3>
            <p className="text-gray-600">Start a conversation with AI Copilot below</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={message.id} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            {message.type === 'user' ? (
              // User Message (Right aligned)
              <div className="flex justify-end">
                <div className="max-w-[70%]">
                  <div className="text-xs text-gray-500 mb-1 text-right">You</div>
                  <div className="bg-white rounded-xl px-4 py-3 text-gray-900 shadow-sm border border-gray-100">
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-right">{message.timestamp}</div>
                </div>
              </div>
            ) : (
              // AI Message (Left aligned)
              <div className="flex justify-start">
                <div className="max-w-[70%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">🟠 AI Copilot</span>
                    <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                      {selectedTone}
                    </span>
                  </div>
                  <div className="bg-[#fff3e0] rounded-xl px-4 py-3 text-gray-900 relative group">
                    {/* Post Content */}
                    <div className="space-y-3">
                      {/* Title */}
                      <h2 className="font-medium text-base text-gray-800 leading-relaxed">
                        {message.content.split('\n')[0]}
                      </h2>
                      
                      {/* Body */}
                      <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                        {message.content.split('\n').slice(1).map((line, lineIndex) => {
                          if (line.trim() === '') return null;
                          if (line.startsWith('→')) {
                            return (
                              <div key={lineIndex} className="flex items-start gap-2 ml-2">
                                <span className="text-amber-500 mt-1 text-sm">•</span>
                                <span>{line.substring(2)}</span>
                              </div>
                            );
                          }
                          if (line.includes('#')) {
                            return (
                              <p key={lineIndex} className="text-sm">
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
                          return <p key={lineIndex}>{line}</p>;
                        })}
                      </div>
                    </div>
                    
                    {/* Hover Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <TooltipProvider>
                        <div className="flex gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:scale-110 transition-all duration-200 rounded-lg hover:bg-white/50">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>copy to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:scale-110 transition-all duration-200 rounded-lg hover:bg-white/50">
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>generate a new version</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-400">{message.timestamp}</div>
                    <div className="text-xs text-green-600 font-medium">draft saved</div>
                  </div>
                  
                  {/* Engagement Footer */}
                  {message.engagement && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        predicted: {message.engagement.likes} likes • {message.engagement.comments} comments • {message.engagement.shares} shares
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isGenerating && (
          <div className="flex justify-start mb-6 animate-fade-in">
            <div className="max-w-[70%]">
              <div className="text-xs text-gray-500 mb-1">🟠 AI Copilot is writing...</div>
              <div className="bg-[#fff3e0] rounded-xl px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fffaf2]/95 backdrop-blur-sm border-t border-amber-200/30 shadow-2xl">
        <div className="max-w-4xl mx-auto p-6">
          {/* Quick Suggestions */}
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {promptSuggestions.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="flex-shrink-0 bg-white/70 hover:bg-white border border-amber-200/50 hover:border-amber-300 rounded-full px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 hover:shadow-md whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex items-end gap-3">
            {/* Tone Selector */}
            <div className="flex gap-1 mb-3">
              {toneOptions.map((tone) => (
                <TooltipProvider key={tone.value}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setSelectedTone(tone.value)}
                        className={`px-2 py-1 text-xs rounded-lg transition-all duration-200 ${
                          selectedTone === tone.value
                            ? 'bg-amber-100 text-amber-700 scale-105 shadow-sm'
                            : 'text-gray-500 hover:bg-gray-100 hover:scale-105'
                        }`}
                      >
                        {tone.label}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tone.value === 'professional' ? 'confident & clear' : tone.value === 'friendly' ? 'conversational' : 'impactful'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea 
                placeholder="What would you like to write about?" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="w-full min-h-[48px] max-h-[120px] bg-white border border-gray-200 rounded-full px-4 py-3 text-base placeholder:text-gray-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 resize-none pr-20"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isGenerating}
              />
              
              {/* Send Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={handleSend} 
                      disabled={!input.trim() || isGenerating}
                      className="absolute right-2 bottom-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 h-10 font-medium rounded-full transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    >
                      {isGenerating ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>generate a linkedin-ready post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span className={input.length > 400 ? 'text-amber-600' : ''}>
              {input.length}/500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}