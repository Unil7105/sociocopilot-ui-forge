import { useState } from "react";
import { Send, User, Sparkles, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const promptSuggestions = [
  "Write a post about remote work benefits",
  "Create content about career growth tips",
  "Generate a post about startup lessons",
  "Write about leadership in tech",
  "Create content about work-life balance"
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LinkedIn GPT</h1>
            <p className="text-gray-600">AI-powered LinkedIn content writer</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-purple-100 text-purple-700">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">Unil's AI LinkedIn Writer</h3>
              <p className="text-sm text-gray-600">Ready to create engaging content for your audience</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Suggestions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Try these prompts:</h3>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(prompt)}
              className="text-xs hover:bg-purple-50 hover:border-purple-200"
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "ai" && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-2xl ${message.type === "user" ? "order-first" : ""}`}>
              <Card className={message.type === "user" ? "bg-purple-600 text-white" : "bg-white"}>
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  
                  {message.type === "ai" && message.engagement && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>Predicted engagement:</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{message.engagement.likes}</span>
                          </div>
                          <span>{message.engagement.comments} comments</span>
                          <span>{message.engagement.shares} shares</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className={`text-xs text-gray-500 mt-1 ${message.type === "user" ? "text-right" : "text-left"}`}>
                {message.timestamp}
              </div>
            </div>

            {message.type === "user" && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gray-100">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Describe the LinkedIn post you want to create..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}