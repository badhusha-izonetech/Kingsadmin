import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Edit, Plus, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await api.getAnnouncements();
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Failed to load announcements:', error);
      toast({ title: "Failed to load announcements", variant: "destructive" });
    }
  };

  const openDialog = (announcement?: any) => {
    setEditingId(announcement?.id || null);
    const initialData = {
      title: announcement?.title || "",
      description: announcement?.description || "",
      image: announcement?.image || "",
    };
    setFormData(initialData);
    setImagePreview(announcement?.image || "");
    setImageFile(null);
    setShowDialog(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImagePreview(imageData);
        setFormData({ ...formData, image: imageData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    
    if (!formData.description.trim()) {
      toast({ title: "Description is required", variant: "destructive" });
      return;
    }
    
    try {
      const submissionData = {
        ...formData,
        date: new Date().toISOString().split('T')[0] // Auto-generate current date
      };
      
      if (editingId) {
        await api.updateAnnouncement(editingId.toString(), submissionData);
        toast({ title: "✅ Announcement updated successfully!" });
      } else {
        await api.createAnnouncement(submissionData);
        toast({ 
          title: "✅ Announcement created successfully!",
          description: "Your announcement has been added to the system.",
          duration: 5000
        });
      }
      
      setShowDialog(false);
      setFormData({ title: "", description: "", image: "" });
      setImagePreview("");
      setImageFile(null);
      loadAnnouncements();
    } catch (error) {
      console.error('Announcement operation error:', error);
      toast({ 
        title: "❌ Operation failed", 
        description: "Please check all fields and try again.", 
        variant: "destructive" 
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await api.deleteAnnouncement(id.toString());
      toast({ title: "Announcement deleted successfully" });
      loadAnnouncements();
    } catch (error) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
            <Megaphone className="w-6 h-6 text-primary" />
            Announcements
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage important announcements and updates
          </p>
        </div>
        <Button onClick={() => openDialog()} className="gap-2 bg-primary transition-all duration-200 hover:scale-105 hover:shadow-md w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Create Announcement
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[300px] hidden md:table-cell">Description</TableHead>
                <TableHead className="min-w-[120px] hidden sm:table-cell">Date</TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">Created</TableHead>
                <TableHead className="min-w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement, index) => (
                <TableRow key={announcement.id} className="hover:bg-muted/50 transition-colors duration-150" style={{ animationDelay: `${index * 50}ms` }}>
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {announcement.image && (
                          <img 
                            src={announcement.image} 
                            alt={announcement.title}
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <span className="line-clamp-2">{announcement.title}</span>
                      </div>
                      <div className="md:hidden text-xs text-muted-foreground line-clamp-2">
                        {announcement.description}
                      </div>
                      <div className="lg:hidden text-xs text-muted-foreground">
                        {formatDate(announcement.created_at)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md hidden md:table-cell">
                    <div className="line-clamp-3 text-sm text-muted-foreground">
                      {announcement.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                    {announcement.date || 'N/A'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                    {formatDate(announcement.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 sm:gap-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(announcement)} className="transition-all duration-200 hover:scale-105">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(announcement.id)} className="transition-all duration-200 hover:scale-105">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    <div className="space-y-2">
                      <Megaphone className="w-12 h-12 mx-auto text-muted-foreground/50" />
                      <p>No announcements found.</p>
                      <p className="text-xs">Create your first announcement to get started!</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card border-border w-[95vw] max-w-2xl mx-auto max-h-[90vh] overflow-hidden" aria-describedby="announcement-form-description">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-primary" />
              {editingId ? "Edit" : "Create"} Announcement
            </DialogTitle>
          </DialogHeader>
          <div id="announcement-form-description" className="sr-only">
            {editingId ? "Edit an existing announcement" : "Create a new announcement for users"}
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] pr-2 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter announcement title"
                  required
                  className="h-10"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  placeholder="Enter announcement description"
                  required
                  className="resize-none"
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image (Optional)</Label>
                <div className="space-y-3">
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer h-10"
                  />
                  <div className="text-sm text-muted-foreground text-center">Or</div>
                  <Input
                    id="imageUrl"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) => {
                      const imageUrl = e.target.value;
                      setFormData({ ...formData, image: imageUrl });
                      setImagePreview(imageUrl);
                      setImageFile(null);
                    }}
                    className="h-10"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4 pb-6 space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 transition-colors h-12"
                >
                  {editingId ? "Update" : "Create"} Announcement
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowDialog(false)}
                  className="w-full h-10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementManagement;