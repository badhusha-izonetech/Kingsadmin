export interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
  link?: string;
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Advanced Implant Fellowship Program Starting March 2026",
    date: "March 15, 2026",
    description: "Join our prestigious Advanced Implant Fellowship Program designed for dental professionals looking to master the latest techniques in implantology. The program covers diagnosis, treatment planning, and advanced surgical procedures.",
    link: "/upcoming"
  },
  {
    id: 2,
    title: "Register Now for Hands-On Surgical Workshop",
    date: "April 10, 2026",
    description: "Experience intensive hands-on training in our upcoming surgical workshop. Gain practical skills in various dental surgical procedures under the guidance of world-renowned experts.",
    link: "/upcoming"
  },
  {
    id: 3,
    title: "International Dental Conference December 2024",
    date: "December 5, 2024",
    description: "Don't miss the International Dental Conference where industry leaders gather to discuss the future of dentistry. Network with peers and stay updated with the latest technological advancements.",
    link: "/upcoming"
  }
];
