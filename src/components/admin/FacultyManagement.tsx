import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, Trash2, Users } from "lucide-react";

const emptyForm = {
  name: "",
  specialization: "",
  experience: "",
  email: "",
  phone: "",
  image: "",
  bio: "",
};

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();

  const loadFaculty = async () => {
    try {
      const data = await api.getFaculty();
      setFaculty(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load faculty:", error);
      toast({ title: "Failed to load faculty", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const openDialog = (member?: any) => {
    setEditingId(member?.id ?? null);
    setFormData({
      name: member?.name ?? "",
      specialization: member?.specialization ?? "",
      experience: member?.experience ?? "",
      email: member?.email ?? "",
      phone: member?.phone ?? "",
      image: member?.image ?? "",
      bio: member?.bio ?? "",
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({ title: "Faculty name is required", variant: "destructive" });
      return;
    }

    try {
      if (editingId) {
        await api.updateFaculty(String(editingId), formData);
        toast({ title: "Faculty profile updated" });
      } else {
        await api.createFaculty(formData);
        toast({ title: "Faculty profile created" });
      }

      setShowDialog(false);
      setEditingId(null);
      setFormData(emptyForm);
      loadFaculty();
    } catch (error) {
      console.error("Faculty save failed:", error);
      toast({ title: "Unable to save faculty profile", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this faculty profile?")) {
      return;
    }

    try {
      await api.deleteFaculty(String(id));
      toast({ title: "Faculty profile deleted" });
      loadFaculty();
    } catch (error) {
      console.error("Faculty delete failed:", error);
      toast({ title: "Unable to delete faculty profile", variant: "destructive" });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <Users className="h-6 w-6 text-primary" />
            Faculty Management
          </h3>
          <p className="text-sm text-muted-foreground">Maintain trainer profiles, specialties, and contact information.</p>
        </div>

        <Button onClick={() => openDialog()} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead className="hidden md:table-cell">Experience</TableHead>
                <TableHead className="hidden lg:table-cell">Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div>{member.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground md:hidden">{member.email || "No email"}</div>
                  </TableCell>
                  <TableCell>{member.specialization || "General Dentistry"}</TableCell>
                  <TableCell className="hidden md:table-cell">{member.experience || "N/A"}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="space-y-1 text-sm">
                      <div>{member.email || "N/A"}</div>
                      <div className="text-muted-foreground">{member.phone || "N/A"}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {faculty.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No faculty profiles yet. Create the first one to populate this section.
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
            <DialogTitle>{editingId ? "Edit Faculty Member" : "Add Faculty Member"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="faculty-name">Name</Label>
                <Input
                  id="faculty-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Priya Sharma"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty-specialization">Specialization</Label>
                <Input
                  id="faculty-specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Digital Dentistry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty-experience">Experience</Label>
                <Input
                  id="faculty-experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="12 years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty-email">Email</Label>
                <Input
                  id="faculty-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="faculty@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty-phone">Phone</Label>
                <Input
                  id="faculty-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty-image">Profile image URL</Label>
                <Input
                  id="faculty-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty-bio">Bio</Label>
              <Textarea
                id="faculty-bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Short profile summary..."
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Save Changes" : "Create Profile"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyManagement;
