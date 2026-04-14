import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowLeft, Award, GraduationCap, MapPin, Phone, Mail, Send, User, MessageSquare, Star, Calendar, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FacultyMember {
  id: number;
  slug: string;
  name: string;
  specialization: string;
  image: string;
  bio: string;
  experience: string;
  education: string;
  achievements: string[];
  portfolio: { title: string; image: string; description: string }[];
  location: string;
  email: string;
  phone: string;
}

const facultyMembers: FacultyMember[] = [
  { id: 1, slug: "dr-rajesh-kumar", name: "Dr. Rajesh Kumar", specialization: "Director & Chief Implantologist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=800&fit=crop", bio: "Dr. Rajesh Kumar is a renowned implantologist with over 20 years of experience.", experience: "20+ Years", education: "MDS in Oral Surgery, Fellowship in Implantology", achievements: ["Placed over 10,000 dental implants", "Trained 500+ dentists", "International speaker at 50+ conferences", "Published 30+ research papers", "Awarded Best Implantologist 2024"], portfolio: [{ title: "Full Arch Implant Restoration", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Complete dental implant rehabilitation" }, { title: "Immediate Loading Implants", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop", description: "Same-day implant placement and restoration" }, { title: "Complex Bone Grafting", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop", description: "Advanced bone augmentation procedures" }], location: "Kochi, Kerala", email: "dr.rajesh@kingsdentalacademy.com", phone: "+91 98765 43210" },
  { id: 2, slug: "dr-priya-sharma", name: "Dr. Priya Sharma", specialization: "Head of Digital Dentistry", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=800&fit=crop", bio: "Dr. Priya Sharma is a pioneer in digital dentistry.", experience: "15+ Years", education: "MDS in Prosthodontics", achievements: ["Introduced digital workflow in 50+ clinics", "Certified trainer for CAD/CAM systems", "Conducted 100+ digital dentistry workshops", "Keynote speaker at IDEM Singapore", "Consultant for dental tech startups"], portfolio: [{ title: "Digital Smile Design", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "CAD/CAM smile makeovers" }, { title: "Intraoral Scanning", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop", description: "Digital impression workflows" }, { title: "3D Printed Prosthetics", image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop", description: "Advanced digital fabrication" }], location: "Kochi, Kerala", email: "dr.priya@kingsdentalacademy.com", phone: "+91 98765 43211" },
  { id: 3, slug: "dr-anil-menon", name: "Dr. Anil Menon", specialization: "Senior Prosthodontist", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=800&fit=crop", bio: "Dr. Anil Menon specializes in complex prosthodontic cases.", experience: "18+ Years", education: "MDS in Prosthodontics", achievements: ["Completed 500+ full mouth rehabilitations", "Expert in All-on-4 procedures", "Trained 300+ prosthodontists", "Published 25+ international papers", "Former President of IDA Kerala"], portfolio: [{ title: "All-on-4 Treatment", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Full arch fixed prosthetics" }, { title: "Veneers & Crowns", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop", description: "Aesthetic ceramic restorations" }, { title: "Full Mouth Rehabilitation", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop", description: "Complete oral reconstruction" }], location: "Kochi, Kerala", email: "dr.anil@kingsdentalacademy.com", phone: "+91 98765 43212" },
  { id: 4, slug: "dr-kavita-nair", name: "Dr. Kavita Nair", specialization: "Oral Surgery Specialist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&h=800&fit=crop", bio: "Dr. Kavita Nair is an expert oral surgeon.", experience: "12+ Years", education: "MDS in Oral and Maxillofacial Surgery", achievements: ["Performed 5000+ surgical procedures", "Expert in bone grafting techniques", "Conducted 200+ live surgeries", "Fellowship in jaw reconstruction", "Panel expert at national dental conferences"], portfolio: [{ title: "Wisdom Tooth Extraction", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Complex surgical extractions" }, { title: "Bone Grafting Procedures", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop", description: "Ridge augmentation techniques" }, { title: "Sinus Lift Surgery", image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop", description: "Maxillary sinus augmentation" }], location: "Kochi, Kerala", email: "dr.kavita@kingsdentalacademy.com", phone: "+91 98765 43213" },
  { id: 5, slug: "dr-suresh-reddy", name: "Dr. Suresh Reddy", specialization: "Orthodontics Expert", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&h=800&fit=crop", bio: "Dr. Suresh Reddy is a leading orthodontist specializing in invisible aligners and braces.", experience: "16+ Years", education: "MDS in Orthodontics, Fellowship in Lingual Orthodontics", achievements: ["Treated 3000+ orthodontic cases", "Certified invisalign provider", "Expert in self-ligating braces", "Conducted 80+ orthodontic workshops", "International trainer for aligner therapy"], portfolio: [{ title: "Invisible Aligners", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Clear aligner treatment for adults" }, { title: "Traditional Braces", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop", description: "Comprehensive teeth straightening" }, { title: "Jaw Alignment", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop", description: "Corrective jaw surgery" }], location: "Kochi, Kerala", email: "dr.suresh@kingsdentalacademy.com", phone: "+91 98765 43214" },
  { id: 6, slug: "dr-meera-patel", name: "Dr. Meera Patel", specialization: "Periodontics Specialist", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=800&h=800&fit=crop", bio: "Dr. Meera Patel is an expert in treating gum diseases and dental implants.", experience: "14+ Years", education: "MDS in Periodontics", achievements: ["Treated 2000+ periodontal cases", "Expert in laser gum therapy", "Published 20+ papers on gum health", "Conducted 150+ periodontal surgeries", "Awarded Periodontist of the Year 2023"], portfolio: [{ title: "Gum Recession Treatment", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Pinhole surgical technique" }, { title: "Laser Gum Surgery", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop", description: "Minimally invasive gum treatment" }, { title: "Dental Implants", image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop", description: "Implant placement and restoration" }], location: "Kochi, Kerala", email: "dr.meera@kingsdentalacademy.com", phone: "+91 98765 43215" },
  { id: 7, slug: "dr-arun-johnson", name: "Dr. Arun Johnson", specialization: "Endodontist", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=800&fit=crop", bio: "Dr. Arun Johnson is a specialist in root canal treatments and dental pain management.", experience: "11+ Years", education: "MDS in Endodontics", achievements: ["Performed 8000+ root canal treatments", "Expert in microscopic endodontics", "Trained 200+ dentists in RCT techniques", "Published 15+ research papers", "Pioneer in single-visit RCT"], portfolio: [{ title: "Root Canal Treatment", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Painless root canal therapy" }, { title: "Microscopic Dentistry", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop", description: "Precision endodontic procedures" }, { title: "Dental Trauma", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop", description: "Emergency dental care" }], location: "Kochi, Kerala", email: "dr.arun@kingsdentalacademy.com", phone: "+91 98765 43216" },
  { id: 8, slug: "dr-lisa-thomas", name: "Dr. Lisa Thomas", specialization: "Pediatric Dentist", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&h=800&fit=crop", bio: "Dr. Lisa Thomas specializes in dental care for children and adolescents.", experience: "10+ Years", education: "MDS in Pediatric Dentistry", achievements: ["Treated 5000+ child patients", "Expert in behavior management", "Certified in dental sedation for kids", "Conducted 100+ school dental programs", "Author of children's dental health book"], portfolio: [{ title: "Preventive Care", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop", description: "Fluoride treatments and sealants" }, { title: "Dental Fillings", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop", description: "Tooth-colored restorative treatments" }, { title: "Orthodontic Assessment", image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop", description: "Early orthodontic intervention" }], location: "Kochi, Kerala", email: "dr.lisa@kingsdentalacademy.com", phone: "+91 98765 43217" }
];

const FacultyCard = ({ member, index }: { member: FacultyMember; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      to={`/faculty/${member.slug}`}
      className={`group block cursor-pointer transform transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gradient-to-br from-card to-card/80 rounded-3xl overflow-hidden border border-border/50 shadow-xl hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-4">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-90" : "opacity-60"
              }`}
          />

          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
          >
            {/* <div className="bg-white/25 backdrop-blur-xl border-2 border-white/40 px-8 py-4 rounded-2xl">
              <span className="text-white font-bold text-lg">View Full Profile</span>
            </div> */}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
            <h3
              className={`font-display text-2xl font-bold text-white mb-1 drop-shadow-2xl transform transition-transform duration-500 ${isHovered ? "-translate-y-2" : ""
                }`}
            >
              {member.name}
            </h3>
            <p className="text-white/95 text-base font-medium drop-shadow-lg">{member.specialization}</p>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary animate-bounce" />
            <span className="text-sm font-medium">{member.location}</span>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Mail className="w-5 h-5" />
            <span className="text-sm">Contact</span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-tr-full" />

        <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
      </div>
    </Link>
  );
};

const FacultyContactDialog = ({ member, open, onClose }: { member: FacultyMember | null; open: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Contact {member.name}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter your name" className="pl-10" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Enter your email" className="pl-10" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="tel" placeholder="Enter your phone number" className="pl-10" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea placeholder={`Hi ${member.name.split(' ')[1]}, I'd like to know more about...`} className="pl-10 min-h-[100px]" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? <span className="flex items-center gap-2"><span className="animate-spin">⏳</span> Sending...</span> : <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const FacultyProfile = ({ member }: { member: FacultyMember }) => {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<{ title: string; image: string; description: string } | null>(null);

  // Scroll to top when portfolio is selected
  useEffect(() => {
    if (selectedPortfolio) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPortfolio]);

  // If portfolio is selected, show detail view
  if (selectedPortfolio) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="da-container py-16">
            <button
              onClick={() => setSelectedPortfolio(null)}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-body"
            >
              <ArrowLeft className="w-5 h-5" />Back to Profile
            </button>

            {/* Portfolio Detail Card */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                {/* Large Image Section */}
                <div className="relative aspect-[21/9] overflow-hidden">
                  <img
                    src={selectedPortfolio.image}
                    alt={selectedPortfolio.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-3">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <h1 className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                        {selectedPortfolio.title}
                      </h1>
                    </div>
                    <p className="text-white/90 text-lg drop-shadow-lg">By {member.name}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-primary" />
                      About This Treatment
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {selectedPortfolio.description}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                      This advanced procedure represents the pinnacle of modern dental care, combining cutting-edge technology
                      with years of clinical expertise. Our approach ensures optimal results with minimal discomfort and
                      maximum patient satisfaction.
                    </p>
                  </div>

                  {/* Treatment Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-primary/5 rounded-xl p-6 border border-border/50">
                      <div className="mb-3">
                        <Clock className="w-6 h-6 text-primary" />
                        <h3 className="font-display text-xl font-bold text-foreground">Duration</h3>
                      </div>
                      <p className="text-muted-foreground">Treatment time varies based on case complexity and individual requirements</p>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-6 border border-border/50">
                      <div className="mb-3">
                        <Award className="w-6 h-6 text-primary" />
                        <h3 className="font-display text-xl font-bold text-foreground">Expertise</h3>
                      </div>
                      <p className="text-muted-foreground">Advanced specialist treatment performed by certified professionals</p>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-6 border border-border/50">
                      <div className="mb-3">
                        <GraduationCap className="w-6 h-6 text-primary" />
                        <h3 className="font-display text-xl font-bold text-foreground">Success Rate</h3>
                      </div>
                      <p className="text-muted-foreground">High success rate with proven long-term results and patient satisfaction</p>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">Key Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4">
                        <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Advanced Technology</h4>
                          <p className="text-sm text-muted-foreground">State-of-the-art equipment and techniques</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4">
                        <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Minimal Discomfort</h4>
                          <p className="text-sm text-muted-foreground">Patient comfort is our top priority</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4">
                        <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Long-lasting Results</h4>
                          <p className="text-sm text-muted-foreground">Durable outcomes with proper care</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4">
                        <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Expert Care</h4>
                          <p className="text-sm text-muted-foreground">Performed by experienced specialists</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <Button
                    onClick={() => setContactOpen(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Inquire About This Treatment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <FacultyContactDialog member={member} open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="da-container py-16">
            <button onClick={() => navigate('/faculty')} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-body">
              <ArrowLeft className="w-5 h-5" />Back to Faculty
            </button>

            {/* Single Card with Image and Details */}
            <div className="w-full">
              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                {/* Profile Section - Image Left, Details Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left Side - Image */}
                  <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-primary shadow-2xl">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-base font-semibold shadow-lg whitespace-nowrap">
                        {member.experience} Experience
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Details */}
                  <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <div className="text-center">
                      <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">{member.name}</h1>
                      <p className="text-primary text-xl font-medium">{member.specialization}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info Below - Full Width */}
                <div className="p-8 pt-4 border-t border-border">
                  {/* Contact Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-primary/5 rounded-xl p-3 text-center">
                      <Mail className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground truncate">{member.email}</p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-3 text-center">
                      <Phone className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{member.phone}</p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-3 text-center">
                      <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{member.location}</p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-3 text-center">
                      <GraduationCap className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Education</p>
                      <p className="text-sm font-medium text-foreground">{member.education}</p>
                    </div>
                  </div>
                  {/* About Section */}
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                      <Award className="w-6 h-6 text-primary" />About
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">{member.bio}</p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">Key Achievements</h2>
                    <div className="flex flex-wrap gap-3">
                      {member.achievements.map((achievement, i) => (
                        <span key={i} className="bg-primary/10 text-foreground px-4 py-2 rounded-full text-base font-medium">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <Button onClick={() => setContactOpen(true)} className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl mb-8">
                    <Mail className="w-5 h-5 mr-2" />Contact {member.name.split(' ')[1]}
                  </Button>

                  {/* Portfolio Section Inside Same Card */}
                  <div className="border-t border-border pt-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2 text-center">Professional Portfolio</h2>
                    <p className="text-muted-foreground mb-10 text-center">Showcasing expertise and successful treatments</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {member.portfolio.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedPortfolio(item)}
                          className="group relative bg-gradient-to-br from-primary/5 to-transparent rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                            {/* View Details Button - Center Position */}
                            {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                              <div className="bg-white/25 backdrop-blur-xl border-2 border-white/40 px-6 py-3 rounded-xl">
                                <span className="text-white font-bold">View Details</span>
                              </div>
                            </div> */}

                            {/* Animated Corner Accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-bl-full" />
                          </div>

                          <div className="p-5">
                            <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm transform transition-all duration-300 group-hover:translate-x-1">
                              {item.description}
                            </p>
                          </div>

                          {/* Animated Border Glow */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <FacultyContactDialog member={member} open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

const FacultyPage = () => {
  const { slug } = useParams();
  if (slug) { const m = facultyMembers.find(x => x.slug === slug); if (m) return <FacultyProfile member={m} />; }
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="da-container py-16">
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
            {/* <div className="flex flex-wrap gap-4 text-sm">
              <a href="/#programs" className="text-muted-foreground hover:text-primary font-body">Programs</a>
              <a href="/gallery" className="text-muted-foreground hover:text-primary font-body">Gallery</a>
              <a href="/#contact" className="text-muted-foreground hover:text-primary font-body">Contact</a>
            </div> */}
          </div>
          <div className="text-center mb-12">
            <div className="gold-line w-16 mx-auto mb-6" />
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Our Faculty</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Expert Team</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Learn from industry-leading professionals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {facultyMembers.map((member, index) => (
              <FacultyCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyPage;