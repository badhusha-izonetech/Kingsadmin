import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  Quote,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import dentalLogo from "@/assets/dental-logo.png";
import AnnouncementManagement from "@/components/admin/AnnouncementManagement";
import ContactDetailsManagement from "@/components/admin/ContactDetailsManagement";
import CourseEnquiryManagement from "@/components/admin/CourseEnquiryManagement";
import CourseManagement from "@/components/admin/CourseManagement";
import DashboardOverview from "@/components/admin/DashboardOverview";
import FacultyManagement from "@/components/admin/FacultyManagement";
import GalleryManagement from "@/components/admin/GalleryManagement";
import NotificationBell from "@/components/admin/NotificationBell";
import PopupManagement from "@/components/admin/PopupManagement";
import TestimonialManagement from "@/components/admin/TestimonialManagement";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "faculty", label: "Faculty", icon: Users },
  { id: "course-enquiries", label: "Course Enquiries", icon: GraduationCap },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "contacts", label: "Contacts", icon: MessageSquare },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "popups", label: "Popups", icon: Sparkles },
  { id: "testimonials", label: "Testimonials", icon: Quote },
] as const;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<(typeof sections)[number]["id"]>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const currentSection = sections.find((section) => section.id === activeTab) ?? sections[0];
  const CurrentIcon = currentSection.icon;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const openSection = (sectionId: (typeof sections)[number]["id"]) => {
    setActiveTab(sectionId);
    setIsSidebarOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 border-b border-border px-4 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
          <img src={dentalLogo} alt="Kings Dental Academy" className="h-7 w-7 object-contain" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">Kings Dental Academy</p>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeTab === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => openSection(section.id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Button type="button" variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-card lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col border-r border-border bg-card shadow-2xl">
            <div className="absolute right-3 top-3">
              <Button type="button" variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-start gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="mt-1 shrink-0 lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Admin Control Room</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Manage courses, faculty, enquiries, media, and announcements from one place.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <NotificationBell />
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof sections)[number]["id"])}>
            <div className="mb-6 rounded-md border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <CurrentIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">Active Section</p>
                  <h2 className="font-display text-2xl font-semibold text-foreground">{currentSection.label}</h2>
                </div>
              </div>
            </div>

            <TabsContent value="overview" className="mt-0">
              <DashboardOverview onOpenSection={(section) => openSection(section as (typeof sections)[number]["id"])} />
            </TabsContent>
            <TabsContent value="courses" className="mt-0">
              <CourseManagement />
            </TabsContent>
            <TabsContent value="faculty" className="mt-0">
              <FacultyManagement />
            </TabsContent>
            <TabsContent value="course-enquiries" className="mt-0">
              <CourseEnquiryManagement />
            </TabsContent>
            <TabsContent value="announcements" className="mt-0">
              <AnnouncementManagement />
            </TabsContent>
            <TabsContent value="contacts" className="mt-0">
              <ContactDetailsManagement />
            </TabsContent>
            <TabsContent value="gallery" className="mt-0">
              <GalleryManagement />
            </TabsContent>
            <TabsContent value="popups" className="mt-0">
              <PopupManagement />
            </TabsContent>
            <TabsContent value="testimonials" className="mt-0">
              <TestimonialManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
