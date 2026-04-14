import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquare,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const currentSection = sections.find((section) => section.id === activeTab) ?? sections[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/95 backdrop-blur">
        <div className="da-container flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Admin Control Room</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-medium">
                Frontend demo mode
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage courses, faculty, enquiries, media, and announcements from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <NotificationBell />
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="da-container py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof sections)[number]["id"])}>
          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Active Section</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{currentSection.label}</h2>
              </div>

              <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-2xl bg-muted/70 p-2 lg:w-auto">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="gap-2 rounded-xl px-4 py-2 text-sm data-[state=active]:bg-background"
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview">
            <DashboardOverview onOpenSection={setActiveTab} />
          </TabsContent>
          <TabsContent value="courses">
            <CourseManagement />
          </TabsContent>
          <TabsContent value="faculty">
            <FacultyManagement />
          </TabsContent>
          <TabsContent value="course-enquiries">
            <CourseEnquiryManagement />
          </TabsContent>
          <TabsContent value="announcements">
            <AnnouncementManagement />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactDetailsManagement />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>
          <TabsContent value="popups">
            <PopupManagement />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
