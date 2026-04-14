import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import FloatingSocial from "@/components/FloatingSocial";
import AboutPage from "./pages/AboutPage";
import Achievements from "./pages/Achievements";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import ContactPage from "./pages/ContactPage";
import FacultyPage from "./pages/FacultyPage";
import GalleryPage from "./pages/GalleryPage";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ProgramsPage from "./pages/ProgramsPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

const ConditionalFloatingSocial = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <FloatingSocial />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ConditionalFloatingSocial />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/announcements/:id" element={<AnnouncementDetail />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/faculty/:slug" element={<FacultyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
