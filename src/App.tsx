import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ViralContent } from "./pages/ViralContent";
import { ViralTemplates } from "./pages/ViralTemplates";
import { MyPosts } from "./pages/MyPosts";
import { LinkedInGPT } from "./pages/LinkedInGPT";
import GenerateContent from "./pages/GenerateContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/viral-content" replace />} />
            <Route path="/linkedin-gpt" element={<LinkedInGPT />} />
            <Route path="/viral-content" element={<ViralContent />} />
            <Route path="/viral-templates" element={<ViralTemplates />} />
            <Route path="/generate-content" element={<GenerateContent />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/billing" element={<div className="p-6"><h1 className="text-2xl font-bold">Billing</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/help" element={<div className="p-6"><h1 className="text-2xl font-bold">Help</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
