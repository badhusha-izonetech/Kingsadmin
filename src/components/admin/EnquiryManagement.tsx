import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnquiryManagementProps {
  onNewEnquiry?: () => void;
}

const EnquiryManagement = ({ onNewEnquiry }: EnquiryManagementProps) => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [uniqueEnquiries, setUniqueEnquiries] = useState<any[]>([]);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [emailMessage, setEmailMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadEnquiries();
    
    // Auto-refresh enquiries every 5 seconds to show new submissions immediately
    const interval = setInterval(loadEnquiries, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadEnquiries = async () => {
    try {
      const data = await api.getEnquiries();
      console.log('Loaded enquiries:', data.length); // Debug log
      setEnquiries(data);
      
      // Group by email to find duplicates
      const emailMap = new Map();
      data.forEach((enquiry: any) => {
        if (!emailMap.has(enquiry.email)) {
          emailMap.set(enquiry.email, []);
        }
        emailMap.get(enquiry.email).push(enquiry);
      });
      
      // Mark duplicates and get unique entries (latest per email)
      const unique = Array.from(emailMap.values()).map((group: any[]) => {
        const latest = group[group.length - 1];
        return {
          ...latest,
          isDuplicate: group.length > 1,
          duplicateCount: group.length
        };
      });
      
      setUniqueEnquiries(unique);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
      toast({ title: "Failed to load enquiries", variant: "destructive" });
    }
  };

  const handleSendEmail = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setEmailMessage(`Dear ${enquiry.student_name},\n\nThank you for your interest in ${enquiry.course_name}.\n\nWe will contact you soon with more details.\n\nBest regards,\nDental Academy Team`);
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = async () => {
    try {
      toast({ 
        title: "Email Sent Successfully", 
        description: `Email sent to ${selectedEnquiry.email}` 
      });
      setShowEmailDialog(false);
      setEmailMessage("");
    } catch (error) {
      toast({ title: "Failed to send email", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      await api.deleteEnquiry(id.toString());
      toast({ title: "Enquiry deleted" });
      loadEnquiries();
    } catch (error) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold">Student Enquiries</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Total: {uniqueEnquiries.length} unique students | {enquiries.length} total enquiries
            <span className="ml-2 text-green-600 font-medium">• Auto-refreshing every 5s</span>
          </p>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="inline-block w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 border-2 border-yellow-700 rounded animate-pulse"></span>
          <span className="text-yellow-700 font-semibold">Repeated enquiries</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Student Name</TableHead>
                <TableHead className="min-w-[150px] hidden sm:table-cell">Email</TableHead>
                <TableHead className="min-w-[120px] hidden md:table-cell">Phone</TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">College</TableHead>
                <TableHead className="min-w-[120px]">Course</TableHead>
                <TableHead className="min-w-[100px] hidden xl:table-cell">Date</TableHead>
                <TableHead className="min-w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uniqueEnquiries.map((e, index) => (
                <TableRow 
                  key={e.id}
                  className={`hover:bg-muted/50 transition-all duration-150 ${e.isDuplicate ? "border-l-4 border-l-yellow-600" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">
                    <div>
                      <div>{e.student_name}</div>
                      <div className="text-xs text-muted-foreground sm:hidden">{e.email}</div>
                      {e.isDuplicate && (
                        <span className="ml-0 mt-1 inline-block text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded font-bold shadow-sm animate-pulse">
                          {e.duplicateCount}x enquiries
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{e.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{e.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{e.college}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{e.course_name}</div>
                      <div className="text-xs text-muted-foreground xl:hidden">
                        {formatDate(e.created_at)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden xl:table-cell">
                    {formatDate(e.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 sm:gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleSendEmail(e)}
                        title="Send Email"
                        className="transition-all duration-200 hover:scale-105"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(e.id)} className="transition-all duration-200 hover:scale-105">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="bg-card border-border mx-4 sm:mx-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Send Email to {selectedEnquiry?.student_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">To: {selectedEnquiry?.email}</Label>
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleEmailSubmit} className="flex-1 bg-primary">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button onClick={() => setShowEmailDialog(false)} variant="outline" className="flex-1 sm:flex-none">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnquiryManagement;
