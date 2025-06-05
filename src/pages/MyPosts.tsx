import { useState } from "react";
import { Plus, Calendar, Clock, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const weekDays = [
  { day: "Thu", date: "Jun 5", posts: [] },
  { day: "Fri", date: "Jun 6", posts: [
    { id: 1, content: "Excited to share our new product launch...", time: "9:00 AM", status: "scheduled" }
  ] },
  { day: "Sat", date: "Jun 7", posts: [] },
  { day: "Sun", date: "Jun 8", posts: [] },
  { day: "Mon", date: "Jun 9", posts: [
    { id: 2, content: "Weekly motivation: The only impossible journey...", time: "8:00 AM", status: "scheduled" },
    { id: 3, content: "Behind the scenes of our latest feature...", time: "2:00 PM", status: "draft" }
  ] },
  { day: "Tue", date: "Jun 10", posts: [] },
  { day: "Wed", date: "Jun 11", posts: [
    { id: 4, content: "Tips for better networking in tech...", time: "10:00 AM", status: "scheduled" }
  ] }
];

export function MyPosts() {
  const [selectedView, setSelectedView] = useState("week");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "published":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
        <p className="text-gray-600">Schedule and manage your social media content</p>
      </div>

      {/* View Toggle */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant={selectedView === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView("week")}
            className={selectedView === "week" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Week View
          </Button>
          <Button
            variant={selectedView === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView("month")}
            className={selectedView === "month" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            Month View
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((dayData, index) => (
          <div key={index} className="min-h-[300px]">
            {/* Day Header */}
            <div className="text-center mb-4 p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900">{dayData.day}</div>
              <div className="text-sm text-gray-600">{dayData.date}</div>
            </div>

            {/* Posts for the day */}
            <div className="space-y-3">
              {dayData.posts.map((post) => (
                <Card key={post.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{post.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-900 mb-2 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getStatusColor(post.status)}`}
                    >
                      {post.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}

              {/* Add Post Button */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Add Post</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}