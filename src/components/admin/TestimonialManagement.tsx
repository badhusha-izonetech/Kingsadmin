import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, Star, Trash2 } from "lucide-react";

const emptyForm = {
  name: "",
  designation: "",
  content: "",
  rating: "5",
  type: "photo",
  status: "active",
  profile_image: "",
  video_url: "",
};

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();

  const loadTestimonials = async () => {
    try {
      const data = await api.getTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
      toast({ title: "Failed to load testimonials", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openDialog = (testimonial?: any) => {
    setEditingId(testimonial?.id ?? null);
    setFormData({
      name: testimonial?.name ?? "",
      designation: testimonial?.designation ?? "",
      content: testimonial?.content ?? "",
      rating: String(testimonial?.rating ?? "5"),
      type: testimonial?.type ?? "photo",
      status: testimonial?.status ?? "active",
      profile_image: testimonial?.profile_image ?? "",
      video_url: testimonial?.video_url ?? "",
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.content.trim()) {
      toast({ title: "Name and testimonial text are required", variant: "destructive" });
      return;
    }

    const payload = {
      ...formData,
      rating: Number(formData.rating),
    };

    try {
      if (editingId) {
        await api.updateTestimonial(String(editingId), payload);
        toast({ title: "Testimonial updated" });
      } else {
        await api.createTestimonial(payload);
        toast({ title: "Testimonial created" });
      }

      setShowDialog(false);
      setEditingId(null);
      setFormData(emptyForm);
      loadTestimonials();
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      toast({ title: "Unable to save testimonial", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this testimonial?")) {
      return;
    }

    try {
      await api.deleteTestimonial(String(id));
      toast({ title: "Testimonial deleted" });
      loadTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      toast({ title: "Unable to delete testimonial", variant: "destructive" });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <Star className="h-6 w-6 text-primary" />
            Testimonial Management
          </h3>
          <p className="text-sm text-muted-foreground">Collect reviews, set visibility, and manage media-based testimonials.</p>
        </div>

        <Button onClick={() => openDialog()} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Designation</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">
                    <div>{testimonial.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{testimonial.content}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{testimonial.designation || "N/A"}</TableCell>
                  <TableCell>{testimonial.rating || 5}/5</TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{testimonial.type || "photo"}</TableCell>
                  <TableCell className="capitalize">{testimonial.status || "active"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(testimonial)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {testimonials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No testimonials yet. Add one to populate this section.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="testimonial-name">Name</Label>
                <Input
                  id="testimonial-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Ashwin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial-designation">Designation</Label>
                <Input
                  id="testimonial-designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Implantologist"
                />
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["5", "4", "3", "2", "1"].map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}/5
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial-image">Profile image URL</Label>
                <Input
                  id="testimonial-image"
                  value={formData.profile_image}
                  onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="testimonial-video">Video URL</Label>
                <Input
                  id="testimonial-video"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial-content">Review</Label>
              <Textarea
                id="testimonial-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share the student's or doctor's testimonial..."
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Save Changes" : "Create Testimonial"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialManagement;
