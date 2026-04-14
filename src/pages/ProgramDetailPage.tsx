import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Clock, GraduationCap, Target, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryPrograms, SubProgram } from "@/data/programsData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Detail data for specific courses (can be expanded)
const specificProgramsData = [
    {
        id: "fellowship-fixed-ortho",
        title: "Fellowship in Fixed Orthodontics",
        subtitle: "The Orthodontic Fellowship Program",
        description: "Comprehensive 6-month program designed to offer complete education in orthodontics. This course covers everything from basic diagnosis to advanced treatment mechanics using the latest techniques and materials.",
        duration: "6 months",
        focusAreas: ["Fixed Orthodontics", "Dental Implantology", "General Dentistry", "Clinical Endodontics"],
        longDescription: "Our Fellowship in Fixed Orthodontics is a premier clinical training program for dental professionals seeking to master orthodontic treatments. Under the guidance of expert faculty, students gain hands-on experience in bracket placement, wire bending, and case finishing.",
        curriculum: [
            "Introduction to Cephalometrics & Diagnosis",
            "Biological Principles of Tooth Movement",
            "Straight Wire Technique (MBT & Roth)",
            "Management of Class I, II, & III Malocclusions",
            "Interceptive Orthodontics",
            "Finishing and Retention Protocols"
        ]
    },
    // Add more specific program details as needed
];

const ProgramDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    
    const [selectedSubProgram, setSelectedSubProgram] = useState<SubProgram | null>(null);
    const [showEnquiryFlow, setShowEnquiryFlow] = useState(false);
    const [formData, setFormData] = useState({
        studentName: "",
        email: "",
        phone: "",
        message: ""
    });

    // Check if it's a category overview
    const category = categoryPrograms.find(c => c.id === id);
    
    // If not a category, try to find a specific program
    const program = specificProgramsData.find(p => p.id === id);

    const handleOpenModal = (sub: SubProgram) => {
        setSelectedSubProgram(sub);
        setShowEnquiryFlow(false);
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.createEnquiry({
                ...formData,
                courseName: selectedSubProgram?.title || ""
            });
            toast({
                title: "Enquiry Submitted",
                description: "We will contact you shortly regarding " + selectedSubProgram?.title
            });
            setSelectedSubProgram(null);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit enquiry. Please try again.",
                variant: "destructive"
            });
        }
    };

    // Layout for Category Overview
    if (category) {
        return (
            <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
                <Header />
                <main className="flex-1 py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 text-[#EEA33B] hover:text-white transition-colors mb-8 mx-auto font-body uppercase tracking-wider text-xs"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Homepage
                            </button>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                                {category.title}
                            </h1>
                            <div className="gold-line w-24 h-1 bg-[#EEA33B] mx-auto mb-6" />
                            <p className="text-gray-400 font-body text-lg max-w-2xl mx-auto leading-relaxed">
                                {category.subtitle}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.courses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#1A1A1A] rounded-3xl p-10 border border-gray-800/50 hover:border-[#EEA33B]/30 transition-all duration-500 flex flex-col group h-full shadow-2xl relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col h-full text-left">
                                        <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-[#EEA33B] transition-colors duration-300 min-h-[64px] flex items-center">
                                            {course.title}
                                        </h3>
                                        {course.duration && (
                                            <p className="text-[#EEA33B] text-xs font-bold uppercase tracking-widest mb-3">Duration: {course.duration}</p>
                                        )}
                                        <p className="text-gray-400 font-body text-sm leading-relaxed mb-8 mb-auto line-clamp-3">
                                            {course.description}
                                        </p>
                                        <div className="mt-8">
                                            <Button 
                                                variant="outline"
                                                onClick={() => handleOpenModal(course)}
                                                className="rounded-full border-[#EEA33B]/40 text-[#EEA33B] hover:bg-[#EEA33B] hover:text-black hover:border-[#EEA33B] transition-all duration-300 font-bold flex items-center gap-2 group/btn"
                                            >
                                                Learn more
                                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#EEA33B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Dynamic Split-View Detail Modal */}
                <Dialog open={!!selectedSubProgram} onOpenChange={(open) => { if(!open) setSelectedSubProgram(null); }}>
                    <DialogContent className="sm:max-w-4xl bg-[#1A1A1A] border-gray-800 text-white rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_100px_rgba(238,163,59,0.15)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Side: Program Details */}
                            <div className="p-10 lg:p-12 bg-[#1A1A1A] flex flex-col h-full border-r border-gray-800/50">
                                <div className="flex-1">
                                    <h2 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                                        {selectedSubProgram?.title}
                                    </h2>
                                    <p className="text-gray-400 font-body text-base leading-relaxed mb-8">
                                        {selectedSubProgram?.description}
                                    </p>
                                    
                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-white">Duration:</span>
                                            <span className="text-gray-300 font-body">{selectedSubProgram?.duration || "Variable"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-white">Price:</span>
                                            <span className="text-gray-300 font-body">{selectedSubProgram?.price || "Contact for Details"}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    variant="ghost" 
                                    onClick={() => setSelectedSubProgram(null)}
                                    className="w-fit px-8 py-6 rounded-2xl bg-gray-800/30 hover:bg-gray-800 text-gray-300 hover:text-white transition-all flex items-center gap-2 group/back"
                                >
                                    <ArrowLeft className="w-4 h-4 group-back/back:-translate-x-1 transition-transform" />
                                    Back
                                </Button>
                            </div>

                            {/* Right Side: Enquiry Form */}
                            <div className="p-10 lg:p-12 bg-[#121212] relative overflow-y-auto max-h-[90vh]">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="font-display text-3xl font-bold text-white">
                                        Enquire for Program
                                    </h3>
                                    <button 
                                        onClick={() => setSelectedSubProgram(null)}
                                        className="text-[#EEA33B] text-sm font-bold flex items-center gap-1.5 hover:text-white transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                                        Back
                                    </button>
                                </div>

                                <form onSubmit={handleEnquirySubmit} className="space-y-6">
                                    <div className="space-y-2 text-left">
                                        <Label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Program</Label>
                                        <Input 
                                            value={selectedSubProgram?.title} 
                                            disabled 
                                            className="bg-[#1A1A1A] border-none h-14 rounded-2xl text-gray-400 cursor-not-allowed font-medium" 
                                        />
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <Label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Full Name</Label>
                                        <Input 
                                            required 
                                            value={formData.studentName} 
                                            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                                            placeholder="Enter your name" 
                                            className="bg-[#1A1A1A] border-none h-14 rounded-2xl focus:ring-1 focus:ring-[#EEA33B] text-white placeholder:text-gray-700" 
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 text-left">
                                            <Label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Email</Label>
                                            <Input 
                                                required 
                                                type="email"
                                                value={formData.email} 
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="email@example.com" 
                                                className="bg-[#1A1A1A] border-none h-14 rounded-2xl focus:ring-1 focus:ring-[#EEA33B] text-white placeholder:text-gray-700" 
                                            />
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <Label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Phone</Label>
                                            <Input 
                                                required 
                                                value={formData.phone} 
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                placeholder="+91" 
                                                className="bg-[#1A1A1A] border-none h-14 rounded-2xl focus:ring-1 focus:ring-[#EEA33B] text-white placeholder:text-gray-700" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <Label className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Questions/Comments (Optional)</Label>
                                        <Textarea 
                                            value={formData.message} 
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            rows={4} 
                                            placeholder="Tell us about your requirements"
                                            className="bg-[#1A1A1A] border-none rounded-2xl focus:ring-1 focus:ring-[#EEA33B] text-white placeholder:text-gray-700 resize-none p-5" 
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full bg-[#EEA33B] text-black hover:bg-[#EEA33B]/90 rounded-full py-8 text-lg font-bold shadow-[0_10px_30px_rgba(238,163,59,0.3)] transition-all transform hover:scale-[1.02] mt-6"
                                    >
                                        Submit Information
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Footer />
            </div>
        );
    }

    // Layout for Specific Program Detail
    if (program) {
        return (
            <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
                <Header />
                <main className="flex-1">
                    <div className="max-w-7xl mx-auto py-12 px-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-[#EEA33B] hover:text-white transition-colors mb-8 font-body uppercase tracking-wider text-xs"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Category
                        </button>

                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="gold-line w-16 h-1 bg-[#EEA33B] mb-6" />
                                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                                        {program.title}
                                    </h1>
                                    <p className="text-[#EEA33B] font-body text-lg font-medium mb-8">
                                        {program.subtitle}
                                    </p>
                                    <p className="text-gray-300 font-body text-lg leading-relaxed mb-10">
                                        {program.longDescription}
                                    </p>
                                    <h2 className="font-display text-2xl font-bold text-[#EEA33B] mb-6 flex items-center gap-3">
                                        <Target className="w-6 h-6" /> Curriculum Overview
                                    </h2>
                                    <ul className="space-y-4 mb-12">
                                        {program.curriculum.map((item, idx) => (
                                            <li key={idx} className="flex gap-4 items-start text-white font-body leading-relaxed p-5 bg-[#1A1A1A] rounded-2xl border border-gray-800/50 shadow-xl">
                                                <div className="w-6 h-6 rounded-full bg-[#EEA33B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-4 h-4 text-[#EEA33B]" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-[#EEA33B]/20 shadow-[0_30px_60px_-15px_rgba(201,168,76,0.3)]">
                                    <h3 className="font-display text-2xl font-bold text-white mb-8">Program Info</h3>
                                    <div className="space-y-6 mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#EEA33B]/10 flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-[#EEA33B]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Duration</p>
                                                <p className="text-white font-body font-bold">{program.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#EEA33B]/10 flex items-center justify-center">
                                                <GraduationCap className="w-6 h-6 text-[#EEA33B]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Certification</p>
                                                <p className="text-white font-body font-bold">Clinical Excellence</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-8">
                                        <p className="text-[#EEA33B] font-body text-xs font-bold mb-4 uppercase tracking-widest">Key Focus Areas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {program.focusAreas.map(area => (
                                                <span key={area} className="px-3 py-1 bg-black/40 border border-gray-800 rounded-full text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Button className="w-full rounded-full py-7 text-lg font-bold bg-[#EEA33B] text-black hover:bg-[#d49234] shadow-xl transition-all">
                                        Enquire Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Default Fallback
    return (
        <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl text-white font-bold mb-4">Program Not Found</h1>
                    <Button onClick={() => navigate("/")} className="bg-[#EEA33B] text-black font-bold">Return Home</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProgramDetailPage;
