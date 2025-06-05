import { useState } from "react";
import { Search, Filter, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const mockPosts = [
  {
    id: 1,
    content: "The biggest mistake I made in my first startup? Thinking I could do everything myself. Here's what I learned...",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    title: "Tech Entrepreneur",
    likes: 2847,
    comments: 156,
    shares: 89,
    tone: "Educational",
    length: "Medium",
    time: "2 hours ago"
  },
  {
    id: 2,
    content: "Just got rejected from my dream job. Here's why I'm celebrating...",
    author: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
    title: "Product Manager",
    likes: 4521,
    comments: 234,
    shares: 167,
    tone: "Inspirational",
    length: "Short",
    time: "4 hours ago"
  },
  {
    id: 3,
    content: "I analyzed 1000+ viral LinkedIn posts. Here are the 7 patterns that guarantee engagement:",
    author: "Anna Thompson",
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face",
    title: "Marketing Strategist",
    likes: 6789,
    comments: 445,
    shares: 234,
    tone: "Data-driven",
    length: "Long",
    time: "6 hours ago"
  },
  {
    id: 4,
    content: "My boss told me I'd never make it in tech. 5 years later, I'm leading a team of 50 engineers.",
    author: "David Park",
    avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=face",
    title: "Engineering Director",
    likes: 3456,
    comments: 198,
    shares: 123,
    tone: "Personal",
    length: "Medium",
    time: "8 hours ago"
  },
  {
    id: 5,
    content: "The #1 skill that got me promoted 3x in 2 years (it's not what you think):",
    author: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=face",
    title: "Career Coach",
    likes: 2134,
    comments: 87,
    shares: 56,
    tone: "Professional",
    length: "Short",
    time: "10 hours ago"
  },
  {
    id: 6,
    content: "I quit my 6-figure job to start a business. Here's what happened next...",
    author: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    title: "Startup Founder",
    likes: 5678,
    comments: 321,
    shares: 189,
    tone: "Story",
    length: "Long",
    time: "12 hours ago"
  }
];

const filters = {
  likes: ["500+", "1K+", "5K+", "10K+"],
  tone: ["Educational", "Inspirational", "Personal", "Professional", "Data-driven", "Story"],
  length: ["Short", "Medium", "Long"],
  time: ["Last hour", "Last 24h", "Last week", "Last month"]
};

export function ViralContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    likes: "",
    tone: "",
    length: "",
    time: ""
  });

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Viral Content
        </h1>
        <p className="text-gray-600">Discover trending posts to inspire your content strategy</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search viral content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white shadow-sm border-gray-200 focus:border-purple-300 focus:ring-purple-200"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(filters).map(([key, options]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 capitalize">{key}:</span>
              <select 
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white shadow-sm focus:border-purple-300 focus:ring-1 focus:ring-purple-200 transition-colors"
                value={selectedFilters[key as keyof typeof selectedFilters]}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, [key]: e.target.value }))}
              >
                <option value="">All</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              {/* Author Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{post.author}</p>
                  <p className="text-sm text-gray-500 truncate">{post.title}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-50">
                    <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-gray-800 line-clamp-3 leading-relaxed">{post.content}</p>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">{post.comments}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-green-500 transition-colors cursor-pointer">
                  <Share2 className="w-4 h-4" />
                  <span className="font-medium">{post.shares}</span>
                </div>
              </div>

              {/* Tags and Time */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                    {post.tone}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-300">
                    {post.length}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500 font-medium">{post.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}