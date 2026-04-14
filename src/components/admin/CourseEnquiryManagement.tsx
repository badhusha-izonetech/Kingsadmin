import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Eye, GraduationCap, Mail, Phone, RefreshCw, Search, Trash2, User } from "lucide-react";

const CourseEnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const loadEnquiries = async () => {
    setIsRefreshing(true);
    try {
      const data = await api.getEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load course enquiries:", error);
      toast({ title: "Failed to load enquiries", variant: "destructive" });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
    const interval = setInterval(loadEnquiries, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return enquiries;
    }

    return enquiries.filter((enquiry) =>
      [enquiry.student_name, enquiry.email, enquiry.phone, enquiry.course_name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [enquiries, search]);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this enquiry?")) {
      return;
    }

    try {
      await api.deleteEnquiry(String(id));
      toast({ title: "Enquiry deleted" });
      loadEnquiries();
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const formatDate = (value?: string) => {
    if (!value) {
      return "N/A";
    }

    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <GraduationCap className="h-6 w-6 text-primary" />
            Course Enquiries
          </h3>
          <p className="text-sm text-muted-foreground">
            New enquiries refresh automatically every 5 seconds so the dashboard stays current.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-[260px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, course, email..."
              className="pl-10"
            />
          </div>

          <Button variant="outline" className="gap-2" onClick={loadEnquiries} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        Showing {filteredEnquiries.length} enquiry{filteredEnquiries.length === 1 ? "" : "ies"}.
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Received</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">
                    <div>{enquiry.student_name || "Unknown Student"}</div>
                    <div className="mt-1 text-xs text-muted-foreground md:hidden">{enquiry.email || "No email"}</div>
                  </TableCell>
                  <TableCell>{enquiry.course_name || "General enquiry"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{enquiry.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{enquiry.phone || "N/A"}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{formatDate(enquiry.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedEnquiry(enquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(enquiry.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEnquiries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No enquiries matched your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selectedEnquiry} onOpenChange={(open) => !open && setSelectedEnquiry(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Student</p>
                  <p className="mt-2 flex items-center gap-2 font-medium text-foreground">
                    <User className="h-4 w-4 text-primary" />
                    {selectedEnquiry.student_name || "Unknown Student"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Program</p>
                  <p className="mt-2 flex items-center gap-2 font-medium text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {selectedEnquiry.course_name || "General enquiry"}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                  <p className="mt-2 break-all text-sm text-foreground">{selectedEnquiry.email || "N/A"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
                  <p className="mt-2 text-sm text-foreground">{selectedEnquiry.phone || "N/A"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground">
                  {selectedEnquiry.message || "No message was provided with this enquiry."}
                </p>
              </div>

              <div className="text-sm text-muted-foreground">Received on {formatDate(selectedEnquiry.created_at)}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseEnquiryManagement;
