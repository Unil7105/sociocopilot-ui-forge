import { useState, useEffect } from "react";
import { Search, Filter, Heart, MessageCircle, Share2, Bookmark, Moon, Sun, TrendingUp, Users, MoreHorizontal, Flame, Zap, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
const mockPosts = [{
  id: 1,
  content: "The biggest mistake I made in my first startup? Thinking I could do everything myself. Here's what I learned: delegate early, trust your team, and focus on what only you can do. This mindset shift increased our productivity by 300%.",
  author: "Sarah Chen",
  avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
  title: "Tech Entrepreneur",
  followers: "45.2K",
  likes: 2847,
  comments: 156,
  shares: 89,
  tone: "Educational",
  length: "Medium",
  time: "2 hours ago",
  trending: "🔥 Trending",
  isBookmarked: false,
  previewExpanded: false
}, {
  id: 2,
  content: "Just got rejected from my dream job. Here's why I'm celebrating: The interview process revealed gaps in my skills I didn't know existed. Now I have a clear roadmap for growth.",
  author: "Mike Rodriguez",
  avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
  title: "Product Manager",
  followers: "23.1K",
  likes: 4521,
  comments: 234,
  shares: 167,
  tone: "Inspirational",
  length: "Short",
  time: "4 hours ago",
  trending: "🚀 Most Shared",
  isBookmarked: true,
  previewExpanded: false
}, {
  id: 3,
  content: "I analyzed 1000+ viral LinkedIn posts. Here are the 7 patterns that guarantee engagement: 1) Start with a hook 2) Tell a story 3) Add data 4) Use emotions 5) Include a lesson 6) End with a question 7) Post at optimal times.",
  author: "Anna Thompson",
  avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face",
  title: "Marketing Strategist",
  followers: "67.8K",
  likes: 6789,
  comments: 445,
  shares: 234,
  tone: "Data-driven",
  length: "Long",
  time: "6 hours ago",
  trending: "🔥 Trending",
  isBookmarked: false,
  previewExpanded: false
}, {
  id: 4,
  content: "My boss told me I'd never make it in tech. 5 years later, I'm leading a team of 50 engineers. The lesson? Don't let others define your potential. Your biggest critics often become your biggest motivation.",
  author: "David Park",
  avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=face",
  title: "Engineering Director",
  followers: "34.5K",
  likes: 3456,
  comments: 198,
  shares: 123,
  tone: "Personal",
  length: "Medium",
  time: "8 hours ago",
  trending: "",
  isBookmarked: false,
  previewExpanded: false
}, {
  id: 5,
  content: "The #1 skill that got me promoted 3x in 2 years (it's not what you think): Active listening. In meetings, I listen 80% and speak 20%. This simple shift made me indispensable to leadership.",
  author: "Lisa Wang",
  avatar: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=face",
  title: "Career Coach",
  followers: "18.9K",
  likes: 2134,
  comments: 87,
  shares: 56,
  tone: "Professional",
  length: "Short",
  time: "10 hours ago",
  trending: "",
  isBookmarked: true,
  previewExpanded: false
}, {
  id: 6,
  content: "I quit my 6-figure job to start a business. Here's what happened next: 6 months of struggle, $10K in savings burned, and the best decision I ever made. Sometimes you have to risk it all to find your true potential.",
  author: "James Wilson",
  avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
  title: "Startup Founder",
  followers: "89.3K",
  likes: 5678,
  comments: 321,
  shares: 189,
  tone: "Story",
  length: "Long",
  time: "12 hours ago",
  trending: "🚀 Most Shared",
  isBookmarked: false,
  previewExpanded: false
}];
const filterIcons = {
  likes: "❤️",
  tone: "🎭",
  length: "📏",
  time: "⏰"
};
const filters = {
  likes: ["500+", "1K+", "5K+", "10K+"],
  tone: ["Educational", "Inspirational", "Personal", "Professional", "Data-driven", "Story"],
  length: ["Short", "Medium", "Long"],
  time: ["Last hour", "Last 24h", "Last week", "Last month"]
};
const sortOptions = [{
  label: "Most Viral",
  value: "viral"
}, {
  label: "Most Shared",
  value: "shares"
}, {
  label: "Most Liked",
  value: "likes"
}, {
  label: "Most Recent",
  value: "recent"
}];
export function ViralContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    likes: "",
    tone: "",
    length: "",
    time: ""
  });
  const [sortBy, setSortBy] = useState("viral");
  const [posts, setPosts] = useState(mockPosts);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const {
    theme,
    setTheme
  } = useTheme();
  const toggleBookmark = (postId: number) => {
    setPosts(prev => prev.map(post => post.id === postId ? {
      ...post,
      isBookmarked: !post.isBookmarked
    } : post));
  };
  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, posts.length));
  };
  return <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/20 dark:from-slate-900 dark:via-purple-950/20 dark:to-blue-950/20 transition-colors duration-300">
        <div className="p-8 pt-12">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
                  Viral Content
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
                  Discover trending posts that convert, inspire your content strategy, and boost engagement
                </p>
              </div>
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                <Sun className="w-4 h-4 text-yellow-500" />
                <Switch checked={theme === "dark"} onCheckedChange={checked => setTheme(checked ? "dark" : "light")} className="data-[state=checked]:bg-purple-600" />
                <Moon className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="mb-12 space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search viral content, creators, or topics..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-14 h-14 bg-gradient-to-r from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-800/80 backdrop-blur-sm shadow-xl border-0 focus:ring-2 focus:ring-purple-400 focus:shadow-2xl transition-all duration-300 text-base rounded-2xl" />
            </div>

            {/* Filter Pills and Sort */}
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex flex-wrap gap-3">
                {Object.entries(filters).map(([key, options]) => <DropdownMenu key={key}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className={`h-10 px-4 rounded-full border-2 transition-all duration-300 hover:shadow-lg ${selectedFilters[key as keyof typeof selectedFilters] ? 'bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/50 dark:border-purple-600 dark:text-purple-300' : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800/80 dark:border-gray-600 dark:text-gray-300'}`}>
                        <span className="mr-2">{filterIcons[key as keyof typeof filterIcons]}</span>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        {selectedFilters[key as keyof typeof selectedFilters] && <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                            {selectedFilters[key as keyof typeof selectedFilters]}
                          </Badge>}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl border-0 rounded-xl">
                      <DropdownMenuItem onClick={() => setSelectedFilters(prev => ({
                    ...prev,
                    [key]: ""
                  }))} className="rounded-lg">
                        All {key}
                      </DropdownMenuItem>
                      {options.map(option => <DropdownMenuItem key={option} onClick={() => setSelectedFilters(prev => ({
                    ...prev,
                    [key]: option
                  }))} className="rounded-lg">
                          {option}
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>)}
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 px-4 rounded-full bg-white/80 border-2 border-gray-200 hover:shadow-lg transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-600">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    {sortOptions.find(opt => opt.value === sortBy)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl border-0 rounded-xl">
                  {sortOptions.map(option => <DropdownMenuItem key={option.value} onClick={() => setSortBy(option.value)} className="rounded-lg">
                      {option.label}
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Posts Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {posts.slice(0, visiblePosts).map(post => <Card key={post.id} className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/95 dark:hover:bg-gray-800/95 relative will-change-transform">
                {/* Trending Badge */}
                {post.trending && <div className="absolute top-4 left-4 z-10">
                    
                  </div>}

                <CardContent className="p-0">
                  {/* Gradient Header */}
                  <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
                  
                  <div className="p-6">
                    {/* Author Header with Hover Card */}
                    <div className="flex items-center gap-4 mb-6">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center gap-3 cursor-pointer">
                            <Avatar className="w-12 h-12 border-2 border-white shadow-lg ring-2 ring-purple-100 dark:ring-purple-800">
                              <AvatarImage src={post.avatar} alt={post.author} className="object-cover" />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900 dark:text-gray-100 text-base leading-tight">{post.author}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-tight">{post.title}</p>
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl border-0 rounded-2xl">
                          <div className="flex gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={post.avatar} alt={post.author} />
                              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{post.author}</h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">{post.title}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>{post.followers} followers</span>
                              </div>
                              <Button className="mt-3 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                                Follow
                              </Button>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      
                      <div className="flex-shrink-0">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-purple-50 dark:hover:bg-purple-900/50 rounded-full group/btn transition-all duration-300" onClick={() => toggleBookmark(post.id)}>
                              <Bookmark className={`w-4 h-4 transition-all duration-300 ${post.isBookmarked ? 'text-purple-600 fill-purple-600' : 'text-gray-400 group-hover/btn:text-purple-600'}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{post.isBookmarked ? 'Remove bookmark' : 'Bookmark post'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base line-height-7">
                        {post.content}
                      </p>
                    </div>

                    {/* Engagement Stats with Tooltips */}
                    <div className="flex items-center gap-6 mb-6 text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 hover:text-red-500 transition-all duration-300 cursor-pointer group/stat">
                            <div className="p-1 rounded-full group-hover/stat:bg-red-50 dark:group-hover/stat:bg-red-900/20 transition-colors">
                              <Heart className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                            </div>
                            <span className="font-semibold">{post.likes.toLocaleString()}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>❤️ {post.likes.toLocaleString()} likes</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 cursor-pointer group/stat">
                            <div className="p-1 rounded-full group-hover/stat:bg-blue-50 dark:group-hover/stat:bg-blue-900/20 transition-colors">
                              <MessageCircle className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                            </div>
                            <span className="font-semibold">{post.comments}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>💬 {post.comments} comments</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 hover:text-green-500 transition-all duration-300 cursor-pointer group/stat">
                            <div className="p-1 rounded-full group-hover/stat:bg-green-50 dark:group-hover/stat:bg-green-900/20 transition-colors">
                              <Share2 className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                            </div>
                            <span className="font-semibold">{post.shares}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>🔁 {post.shares} shares</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Tags and Time */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-700 dark:text-purple-300 border-0 font-medium px-3 py-1">
                          {post.tone}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-medium px-3 py-1">
                          {post.length}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{post.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Load More Button */}
          {visiblePosts < posts.length && <div className="text-center">
              <Button onClick={loadMore} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <TrendingUp className="w-4 h-4 mr-2" />
                Load More Viral Content
              </Button>
            </div>}
        </div>
      </div>
    </TooltipProvider>;
}