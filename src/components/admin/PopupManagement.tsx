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
import { Edit, Plus, Sparkles, Trash2 } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  status: "inactive",
  deadline: "",
};

const PopupManagement = () => {
  const [popups, setPopups] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const { toast } = useToast();

  const loadPopups = async () => {
    try {
      const data = await api.getPopups();
      setPopups(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load popups:", error);
      toast({ title: "Failed to load popups", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadPopups();
  }, []);

  const openDialog = (popup?: any) => {
    setEditingId(popup?.id ?? null);
    const nextForm = {
      title: popup?.title ?? "",
      description: popup?.description ?? "",
      image: popup?.image ?? "",
      status: popup?.status ?? "inactive",
      deadline: popup?.deadline ?? "",
    };
    setFormData(nextForm);
    setImagePreview(nextForm.image);
    setShowDialog(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((current) => ({ ...current, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({ title: "Popup title is required", variant: "destructive" });
      return;
    }

    try {
      if (editingId) {
        await api.updatePopup(String(editingId), formData);
        toast({ title: "Popup updated successfully" });
      } else {
        await api.createPopup(formData);
        toast({ title: "Popup created successfully" });
      }

      setShowDialog(false);
      setEditingId(null);
      setFormData(emptyForm);
      setImagePreview("");
      loadPopups();
    } catch (error) {
      console.error("Popup save failed:", error);
      toast({ title: "Unable to save popup", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this popup?")) {
      return;
    }

    try {
      await api.deletePopup(String(id));
      toast({ title: "Popup deleted" });
      loadPopups();
    } catch (error) {
      console.error("Popup delete failed:", error);
      toast({ title: "Unable to delete popup", variant: "destructive" });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <Sparkles className="h-6 w-6 text-primary" />
            Popup Management
          </h3>
          <p className="text-sm text-muted-foreground">Control time-sensitive popups shown to visitors on the website.</p>
        </div>

        <Button onClick={() => openDialog()} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Create Popup
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popups.map((popup) => {
                const isExpired = !!popup.deadline && popup.deadline < today;

                return (
                  <TableRow key={popup.id}>
                    <TableCell className="font-medium">
                      <div>{popup.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground md:hidden line-clamp-2">
                        {popup.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-md md:table-cell">{popup.description}</TableCell>
                    <TableCell className={isExpired ? "font-medium text-destructive" : ""}>
                      {popup.deadline || "No deadline"}
                    </TableCell>
                    <TableCell className="capitalize">{popup.status || "inactive"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openDialog(popup)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(popup.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {popups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No popups created yet.
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
            <DialogTitle>{editingId ? "Edit Popup" : "Create Popup"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="popup-title">Title</Label>
                <Input
                  id="popup-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Admissions open now"
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="popup-deadline">Deadline</Label>
                <Input
                  id="popup-deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-description">Description</Label>
              <Textarea
                id="popup-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add the message shown to users..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-image">Popup image</Label>
              <Input id="popup-image" type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-3">
                  <img src={imagePreview} alt="Popup preview" className="h-40 w-full rounded-xl object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Save Changes" : "Create Popup"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupManagement;
