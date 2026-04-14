export interface SubProgram {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration?: string;
  price?: string;
}

export interface ProgramCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  courses: SubProgram[];
}

export const categoryPrograms: ProgramCategory[] = [
  {
    id: "masterships",
    title: "Mastery Programs",
    subtitle: "Take your skills to the highest level with our intensive mastery programs.",
    description: "Take your skills to the highest level with our intensive mastery programs.",
    courses: [
      { id: "fixed-ortho-mastery", title: "Fixed Orthodontics", subtitle: "Advance Your Skills with our Mastery", description: "Advanced mastery program in fixed orthodontics. Comprehensive clinical training covering modern techniques and case finishing.", duration: "6 Months", price: "₹ 19k" },
      { id: "cosmetic-mastery", title: "Cosmetic Dentistry Course", subtitle: "Advance Your Skills with our Mastery", description: "Master the art of cosmetic dentistry. Focus on aesthetic principles, veneers, and smile design.", duration: "6 Days", price: "₹ 49k" },
      { id: "crown-bridge-mastery", title: "Crown and Bridge Course", subtitle: "Advance Your Skills with our Mastery", description: "Comprehensive training in crown and bridge procedures. Master preparation and cementation.", duration: "6 Days", price: "₹ 45k" },
      { id: "implantology-mastery", title: "Dental Implantology Course", subtitle: "Advance Your Skills with our Mastery", description: "Advanced implantology techniques and practice. Hands-on training on surgical placement.", duration: "6 Days", price: "₹ 55k" },
      { id: "lab-tech-mastery", title: "Dental Lab Technician Course", subtitle: "Advance Your Skills with our Mastery", description: "Training for dental lab technicians. Learn modern CAD/CAM and ceramic techniques.", duration: "3 Months", price: "₹ 25k" },
      { id: "facial-aesthetics-mastery", title: "Facial Aesthetics Course", subtitle: "Advance Your Skills with our Mastery", description: "Mastery in facial aesthetics and cosmetology. Integration of skin and dental aesthetics.", duration: "6 Days", price: "₹ 60k" },
      { id: "oral-surgery-mastery", title: "Basic Oral Surgery Clinical Course", subtitle: "Advance Your Skills with our Mastery", description: "Clinical course on basic oral surgery. Focus on atraumatic extractions and minor surgeries.", duration: "6 Days", price: "₹ 40k" },
      { id: "laser-mastery", title: "Laser Dentistry Course", subtitle: "Advance Your Skills with our Mastery", description: "Advanced laser dentistry techniques. Applications in soft and hard tissue procedures.", duration: "3 Days", price: "₹ 35k" },
      { id: "periodontics-mastery", title: "Periodontics Clinical Course", subtitle: "Advance Your Skills with our Mastery", description: "Clinical mastery in periodontics. Modern surgical and non-surgical management.", duration: "6 Months", price: "₹ 30k" },
    ]
  },
  {
    id: "fellowships",
    title: "Fellowship Programs",
    subtitle: "Advance your career with our specialized fellowship programs designed for dental professionals.",
    description: "Advance your career with our specialized fellowship programs designed for dental professionals.",
    courses: [
      { id: "fellowship-fixed-ortho", title: "Fellowship in Fixed Orthodontics", subtitle: "Premium Fellowship Excellence", description: "Comprehensive 6-month program designed to offer complete education in orthodontics.", duration: "6 Months", price: "₹ 19k" },
      { id: "fellowship-general-dentistry", title: "Fellowship in General Dentistry", subtitle: "Premium Fellowship Excellence", description: "Master the art of general dental practice with our intensive fellowship.", duration: "3 Months", price: "₹ 15k" },
      { id: "fellowship-restorative", title: "Fellowship in Restorative Dentistry", subtitle: "Premium Fellowship Excellence", description: "Advanced training in modern restorative techniques and materials.", duration: "6 Months", price: "₹ 20k" },
      { id: "fellowship-endodontics", title: "Fellowship in Clinical Endodontics", subtitle: "Premium Fellowship Excellence", description: "Specialized training in root canal therapy and endodontic procedures.", duration: "6 Months", price: "₹ 22k" },
      { id: "fellowship-implantology", title: "Fellowship in Dental Implantology", subtitle: "Premium Fellowship Excellence", description: "Complete guide to surgical and prosthetic aspects of dental implants.", duration: "6 Months", price: "₹ 25k" },
      { id: "fellowship-cosmetic", title: "Fellowship in Cosmetic Dentistry", subtitle: "Premium Fellowship Excellence", description: "Learn to create beautiful smiles with our cosmetic dentistry fellowship.", duration: "6 Months", price: "₹ 18k" },
    ]
  },
  {
    id: "examcourse",
    title: "International Exam Preparation Courses",
    subtitle: "Prepare for international dental licensing examinations with expert guidance.",
    description: "Prepare for international dental licensing examinations with expert guidance.",
    courses: [
      { id: "nbde-usa", title: "NBDE - United States", subtitle: "Global Licensing Excellence", description: "National Board Dental Examination. Two-part examination required for Indian dentists to practice in the U.S.", duration: "6-12 Months", price: "Contact for Quote" },
      { id: "ndeb-canada", title: "NDEB - Canada", subtitle: "Global Licensing Excellence", description: "National Dental Examining Board of Canada. Equivalency process including Written Examination (WREB) and OSCE.", duration: "6-12 Months", price: "Contact for Quote" },
      { id: "ore-uk", title: "ORE - United Kingdom", subtitle: "Global Licensing Excellence", description: "Overseas Registration Examination. Two-part examination: ORE Part 1 (MCQ) and ORE Part 2 (practical OSCE).", duration: "6-12 Months", price: "Contact for Quote" },
      { id: "adc-australia", title: "ADC - Australia", subtitle: "Global Licensing Excellence", description: "Australian Dental Council Examination. Comprehensive assessment including written and practical examinations.", duration: "6-12 Months", price: "Contact for Quote" },
      { id: "nzdrex-nz", title: "NZDREX - New Zealand", subtitle: "Global Licensing Excellence", description: "New Zealand Dentists Registration Examination. Complete examination with written and clinical components.", duration: "6-12 Months", price: "Contact for Quote" },
    ]
  },
  {
    id: "shortcourse",
    title: "Short Courses",
    subtitle: "Enhance your skills with our focused short-term programs designed for busy dental professionals.",
    description: "Enhance your skills with our focused short-term programs designed for busy dental professionals.",
    courses: [
      { id: "short-materials", title: "Latest Trends in Dental Materials", subtitle: "Quick Skill Enhancement", duration: "2-3 Hours", description: "Overview of new materials and advancements in restorative dentistry.", price: "₹ 5k" },
      { id: "short-comm", title: "Effective Communication with Dental Patients", subtitle: "Quick Skill Enhancement", duration: "2 Hours", description: "Strategies for improving patient communication and building rapport.", price: "₹ 3k" },
      { id: "short-digital", title: "Introduction to Digital Dentistry", subtitle: "Quick Skill Enhancement", duration: "3 Hours", description: "Basics of digital impressions, CAD/CAM technology, and intraoral scanning.", price: "₹ 8k" },
      { id: "short-emergency", title: "Emergency Procedures in Dentistry", subtitle: "Quick Skill Enhancement", duration: "2 Hours", description: "Managing common dental emergencies and immediate care protocols.", price: "₹ 6k" },
      { id: "short-infection", title: "Infection Control in Dental Practice", subtitle: "Quick Skill Enhancement", duration: "2-3 Hours", description: "Review of current infection control protocols and best practices.", price: "₹ 4k" },
      { id: "short-pediatric", title: "Overview of Pediatric Dentistry", subtitle: "Quick Skill Enhancement", duration: "2-3 Hours", description: "Key considerations and techniques for treating pediatric patients.", price: "₹ 7k" },
      { id: "short-periodontal", title: "Periodontal Health and Maintenance", subtitle: "Quick Skill Enhancement", duration: "2-3 Hours", description: "Updates on periodontal disease management and maintenance.", price: "₹ 5k" },
      { id: "short-implant-intro", title: "Introduction to Implant Dentistry", subtitle: "Quick Skill Enhancement", duration: "3 Hours", description: "Basics of dental implantology, including planning and placement.", price: "₹ 10k" },
      { id: "short-cosmetic-intro", title: "Introduction to Cosmetic Dentistry", subtitle: "Quick Skill Enhancement", duration: "2 Hours", description: "Overview of aesthetic considerations and basic cosmetic procedures.", price: "₹ 8k" },
    ]
  }
];
