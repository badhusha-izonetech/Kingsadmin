import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Eye, Mail, Phone, User, BookOpen, Calendar, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactDetailsManagement = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await api.getContacts();
      setContacts(data || []);
    } catch (error) {
      console.error('Failed to load contacts:', error);
      toast({ title: "Failed to load contacts", variant: "destructive" });
      setContacts([]);
    }
  };

  const openDialog = (contact: any) => {
    setSelectedContact(contact);
    setShowDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      await api.deleteContact(id.toString());
      toast({ title: "Contact deleted successfully" });
      loadContacts();
    } catch (error) {
      console.error('Delete contact error:', error);
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Contact Details
          </h2>
          <p className="text-sm text-muted-foreground">
            View contact form submissions from users
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {contacts.length} Total Contacts
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Contact</TableHead>
                <TableHead>Course Interest</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div>{contact.name}</div>
                        <div className="sm:hidden text-xs text-muted-foreground mt-1">
                          {contact.email} • {contact.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="truncate max-w-[120px]">{contact.course}</div>
                        {contact.subcourse && (
                          <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {contact.subcourse}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {formatDate(contact.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => openDialog(contact)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(contact.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {contacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    <div className="space-y-2">
                      <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50" />
                      <p>No contact submissions found.</p>
                      <p className="text-xs">Contact form submissions will appear here.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card border-border w-[95vw] lg:w-[70vw] xl:w-[60vw] max-w-none mx-auto h-[85vh] overflow-hidden" aria-describedby="contact-details-description">
          <DialogHeader className="border-b pb-4">
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          <div id="contact-details-description" className="sr-only">
            View detailed information about the selected contact submission
          </div>
          
          <div className="flex-1 overflow-hidden">
            {selectedContact && (
              <div className="h-full flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 lg:pr-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{selectedContact.name}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Course Interest</label>
                      <div className="flex items-center gap-2 mt-1">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{selectedContact.course}</div>
                          {selectedContact.subcourse && (
                            <div className="text-sm text-muted-foreground">{selectedContact.subcourse}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="break-all">{selectedContact.email}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedContact.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 lg:pr-4 lg:border-l lg:pl-6">
                  {selectedContact.message && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Message</label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">
                        <span className="text-sm">{selectedContact.message}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Submitted Date</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(selectedContact.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons - Full Width at Bottom */}
                <div className="lg:absolute lg:bottom-4 lg:left-6 lg:right-6 pt-4 border-t bg-card">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(`mailto:${selectedContact.email}`)}
                      className="gap-2 w-full"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedContact.phone}`)}
                      className="gap-2 w-full"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactDetailsManagement;