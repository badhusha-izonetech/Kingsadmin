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
import { BookOpen, Edit, Plus, Trash2 } from "lucide-react";

const categories = ["Mastery", "Fellowship", "Exam Prep", "Short Course"];

const emptyForm = {
  title: "",
  category: "Mastery",
  duration: "",
  price: "",
  status: "draft",
  description: "",
};

const CourseManagement = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { toast } = useToast();

  const loadCourses = async () => {
    try {
      const data = await api.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load courses:", error);
      toast({ title: "Failed to load courses", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const openDialog = (course?: any) => {
    setEditingId(course?.id ?? null);
    setFormData({
      title: course?.title ?? "",
      category: course?.category ?? "Mastery",
      duration: course?.duration ?? "",
      price: course?.price ?? "",
      status: course?.status ?? "draft",
      description: course?.description ?? "",
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({ title: "Course title is required", variant: "destructive" });
      return;
    }

    try {
      if (editingId) {
        await api.updateCourse(String(editingId), formData);
        toast({ title: "Course updated successfully" });
      } else {
        await api.createCourse(formData);
        toast({ title: "Course created successfully" });
      }

      setShowDialog(false);
      setFormData(emptyForm);
      setEditingId(null);
      loadCourses();
    } catch (error) {
      console.error("Course save failed:", error);
      toast({ title: "Unable to save course", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this course?")) {
      return;
    }

    try {
      await api.deleteCourse(String(id));
      toast({ title: "Course deleted" });
      loadCourses();
    } catch (error) {
      console.error("Course delete failed:", error);
      toast({ title: "Unable to delete course", variant: "destructive" });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" />
            Course Management
          </h3>
          <p className="text-sm text-muted-foreground">Create and update the programs shown to prospective students.</p>
        </div>

        <Button onClick={() => openDialog()} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden sm:table-cell">Duration</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{course.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{course.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{course.category || "General"}</TableCell>
                  <TableCell className="hidden sm:table-cell">{course.duration || "N/A"}</TableCell>
                  <TableCell className="hidden md:table-cell">{course.price || "N/A"}</TableCell>
                  <TableCell className="capitalize">{course.status || "draft"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(course)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No courses yet. Use "Add Course" to create the first item.
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
            <DialogTitle>{editingId ? "Edit Course" : "Create Course"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course title</Label>
                <Input
                  id="course-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Advanced Implantology"
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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

              <div className="space-y-2">
                <Label htmlFor="course-duration">Duration</Label>
                <Input
                  id="course-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="6 weeks"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-price">Price</Label>
                <Input
                  id="course-price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="INR 25,000"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add a short description for the course..."
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Save Changes" : "Create Course"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;
