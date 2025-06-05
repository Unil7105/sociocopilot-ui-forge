import { useState } from "react";
import { Plus, Calendar, Clock, Edit, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-semibold text-pink-600">My Posts</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-gray-900 min-w-[120px] text-center">
                June 5-11, 2024
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-600 hover:text-gray-900"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={selectedView === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("week")}
                className={`h-7 px-3 text-xs font-semibold ${selectedView === "week" ? "bg-card shadow-sm" : "hover:bg-accent"}`}
              >
                Week
              </Button>
              <Button
                variant={selectedView === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("month")}
                className={`h-7 px-3 text-xs font-semibold ${selectedView === "month" ? "bg-card shadow-sm" : "hover:bg-accent"}`}
              >
                Month
              </Button>
            </div>
            <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="p-8">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-border">
            {weekDays.map((dayData, index) => (
              <div key={index} className="p-4 text-center border-r border-border last:border-r-0">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  {dayData.day}
                </div>
                <div className="text-sm font-semibold text-gray-900">{dayData.date}</div>
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-7 min-h-[600px]">
            {weekDays.map((dayData, index) => (
              <div 
                key={index} 
                className="border-r border-border last:border-r-0 p-3 bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-2 h-full">
                  {dayData.posts.map((post) => (
                    <div
                      key={post.id}
                      className="group bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            post.status === 'scheduled' ? 'bg-green-500' : 
                            post.status === 'draft' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-xs font-medium text-gray-500">{post.time}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-3 h-3 text-gray-400" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-900 leading-relaxed line-clamp-3 mb-2">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs font-medium border-0 ${
                            post.status === 'scheduled' ? 'bg-green-50 text-green-700' :
                            post.status === 'draft' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {/* Add Post Area */}
                  <div className="flex-1 flex items-end">
                    <button className="w-full p-3 border-2 border-dashed border-border rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 group">
                      <div className="flex flex-col items-center gap-2">
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">Add post</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}