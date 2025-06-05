import { useState, useEffect, useRef } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);
  
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
    <div className="flex flex-col h-full bg-[#fffaf2] font-['Inter',sans-serif] relative">
      {/* Header */}
      <div className="sticky top-0 bg-[#fffaf2]/95 backdrop-blur-sm border-b border-amber-200/30 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Writer Copilot</h1>
              <p className="text-sm text-gray-500">SocioCopilot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pb-32">
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
            {/* Empty State */}
            {messages.length === 0 && !isGenerating && (
              <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Edit3 className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">How can I help you write today?</h3>
                <p className="text-gray-600 text-lg max-w-md">Ask me to write anything from a productivity tip to a launch story.</p>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className="animate-fade-in opacity-0"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {message.type === 'user' ? (
                  // User Message
                  <div className="flex justify-end mb-4">
                    <div className="max-w-[75%] flex flex-col items-end">
                      <div className="bg-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm border border-gray-100/50 text-gray-800 text-base leading-relaxed">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-400 mt-1.5 mr-1">{message.timestamp}</div>
                    </div>
                  </div>
                ) : (
                  // AI Message
                  <div className="flex justify-start mb-6">
                    <div className="max-w-[75%] flex flex-col">
                      <div className="flex items-center gap-2 mb-2 ml-1">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 font-medium">AI Copilot</span>
                        <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                          {selectedTone}
                        </span>
                      </div>
                      
                      <div className="bg-[#fff3e0]/60 rounded-2xl rounded-tl-md px-4 py-4 shadow-sm relative group">
                        {/* Message Content */}
                        <div className="text-gray-700 text-base leading-relaxed space-y-3">
                          {message.content.split('\n').map((line, lineIndex) => {
                            if (line.trim() === '') return <br key={lineIndex} />;
                            
                            if (line.startsWith('→')) {
                              return (
                                <div key={lineIndex} className="flex items-start gap-3 ml-2">
                                  <span className="text-amber-500 mt-2 text-xs font-bold">→</span>
                                  <span className="text-gray-700">{line.substring(2)}</span>
                                </div>
                              );
                            }
                            
                            if (line.includes('#')) {
                              return (
                                <p key={lineIndex} className="text-gray-700">
                                  {line.split(' ').map((word, wordIndex) => 
                                    word.startsWith('#') ? (
                                      <span key={wordIndex} className="text-amber-600 font-medium mr-1">
                                        {word}
                                      </span>
                                    ) : (
                                      <span key={wordIndex} className="mr-1">{word}</span>
                                    )
                                  )}
                                </p>
                              );
                            }
                            
                            return <p key={lineIndex} className="text-gray-700">{line}</p>;
                          })}
                        </div>
                        
                        {/* Hover Actions */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="p-1.5 text-gray-400 hover:text-amber-600 transition-colors duration-200 rounded-md hover:bg-white/70">
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copy to clipboard</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="p-1.5 text-gray-400 hover:text-amber-600 transition-colors duration-200 rounded-md hover:bg-white/70">
                                    <RotateCcw className="w-3.5 h-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Regenerate</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 ml-1">
                        <div className="text-xs text-gray-400">{message.timestamp}</div>
                        {message.engagement && (
                          <div className="text-xs text-gray-500">
                            ~{message.engagement.likes} likes • {message.engagement.comments} comments
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isGenerating && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-[75%] flex flex-col">
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 font-medium">AI Copilot is writing...</span>
                  </div>
                  
                  <div className="bg-[#fff3e0]/60 rounded-2xl rounded-tl-md px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">Crafting your post...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fffaf2]/95 backdrop-blur-sm border-t border-amber-200/30 z-40">
        <div className="max-w-4xl mx-auto p-4">
          {/* Quick Suggestions */}
          {messages.length === 0 && (
            <div className="mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {promptSuggestions.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="flex-shrink-0 bg-white/80 hover:bg-white border border-amber-200/50 hover:border-amber-300 rounded-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 hover:shadow-sm whitespace-nowrap hover:scale-105"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {/* Tone Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Tone:</span>
              <div className="flex gap-1">
                {toneOptions.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setSelectedTone(tone.value)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
                      selectedTone === tone.value
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white/60 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200/50'
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="relative">
              <Textarea 
                placeholder="Ask me to write anything from a productivity tip to a launch story..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="w-full min-h-[56px] max-h-[160px] bg-white/90 border border-gray-200/50 rounded-2xl px-5 py-4 text-base placeholder:text-gray-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-100/50 resize-none pr-14 shadow-sm backdrop-blur-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isGenerating}
              />
              
              {/* Send Button */}
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isGenerating}
                className={`absolute right-2 bottom-2 w-10 h-10 rounded-full transition-all duration-200 ${
                  input.trim() 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:scale-105' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } disabled:hover:scale-100`}
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span className={input.length > 400 ? 'text-amber-600 font-medium' : ''}>
                {input.length}/500
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}