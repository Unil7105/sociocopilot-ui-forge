import { useState } from "react";
import { Search, Copy, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = ["All", "Funny", "Announcement", "Stories", "Questions", "Tips", "Personal", "Achievement"];

const mockTemplates = [
  {
    id: 1,
    title: "Failure Blueprint",
    description: "Share a failure that led to success",
    category: "Stories",
    template: "I failed at [specific situation]. Here's what I learned and how it made me better...",
    uses: 2847,
    saves: 156,
    preview: "I failed at my first startup. Here's what I learned and how it made me better at building products..."
  },
  {
    id: 2,
    title: "Today Years Old",
    description: "Share surprising discoveries",
    category: "Funny",
    template: "Today years old when I realized [surprising fact]. Mind = blown 🤯",
    uses: 4521,
    saves: 234,
    preview: "Today years old when I realized that 'OK' stands for 'Oll Korrect'. Mind = blown 🤯"
  },
  {
    id: 3,
    title: "The 3-2-1 Rule",
    description: "Share insights in digestible format",
    category: "Tips",
    template: "3 [things you learned]\n2 [actionable tips]\n1 [key takeaway]",
    uses: 6789,
    saves: 445,
    preview: "3 lessons from building a startup\n2 tips for first-time founders\n1 mindset shift that changed everything"
  },
  {
    id: 4,
    title: "Promotion Announcement",
    description: "Celebrate career milestones",
    category: "Announcement",
    template: "Excited to share that I've been promoted to [new role] at [company]! Grateful for [people/experiences]...",
    uses: 3456,
    saves: 198,
    preview: "Excited to share that I've been promoted to Senior Developer at TechCorp! Grateful for my amazing team..."
  },
  {
    id: 5,
    title: "Ask Me Anything",
    description: "Engage with questions",
    category: "Questions",
    template: "I've been [doing something] for [time period]. AMA about [topic]!",
    uses: 2134,
    saves: 87,
    preview: "I've been building SaaS products for 8 years. AMA about product development, growth, or entrepreneurship!"
  },
  {
    id: 6,
    title: "Behind the Scenes",
    description: "Show your process",
    category: "Personal",
    template: "Here's what really happens behind the scenes when [process/situation]...",
    uses: 5678,
    saves: 321,
    preview: "Here's what really happens behind the scenes when launching a product (spoiler: it's chaos)..."
  }
];

export function ViralTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      <div className="p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Viral Templates
          </h1>
          <p className="text-gray-600 text-lg">Ready-to-use templates for creating engaging content</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 focus:ring-2 focus:ring-purple-300 focus:shadow-xl transition-all duration-300 text-base"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-medium transition-all duration-200 rounded-xl ${
                    selectedCategory === category 
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg" 
                      : "bg-white/80 hover:bg-white border-gray-200 hover:shadow-md"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/95">
              {/* Gradient Header */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {template.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-0 font-semibold px-3 py-1 ml-3">
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Template Preview */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-700 italic leading-relaxed font-medium">{template.preview}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group/stat">
                      <Eye className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                      <span className="font-semibold">{template.uses.toLocaleString()} uses</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group/stat">
                      <Heart className="w-4 h-4 group-hover/stat:scale-110 transition-transform" />
                      <span className="font-semibold">{template.saves} saves</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                    <Copy className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white border-gray-200 hover:shadow-md transition-all duration-200">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}