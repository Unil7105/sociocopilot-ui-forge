import { NavLink, useLocation } from "react-router-dom";
import { 
  Zap, 
  FileText, 
  Calendar, 
  Bot, 
  BarChart3, 
  Settings,
  CreditCard,
  HelpCircle,
  Sparkles
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Writer Copilot", url: "/linkedin-gpt", icon: Bot },
  { title: "Viral Content", url: "/viral-content", icon: Zap },
  { title: "Viral Templates", url: "/viral-templates", icon: FileText },
  { title: "My Posts", url: "/my-posts", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarComponent className="w-64 border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            SocioCopilot
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-amber-100 text-amber-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-amber-100 text-amber-700"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </SidebarComponent>
  );
}