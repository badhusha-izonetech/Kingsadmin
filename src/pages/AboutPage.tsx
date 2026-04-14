import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import StateSection from "@/components/StateSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 bg-card">
                    <div className="da-container">
                        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-body text-sm transition-colors group">
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Homepage
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="gold-line w-24 mx-auto mb-10" />
                            <h1 className="font-display text-4xl md:text-7xl font-bold text-foreground mb-8">
                                Pioneering <span className="text-primary">Dental Excellence</span>
                            </h1>
                            <p className="text-white font-body text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
                                Kings Dental Academy is committed to bridge the gap between academic knowledge and clinical mastery through hands-on training and mentorship.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <InfoSection />

                <section className="da-section">
                    <div className="da-container">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 bg-card rounded-[2rem] border border-border hover:border-primary/30 transition-all">
                                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Mission</h3>
                                <p className="text-white font-body leading-relaxed">To empower dental professionals with the latest clinical skills and technological advancements in modern dentistry.</p>
                            </div>
                            <div className="p-8 bg-card rounded-[2rem] border border-border hover:border-primary/30 transition-all">
                                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Vision</h3>
                                <p className="text-white font-body leading-relaxed">To be the global leader in clinical dental education, recognized for producing high-caliber practitioners.</p>
                            </div>
                            <div className="p-8 bg-card rounded-[2rem] border border-border hover:border-primary/30 transition-all">
                                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Values</h3>
                                <p className="text-white font-body leading-relaxed">Integrity, Excellence, and Innovation are at the heart of everything we do at Kings Dental Academy.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <StateSection />
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
