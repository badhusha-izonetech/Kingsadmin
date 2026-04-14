import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface VideoLesson {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}

const videoLessons: VideoLesson[] = [
  {
    id: 1,
    title: "Clinical Procedures Demonstration",
    duration: "12:45",
    thumbnail: "https://img.youtube.com/vi/2yxa67n5JR4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2yxa67n5JR4",
    category: "Clinical Training",
  },
  {
    id: 2,
    title: "Advanced Digital Dentistry Workflow",
    duration: "15:20",
    thumbnail: "https://img.youtube.com/vi/saL6U7Vx6hc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/saL6U7Vx6hc",
    category: "Digital Dentistry",
  },
  {
    id: 3,
    title: "Modern Endodontics Masterclass",
    duration: "18:10",
    thumbnail: "https://img.youtube.com/vi/qNKYxgSYwBk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/qNKYxgSYwBk",
    category: "Endodontics",
  },
  {
    id: 4,
    title: "Cosmetic Dentistry Excellence",
    duration: "14:55",
    thumbnail: "https://img.youtube.com/vi/81qSdFYKRcc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/81qSdFYKRcc",
    category: "Cosmetic Dentistry",
  },
  {
    id: 5,
    title: "Precision Implantology Training",
    duration: "22:30",
    thumbnail: "https://img.youtube.com/vi/dFy4CkXqZoE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dFy4CkXqZoE",
    category: "Implantology",
  },
  {
    id: 6,
    title: "Orthodontic Clinical Success",
    duration: "16:40",
    thumbnail: "https://img.youtube.com/vi/9tYlvEz1884/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9tYlvEz1884",
    category: "Orthodontics",
  },
];

const categories = ["All", ...Array.from(new Set(videoLessons.map((v) => v.category)))];

const TeachVideos = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<VideoLesson | null>(null);

  const filtered =
    activeCategory === "All"
      ? videoLessons
      : videoLessons.filter((v) => v.category === activeCategory);

  return (
    <section className="da-section pt-6 md:pt-8 lg:pt-10 bg-background" id="upcoming">
      <div className="da-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 2.5, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-12"
        >
          <div className="gold-line w-16 mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'rgb(245, 236, 216)' }}>
            Video Courses
          </h2>
          <p className="text-white font-body text-base sm:text-lg max-w-2xl mx-auto">
            Watch expert-led dental training videos and elevate your clinical skills.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-body text-sm transition-colors border ${activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-white border-border hover:text-primary hover:border-primary/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, index) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              viewport={{ once: false }}
              transition={{ duration: 2.5, delay: index * 0.3, ease: [0.2, 0, 0, 1] }}
              onClick={() => setPlayingVideo(video)}
              className="group bg-card rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/50 hover:shadow-[0_20px_50px_-12px_rgba(201,168,76,0.3)] transition-all duration-500 text-left relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                  </div>
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs font-body px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-5">
                <span className="text-white font-body text-xs font-semibold tracking-wide uppercase">
                  {video.category}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-1 leading-snug">
                  {video.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!playingVideo} onOpenChange={(open) => { if (!open) setPlayingVideo(null); }}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0">
          {playingVideo && (
            <>
              <div className="aspect-video w-full">
                <iframe
                  src={playingVideo.videoUrl + "?autoplay=1"}
                  title={playingVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <DialogHeader className="p-5">
                <DialogTitle className="font-display text-xl font-bold text-foreground">
                  {playingVideo.title}
                </DialogTitle>
                <DialogDescription className="text-white font-body text-sm font-medium">
                  {playingVideo.category} · {playingVideo.duration}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeachVideos;
