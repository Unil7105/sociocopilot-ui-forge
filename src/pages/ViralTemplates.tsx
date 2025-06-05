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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Viral Templates</h1>
        <p className="text-gray-600">Ready-to-use templates for creating engaging content</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{template.title}</CardTitle>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Template Preview */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic">{template.preview}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{template.uses.toLocaleString()} uses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{template.saves} saves</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Copy className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}