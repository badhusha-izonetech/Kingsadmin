import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Edit, Image as ImageIcon, Play, Plus, Trash2, Video } from "lucide-react";

const categories = ["Campus", "Events", "Training", "Workshop", "Facilities", "Students", "Graduation"];

const emptyForm = {
  title: "",
  media_type: "image",
  file_url: "",
  category: "Campus",
};

const GalleryManagement = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [filePreview, setFilePreview] = useState("");
  const { toast } = useToast();

  const loadGallery = async () => {
    try {
      const data = await api.getGallery();
      setGallery(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load gallery:", error);
      toast({ title: "Failed to load gallery", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openDialog = (item?: any) => {
    setEditingId(item?.id ?? null);
    const nextForm = {
      title: item?.title ?? "",
      media_type: item?.media_type ?? "image",
      file_url: item?.file_url ?? "",
      category: item?.category ?? "Campus",
    };
    setFormData(nextForm);
    setFilePreview(nextForm.file_url);
    setShowDialog(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setFilePreview(result);
      setFormData((current) => ({ ...current, file_url: result }));
      toast({ title: "File loaded", description: `${file.name} is ready to save.` });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    if (!formData.file_url) {
      toast({ title: "Please choose a media file", variant: "destructive" });
      return;
    }

    try {
      if (editingId) {
        await api.updateGalleryItem(String(editingId), formData);
        toast({ title: "Gallery item updated" });
      } else {
        await api.createGalleryItem(formData);
        toast({ title: "Gallery item created" });
      }

      setShowDialog(false);
      setEditingId(null);
      setFormData(emptyForm);
      setFilePreview("");
      loadGallery();
    } catch (error) {
      console.error("Gallery save failed:", error);
      toast({ title: "Unable to save gallery item", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this gallery item?")) {
      return;
    }

    try {
      await api.deleteGalleryItem(String(id));
      toast({ title: "Gallery item deleted" });
      loadGallery();
    } catch (error) {
      console.error("Gallery delete failed:", error);
      toast({ title: "Unable to delete gallery item", variant: "destructive" });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <ImageIcon className="h-6 w-6 text-primary" />
            Gallery Management
          </h3>
          <p className="text-sm text-muted-foreground">Upload images or videos and place them into the right gallery category.</p>
        </div>

        <Button onClick={() => openDialog()} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Media
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gallery.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-muted">
                      {item.media_type === "video" ? (
                        <Play className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <img src={item.file_url} alt={item.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{item.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground sm:hidden">{item.category}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell capitalize">{item.media_type || "image"}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.category || "Campus"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {gallery.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No gallery items yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="gallery-title">Title</Label>
              <Input
                id="gallery-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Clinical workshop highlights"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Media type</Label>
                <Select value={formData.media_type} onValueChange={(value) => setFormData({ ...formData, media_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gallery-file">Upload file</Label>
              <Input id="gallery-file" type="file" accept="image/*,video/*" onChange={handleFileSelect} />
            </div>

            {filePreview && (
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-3">
                {formData.media_type === "video" ? (
                  <div className="flex h-40 items-center justify-center rounded-xl bg-black/80 text-white">
                    <Video className="mr-2 h-5 w-5" />
                    Video ready to save
                  </div>
                ) : (
                  <img src={filePreview} alt="Gallery preview" className="h-40 w-full rounded-xl object-cover" />
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Save Changes" : "Create Item"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagement;
