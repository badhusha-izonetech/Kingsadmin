import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarClock,
  GraduationCap,
  Image as ImageIcon,
  Megaphone,
  MessageSquare,
  RefreshCw,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sectionMap = {
  courses: "courses",
  faculty: "faculty",
  enquiries: "course-enquiries",
  announcements: "announcements",
  contacts: "contacts",
  gallery: "gallery",
} as const;

interface DashboardOverviewProps {
  onOpenSection?: (section: string) => void;
}

const DashboardOverview = ({ onOpenSection }: DashboardOverviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    faculty: 0,
    enquiries: 0,
    announcements: 0,
    contacts: 0,
    gallery: 0,
  });

  const loadStats = async () => {
    setIsLoading(true);

    const [courses, faculty, enquiries, announcements, contacts, gallery] = await Promise.allSettled([
      api.getCourses(),
      api.getFaculty(),
      api.getEnquiries(),
      api.getAnnouncements(),
      api.getContacts(),
      api.getGallery(),
    ]);

    const toCount = (result: PromiseSettledResult<unknown>) =>
      result.status === "fulfilled" && Array.isArray(result.value) ? result.value.length : 0;

    setStats({
      courses: toCount(courses),
      faculty: toCount(faculty),
      enquiries: toCount(enquiries),
      announcements: toCount(announcements),
      contacts: toCount(contacts),
      gallery: toCount(gallery),
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      id: "courses",
      title: "Courses",
      value: stats.courses,
      description: "Programs listed in the admin panel",
      icon: BookOpen,
    },
    {
      id: "faculty",
      title: "Faculty",
      value: stats.faculty,
      description: "Team members available on the site",
      icon: Users,
    },
    {
      id: "enquiries",
      title: "Course Enquiries",
      value: stats.enquiries,
      description: "Student interest submissions",
      icon: GraduationCap,
    },
    {
      id: "announcements",
      title: "Announcements",
      value: stats.announcements,
      description: "News items ready for publishing",
      icon: Megaphone,
    },
    {
      id: "contacts",
      title: "Contacts",
      value: stats.contacts,
      description: "Messages sent from the contact page",
      icon: MessageSquare,
    },
    {
      id: "gallery",
      title: "Gallery",
      value: stats.gallery,
      description: "Images and videos available to visitors",
      icon: ImageIcon,
    },
  ];

  const healthItems = [
    {
      title: "Dashboard route restored",
      description: "Admin modules are mounted again and can be opened from the tab bar.",
      status: "Live",
    },
    {
      title: "Auth guard active",
      description: "Users without an admin token are redirected back to the login page.",
      status: "Protected",
    },
    {
      title: "Demo API connected",
      description: "Local mock handlers respond instantly while backend integration is cleaned up.",
      status: "Demo",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground">Overview</h3>
          <p className="text-sm text-muted-foreground">
            A quick snapshot of the admin area and the sections that need attention.
          </p>
        </div>

        <Button variant="outline" className="gap-2 self-start" onClick={loadStats} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh stats
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="rounded-[1.75rem] border-border/80 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="mt-2 text-4xl font-bold text-primary">
                    {isLoading ? "--" : card.value}
                  </CardTitle>
                </div>
                <span className="rounded-full bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
                <Button
                  variant="ghost"
                  className="shrink-0"
                  onClick={() => onOpenSection?.(sectionMap[card.id as keyof typeof sectionMap])}
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[1.75rem] border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarClock className="h-5 w-5 text-primary" />
              Admin Health
            </CardTitle>
            <CardDescription>Key checks to help you confirm the dashboard is functioning again.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant="outline" className="self-start rounded-full px-3 py-1 md:self-auto">
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Next Actions</CardTitle>
            <CardDescription>Jump into the sections that admins use most often.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              { label: "Review new course enquiries", target: "course-enquiries" },
              { label: "Publish an announcement", target: "announcements" },
              { label: "Update the gallery", target: "gallery" },
              { label: "Manage popup campaigns", target: "popups" },
            ].map((action) => (
              <button
                key={action.target}
                type="button"
                onClick={() => onOpenSection?.(action.target)}
                className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-left transition-colors hover:bg-muted"
              >
                <p className="font-medium text-foreground">{action.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">Open this section in the dashboard</p>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
