// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import award1 from "../assets/award1.png";
// import award2 from "../assets/award2.png";
// import award3 from "../assets/award3.png";
// import award4 from "../assets/award4.png";
// import award5 from "../assets/award5.png";

// const announcements = [
//   {
//     text: "Advanced Implant Fellowship Program Starting March 2026",
//     link: "/announcements/1",
//   },
//   {
//     text: "Register Now for Hands-On Surgical Workshop",
//     link: "/announcements/2",
//   },
//   {
//     text: "International Dental Conference December 2024",
//     link: "/announcements/3",
//   },
// ];


// const awards = [
//   { img: award1, name: "ISO Certified" },
//   { img: award2, name: "Global Dental Standard" },
//   { img: award3, name: "Advanced Implant Training" },
//   { img: award4, name: "International Recognition" },
//   { img: award5, name: "Premium Dental Academy" },
// ];

// const duplicatedAnnouncements = [...announcements, ...announcements];

// export default function AnnouncementBar() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % awards.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex items-center h-[48px] bg-black border-y border-primary/50 overflow-hidden relative z-30 shadow-2xl">
//       <div className="flex items-center gap-3 pl-4 sm:pl-10 h-full bg-black flex-shrink-0 z-10">

//         <div className="flex items-center gap-2">
//           <img src={awards[index].img} alt="Award" className="h-6 w-6 object-contain" />
//           <span className="text-primary font-bold text-[13px] whitespace-nowrap uppercase tracking-wider">
//             {awards[index].name}
//           </span>
//         </div>
//         <div className="h-1/2 w-[1px] bg-primary/30 mx-2"></div>
//       </div>

//       <div className="flex-1 overflow-hidden relative">
//         <div className="flex items-center gap-14 whitespace-nowrap animate-marquee group py-2">
//           {duplicatedAnnouncements.map((item, index) => (
//             <Link
//               key={index}
//               to={item.link}
//               className="text-white text-[13px] font-medium flex items-center gap-2 hover:text-primary transition-colors duration-300 uppercase tracking-wide"
//             >
//               <span className="text-primary/80">{"\u2B50"}</span> {item.text}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

// }




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import award1 from "../assets/award1.png";
import award2 from "../assets/award2.png";
import award3 from "../assets/award3.png";
import award4 from "../assets/award4.png";
import award5 from "../assets/award5.png";

const announcements = [
  {
    text: "Advanced Implant Fellowship Program Starting March 2026",
    link: "/upcoming",
  },
  {
    text: "Register Now for Hands-On Surgical Workshop",
    link: "/upcoming",
  },
  {
    text: "International Dental Conference December 2024",
    link: "/upcoming",
  },
];

const awards = [
  { img: award1, name: "ISO Certified" },
  { img: award2, name: "Global Dental Standard" },
  { img: award3, name: "Advanced Implant Training" },
  { img: award4, name: "International Recognition" },
  { img: award5, name: "Premium Dental Academy" },
];

const duplicatedAnnouncements = [...announcements, ...announcements];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % awards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center h-[95px] bg-black border-t border-yellow-500 overflow-hidden">

      {/* Award Badge */}
      <div className="flex items-center justify-center w-[200px] flex-shrink-0 gap-2">
        <img
          src={awards[index].img}
          alt="Award"
          className="h-24 w-24 object-contain"
        />
        <span className="text-yellow-400 text-sm font-semibold">
          {awards[index].name}
        </span>
      </div>

      {/* Announcement Ticker */}
      <div className="flex-1 overflow-hidden ml-4">
        <div className="flex items-center gap-10 whitespace-nowrap animate-marquee min-w-max hover:[animation-play-state:paused]">
          {duplicatedAnnouncements.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-white text-sm flex items-center gap-2"
            >
              ⭐ {item.text}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}