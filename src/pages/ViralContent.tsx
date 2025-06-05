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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
      <div className="p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Viral Content
          </h1>
          <p className="text-gray-600 text-lg">Discover trending posts to inspire your content strategy</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search viral content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 focus:ring-2 focus:ring-purple-300 focus:shadow-xl transition-all duration-300 text-base"
            />
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Filter Content</h3>
              <p className="text-sm text-gray-600">Discover content that matches your criteria</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(filters).map(([key, options]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 capitalize block">{key}</label>
                  <select 
                    className="w-full px-4 py-3 border-0 rounded-2xl text-sm bg-white shadow-lg focus:shadow-xl focus:ring-2 focus:ring-purple-400 transition-all duration-300 font-medium text-gray-700 hover:bg-gray-50"
                    value={selectedFilters[key as keyof typeof selectedFilters]}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, [key]: e.target.value }))}
                  >
                    <option value="">All {key}</option>
                    {options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/95">
              <CardContent className="p-0">
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
                
                <div className="p-6">
                  {/* Author Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <Avatar className="w-12 h-12 border-3 border-white shadow-lg ring-2 ring-purple-100">
                      <AvatarImage src={post.avatar} alt={post.author} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate text-base">{post.author}</p>
                      <p className="text-sm text-gray-600 truncate font-medium">{post.title}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-purple-50 rounded-full group/btn">
                        <Bookmark className="w-4 h-4 text-gray-400 group-hover/btn:text-purple-600 transition-colors" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <p className="text-gray-800 line-clamp-3 leading-relaxed text-base">{post.content}</p>
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-6 mb-5 text-sm">
                    <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer group/stat">
                      <Heart className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                      <span className="font-semibold">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer group/stat">
                      <MessageCircle className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer group/stat">
                      <Share2 className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                      <span className="font-semibold">{post.shares}</span>
                    </div>
                  </div>

                  {/* Tags and Time */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 font-medium px-3 py-1">
                        {post.tone}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-200 bg-gray-50 font-medium px-3 py-1">
                        {post.length}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{post.time}</span>
                  </div>
                </div>
            </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}