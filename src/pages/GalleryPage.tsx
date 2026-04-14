import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Video, Camera, Play, X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import doc from "../assets/doc.jpeg";
import doc1 from "../assets/doc1.jpeg";
import doc2 from "../assets/doc2.jpeg";

interface GalleryItem {
    id: number;
    type: "photo" | "video";
    category: "workshop" | "event" | "campus";
    src: string;
    title: string;
    description: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        type: "photo",
        category: "workshop",
        src: img1,
        title: "Implant Training Workshop",
        description: "Hands-on implant placement training session with advanced surgical techniques and live patient demonstrations",
    },
    {
        id: 2,
        type: "photo",
        category: "workshop",
        src: img2,
        title: "Digital Dentistry Workshop",
        description: "CAD/CAM technology training for precise dental restorations and digital smile design workflows",
    },
    {
        id: 3,
        type: "photo",
        category: "event",
        src: img3,
        title: "Annual Conference 2025",
        description: "Dental professionals gathering to share knowledge and network at our prestigious annual event",
    },
    {
        id: 4,
        type: "photo",
        category: "campus",
        src: img4,
        title: "Our Campus",
        description: "State-of-the-art facility with modern infrastructure and cutting-edge dental equipment",
    },
    {
        id: 5,
        type: "photo",
        category: "workshop",
        src: img5,
        title: "Surgical Training",
        description: "Live patient training session for advanced surgical procedures and implant techniques",
    },
    {
        id: 6,
        type: "photo",
        category: "event",
        src: img6,
        title: "Certificate Distribution",
        description: "Graduating batch ceremony celebrating students completion of dental training programs",
    },
    {
        id: 7,
        type: "photo",
        category: "campus",
        src: img7,
        title: "Simulation Lab",
        description: "Advanced practicing training simulators for dental procedures in a risk-free environment",
    },
    {
        id: 8,
        type: "photo",
        category: "workshop",
        src: img8,
        title: "Prosthodontics Workshop",
        description: "Comprehensive crown and bridge training with hands-on fabrication techniques",
    },
    {
        id: 9,
        type: "video",
        category: "workshop",
        src: img9,
        title: "Live Implant Surgery",
        description: "Watch our expert surgeons perform live implant placement with real-time explanations",
    },
    {
        id: 10,
        type: "video",
        category: "workshop",
        src: doc,
        title: "Hands-On Training Session",
        description: "Participants practicing latest dental techniques under expert supervision and guidance",
    },
    {
        id: 11,
        type: "photo",
        category: "campus",
        src: doc1,
        title: "Conference Room",
        description: "Modern lecture hall equipped with audio-visual technology for interactive learning",
    },
    {
        id: 12,
        type: "photo",
        category: "event",
        src: doc2,
        title: "Guest Lecture",
        description: "International speaker session sharing global dental practices and innovative approaches",
    },
];

const categories = [
    { id: "all", name: "All Experiences" },
    { id: "workshop", name: "Training Workshops" },
    { id: "event", name: "Global Events" },
    { id: "campus", name: "Campus Life" },
];

const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filteredItems = galleryItems.filter(
        (item) => activeCategory === "all" || item.category === activeCategory
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">

                {/* Hero Section */}
                <section className="relative pt-8 pb-8 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -skew-y-6 transform origin-right" />
                    <div className="da-container relative z-10">
                        <Button
                            variant="ghost"
                            className="mb-8 font-body hover:bg-primary/10"
                            onClick={() => window.location.href = "/"}
                        >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Back to Home
                        </Button>
                        <div className="gold-line w-24 mb-8" />
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                            Visual Journey & <br />
                            <span className="text-primary italic">Clinical Excellence</span>
                        </h1>
                        <p className="text-muted-foreground max-w-3xl font-body text-xl leading-relaxed">
                            A comprehensive look at our hands-on workshops, international conferences, and the world-class learning environment at Kings Dental Academy.
                        </p>
                    </div>
                </section>

                {/* Gallery Fluid Area */}
                <section className="pt-8 pb-20">
                    <div className="da-container">
                        {/* Filters */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`relative px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                        : "bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Grid Area with Luxe Entrance */}
                        <div
                            key={activeCategory}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group perspective h-[320px] md:h-[400px] animate-card-entrance"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-12 cursor-pointer rounded-2xl overflow-hidden shadow-2xl">
                                        {/* Image/Video Container */}
                                        <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform translate-z-0 transition-all duration-1000 group-hover:-translate-z-20 grayscale-[20%] group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                        </div>

                                        {/* Icon Overlay */}
                                        <div className="absolute top-6 right-6 z-20 transform translate-z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            {item.type === "video" ? (
                                                <div className="p-3 bg-primary/90 rounded-full text-white backdrop-blur-sm shadow-xl">
                                                    <Play className="w-6 h-6 fill-current" />
                                                </div>
                                            ) : (
                                                <div className="p-3 bg-white/20 rounded-full text-white backdrop-blur-md shadow-xl border border-white/20">
                                                    <Camera className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20 preserve-3d pointer-events-none">
                                            <div className="transform transition-all duration-700">
                                                <p className="text-primary font-body text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 translate-z-10 group-hover:translate-z-30">
                                                    {item.category}
                                                </p>
                                                <h3 className="font-display text-2xl md:text-3xl font-bold text-white transition-all duration-700 delay-150 opacity-0 transform -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 translate-z-20 group-hover:translate-z-50 leading-tight">
                                                    {item.title}
                                                </h3>
                                                <div className="h-[2px] w-0 bg-primary mt-4 group-hover:w-full transition-all duration-700 delay-300" />
                                            </div>
                                        </div>

                                        {/* Glass Border Effect */}
                                        <div className="absolute inset-0 border border-white/10 rounded-2xl z-30 pointer-events-none group-hover:border-primary/50 transition-colors duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox */}
                <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                    <DialogContent className="max-w-5xl bg-black/95 border-primary/20 p-0 overflow-hidden rounded-2xl backdrop-blur-xl">
                        <DialogHeader className="sr-only">
                            <DialogTitle>{selectedItem?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="relative aspect-video w-full group">
                            {selectedItem && (
                                <>
                                    <img
                                        src={selectedItem.src}
                                        alt={selectedItem.title}
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                                        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-2">{selectedItem.category}</p>
                                        <h3 className="font-display text-3xl font-bold text-white mb-2">{selectedItem.title}</h3>
                                        <p className="text-gray-300 font-body max-w-3xl leading-relaxed">{selectedItem.description}</p>
                                    </div>
                                </>
                            )}

                            {/* <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button> */}
                        </div>
                    </DialogContent>
                </Dialog>

            </main>
            <Footer />
        </div>
    );
};

export default GalleryPage;
