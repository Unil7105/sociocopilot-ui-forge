import { useState } from "react";
import { Search, Copy, Heart, Eye, MessageSquare, Star, Bookmark, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const categories = [{
  name: "All",
  icon: "⭐"
}, {
  name: "Funny",
  icon: "🎭"
}, {
  name: "Announcement",
  icon: "📢"
}, {
  name: "Stories",
  icon: "📚"
}, {
  name: "Questions",
  icon: "🗣"
}, {
  name: "Tips",
  icon: "💡"
}, {
  name: "Personal",
  icon: "👤"
}, {
  name: "Achievement",
  icon: "🏆"
}];
const mockTemplates = [{
  id: 1,
  title: "Failure Blueprint",
  description: "Share a failure that led to success",
  category: "Stories",
  template: "I failed at [specific situation]. Here's what I learned and how it made me better...",
  uses: 2847,
  saves: 156,
  preview: "I failed at my first startup. Here's what I learned and how it made me better at building products...",
  trending: true,
  isNew: false
}, {
  id: 2,
  title: "Today Years Old",
  description: "Share surprising discoveries",
  category: "Funny",
  template: "Today years old when I realized [surprising fact]. Mind = blown 🤯",
  uses: 4521,
  saves: 234,
  preview: "Today years old when I realized that 'OK' stands for 'Oll Korrect'. Mind = blown 🤯",
  trending: false,
  isNew: true
}, {
  id: 3,
  title: "The 3-2-1 Rule",
  description: "Share insights in digestible format",
  category: "Tips",
  template: "3 [things you learned]\n2 [actionable tips]\n1 [key takeaway]",
  uses: 6789,
  saves: 445,
  preview: "3 lessons from building a startup\n2 tips for first-time founders\n1 mindset shift that changed everything",
  trending: true,
  isNew: false
}, {
  id: 4,
  title: "Promotion Announcement",
  description: "Celebrate career milestones",
  category: "Announcement",
  template: "Excited to share that I've been promoted to [new role] at [company]! Grateful for [people/experiences]...",
  uses: 3456,
  saves: 198,
  preview: "Excited to share that I've been promoted to Senior Developer at TechCorp! Grateful for my amazing team...",
  trending: false,
  isNew: false
}, {
  id: 5,
  title: "Ask Me Anything",
  description: "Engage with questions",
  category: "Questions",
  template: "I've been [doing something] for [time period]. AMA about [topic]!",
  uses: 2134,
  saves: 87,
  preview: "I've been building SaaS products for 8 years. AMA about product development, growth, or entrepreneurship!",
  trending: false,
  isNew: true
}, {
  id: 6,
  title: "Behind the Scenes",
  description: "Show your process",
  category: "Personal",
  template: "Here's what really happens behind the scenes when [process/situation]...",
  uses: 5678,
  saves: 321,
  preview: "Here's what really happens behind the scenes when launching a product (spoiler: it's chaos)...",
  trending: false,
  isNew: false
}];
export function ViralTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedTemplates, setSavedTemplates] = useState<number[]>([]);
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleSaveTemplate = (templateId: number) => {
    setSavedTemplates(prev => prev.includes(templateId) ? prev.filter(id => id !== templateId) : [...prev, templateId]);
  };
  return <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
        {/* Enhanced Header with Gradient Background */}
        <div className=" text-black pt-16 pb-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 tracking-tight text-indigo-600">
                Viral Templates
              </h1>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                Ready-to-use templates for creating engaging content that converts and goes viral
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input placeholder="Search viral templates..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-14 h-14 bg-white/95 backdrop-blur-sm shadow-2xl border-0 focus:ring-4 focus:ring-white/30 hover:shadow-3xl transition-all duration-300 text-lg rounded-2xl font-medium placeholder:text-gray-500" />
              </div>
            </div>

            {/* Pill-Style Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => <Button key={category.name} variant="ghost" size="sm" onClick={() => setSelectedCategory(category.name)} className={`px-6 py-3 font-semibold transition-all duration-300 rounded-full text-sm hover:scale-105 ${selectedCategory === category.name ? "bg-white text-purple-600 shadow-xl scale-105 hover:shadow-2xl" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"}`}>
                  <span className="mr-2 text-base">{category.icon}</span>
                  {category.name}
                </Button>)}
            </div>
          </div>
        </div>

        {/* Enhanced Templates Grid */}
        <div className="px-8 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTemplates.map(template => <Card key={template.id} className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out border-0 shadow-lg bg-white backdrop-blur-md rounded-3xl overflow-hidden relative will-change-transform">
                {/* Trending/New Badges */}
                {template.trending && <div className="absolute top-4 right-4 z-10">
                    
                  </div>}
                {template.isNew && <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                      🆕 New
                    </Badge>
                  </div>}

                <CardContent className="p-0 h-full flex flex-col">
                  {/* Animated Gradient Border */}
                  <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 group-hover:h-2 transition-all duration-300"></div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Title and Category */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-2xl mb-3 font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">
                          {template.title}
                        </CardTitle>
                        <p className="text-[15px] text-gray-600 leading-relaxed">{template.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 font-semibold px-3 py-1 ml-4 flex-shrink-0 rounded-full">
                        {template.category}
                      </Badge>
                    </div>

                    {/* Enhanced Template Preview */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-6 rounded-2xl border border-gray-100 mb-8 flex-1 cursor-pointer hover:shadow-inner transition-all duration-200">
                          <p className="text-[15px] text-gray-700 leading-relaxed font-medium line-clamp-3">
                            {template.preview}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-md p-4 bg-gray-900 text-white rounded-xl">
                        <p className="text-sm leading-relaxed">{template.template}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Enhanced Icon-Based Stats */}
                    <div className="flex items-center gap-6 mb-8">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors cursor-pointer group/stat">
                            <Star className="w-5 h-5 group-hover/stat:scale-110 transition-transform fill-current" />
                            <span className="font-bold text-sm">{(template.uses / 1000).toFixed(1)}K</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{template.uses.toLocaleString()} uses</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors cursor-pointer group/stat">
                            <Heart className="w-5 h-5 group-hover/stat:scale-110 transition-transform" />
                            <span className="font-bold text-sm">{template.saves}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{template.saves} saves</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-100 mt-auto">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold h-12 rounded-xl relative overflow-hidden group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                        <Copy className="w-5 h-5 mr-2" />
                        Use Template
                      </Button>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="outline" className={`h-12 w-12 rounded-xl border-2 transition-all duration-300 ${savedTemplates.includes(template.id) ? "bg-pink-50 border-pink-300 text-pink-600 hover:bg-pink-100" : "bg-white border-gray-200 text-gray-400 hover:border-pink-300 hover:text-pink-600"}`} onClick={() => handleSaveTemplate(template.id)}>
                            <Heart className={`w-5 h-5 transition-all duration-300 ${savedTemplates.includes(template.id) ? "fill-current scale-110" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{savedTemplates.includes(template.id) ? "Remove from favorites" : "Save to favorites"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl">
              <Sparkles className="w-5 h-5 mr-2" />
              Load More Templates
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>;
}