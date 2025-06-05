import { useState } from "react";
import { Search, Filter, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const mockPosts = [
  {
    id: 1,
    content: "The biggest mistake I made in my first startup? Thinking I could do everything myself. Here's what I learned...",
    author: "Sarah Chen",
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Viral Content</h1>
        <p className="text-gray-600">Discover trending posts to inspire your content strategy</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search viral content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(filters).map(([key, options]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 capitalize">{key}:</span>
              <select 
                className="px-3 py-1 border border-gray-200 rounded-md text-sm"
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
          <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="mb-3">
                <p className="text-sm text-gray-900 line-clamp-3">{post.content}</p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="font-medium">{post.author}</span>
                <span>{post.time}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">{post.tone}</Badge>
                <Badge variant="outline" className="text-xs">{post.length}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}