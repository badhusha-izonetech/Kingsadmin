import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        subcourse: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.course) {
            toast({ title: "Please fill in all required fields", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            await api.createContact(formData);
            toast({ title: "✅ Message sent successfully!", description: "We'll get back to you soon." });
            setFormData({ name: "", email: "", phone: "", course: "", subcourse: "", message: "" });
        } catch (error) {
            toast({ title: "Failed to send message", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-display text-4xl font-bold text-primary mb-4"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 64 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-1 bg-primary mx-auto rounded-full" 
                        />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Send Us a Message Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-card rounded-[2.5rem] p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-border/50 hover:border-primary/30 transition-colors"
                        >
                            <h2 className="font-display text-2xl font-bold text-primary mb-8 text-left">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">Full Name *</label>
                                    <Input 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="" 
                                        className="bg-background/50 border-border rounded-xl h-12 text-foreground focus:ring-primary focus:border-primary" 
                                        required
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address *</label>
                                    <Input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="" 
                                        className="bg-background/50 border-border rounded-xl h-12 text-foreground focus:ring-primary focus:border-primary" 
                                        required
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">Phone Number *</label>
                                    <Input 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="" 
                                        className="bg-background/50 border-border rounded-xl h-12 text-foreground focus:ring-primary focus:border-primary" 
                                        required
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">Interested Course *</label>
                                    <div className="relative">
                                        <select 
                                            value={formData.course}
                                            onChange={(e) => setFormData({...formData, course: e.target.value})}
                                            className="w-full h-12 px-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm text-foreground appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" className="bg-card">Select Course</option>
                                            <option value="fellowship" className="bg-card">Fellowship Programs</option>
                                            <option value="mastery" className="bg-card">Mastery Bootcamps</option>
                                            <option value="exams" className="bg-card">Exam Courses</option>
                                            <option value="short" className="bg-card">Short Courses</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">Sub Course (Optional)</label>
                                    <Input 
                                        value={formData.subcourse}
                                        onChange={(e) => setFormData({...formData, subcourse: e.target.value})}
                                        placeholder="Specific course or specialization" 
                                        className="bg-background/50 border-border rounded-xl h-12 text-foreground focus:ring-primary focus:border-primary" 
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] ml-1">Message</label>
                                    <Textarea 
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="" 
                                        className="bg-background/50 border-border rounded-2xl text-foreground focus:ring-primary focus:border-primary resize-none p-4 min-h-[150px]" 
                                    />
                                </div>
                                <Button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 text-black rounded-full py-7 text-lg font-bold shadow-xl shadow-primary/10 transition-all hover:scale-[1.01] disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </motion.div>

                        {/* Get In Touch Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-card rounded-[2.5rem] p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-border/50 flex flex-col h-full hover:border-primary/30 transition-colors"
                        >
                            <h2 className="font-display text-2xl font-bold text-primary mb-10 text-left">Get In Touch</h2>
                            
                            <div className="grid gap-10 mb-10 text-left">
                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Address</h4>
                                        <p className="text-white/80 leading-relaxed font-body">
                                            1st floor, Asha Arcade,<br />
                                            Promenade Road, Cantonment,<br />
                                            Tiruchirappalli, TamilNadu - 620001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Phone</h4>
                                        <p className="text-white/80 font-body">
                                            +91 8778951171
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Email</h4>
                                        <p className="text-white/80 font-body">
                                            info@kingsdentalacademy.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1 text-sm font-body">
                                        <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">
                                            Office Hours
                                        </h4>
                                        <p className="text-white/80">Monday - Friday: 10:00 AM - 6:00 PM</p>
                                        <p className="text-white/80">Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Container */}
                            <div className="mt-auto overflow-hidden rounded-[2rem] border border-border/50 shadow-2xl h-[280px]">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.910398642345!2d78.68260751126867!3d10.81740925837138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf56767702f79%3A0xc3f18e1d701db8b!2sKings%20Academy!5e0!3m2!1sen!2sin!4v1710287498712!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} // Subtle dark mode map filter
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
