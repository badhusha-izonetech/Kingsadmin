import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickActions from "@/components/QuickActions";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProgramsPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                {/* Simple Page Header */}
                <section className="py-20 bg-card border-b border-border">
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
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
                                Our Programs
                            </h1>
                            <p className="text-white font-body text-lg max-w-2xl mx-auto leading-relaxed">
                                Elevate your clinical expertise with our internationally recognized dental fellowship programs.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Reuse the QuickActions component which contains the program cards */}
                <QuickActions />
            </main>
            <Footer />
        </div>
    );
};

export default ProgramsPage;
