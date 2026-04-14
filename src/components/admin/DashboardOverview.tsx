import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Image as ImageIcon,
  Megaphone,
  MessageSquare,
  RefreshCw,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
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

  const quickActions = [
    { label: "Review course enquiries", target: "course-enquiries" },
    { label: "Publish announcement", target: "announcements" },
    { label: "Update gallery", target: "gallery" },
    { label: "Manage popup", target: "popups" },
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

      <div className="grid gap-6">
        <Card className="rounded-[1.75rem] border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <button
                key={action.target}
                type="button"
                onClick={() => onOpenSection?.(action.target)}
                className="rounded-md border border-border/70 bg-background px-4 py-4 text-left font-medium text-foreground transition-colors hover:bg-muted"
              >
                {action.label}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
