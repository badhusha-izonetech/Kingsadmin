import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { X } from "lucide-react";

const FacultySection = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        setIsLoading(true);
        const data = await api.getFaculty();
        if (data && data.length > 0) {
          setFaculty(data);
          setLastUpdated(new Date());
        } else {
          // Fallback data only if no data from API
          setFaculty([
            { id: 1, name: "Dr. Rajesh Kumar", specialization: "Director & Chief Implantologist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", experience: "15 Years", contact_info: "+91 9876543210" },
            { id: 2, name: "Dr. Priya Sharma", specialization: "Head of Digital Dentistry", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", experience: "12 Years", contact_info: "+91 9876543211" },
            { id: 3, name: "Dr. Anil Menon", specialization: "Senior Prosthodontist", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", experience: "10 Years", contact_info: "+91 9876543212" },
            { id: 4, name: "Dr. Kavita Nair", specialization: "Oral Surgery Specialist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", experience: "8 Years", contact_info: "+91 9876543213" },
          ]);
        }
      } catch (error) {
        console.error('Failed to load faculty:', error);
        // Fallback data on error
        setFaculty([
          { id: 1, name: "Dr. Rajesh Kumar", specialization: "Director & Chief Implantologist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", experience: "15 Years", contact_info: "+91 9876543210" },
          { id: 2, name: "Dr. Priya Sharma", specialization: "Head of Digital Dentistry", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", experience: "12 Years", contact_info: "+91 9876543211" },
          { id: 3, name: "Dr. Anil Menon", specialization: "Senior Prosthodontist", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", experience: "10 Years", contact_info: "+91 9876543212" },
          { id: 4, name: "Dr. Kavita Nair", specialization: "Oral Surgery Specialist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", experience: "8 Years", contact_info: "+91 9876543213" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    loadFaculty();
    
    // Refresh data every 10 seconds to show admin updates quickly
    const interval = setInterval(() => {
      loadFaculty();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
    <section className="da-section bg-card" id="faculty">
      <div className="da-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Expert Faculty
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from industry-leading professionals with decades of combined experience
          </p>
          {isLoading && (
            <div className="mt-2 text-sm text-primary animate-pulse">
              Updating faculty information...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {faculty.map((member, index) => (
            <div 
              key={`${member.id ?? "noid"}-${member.name ?? index}`} 
              className="group cursor-pointer"
              onClick={() => setSelectedFaculty(member)}
            >
              <div className="relative overflow-hidden mb-4 aspect-square rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary mb-1">{member.specialization}</p>
                {member.experience && (
                  <p className="text-xs text-muted-foreground">{member.experience}</p>
                )}
                {member.contact_info && (
                  <p className="text-xs text-muted-foreground">{member.contact_info}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {selectedFaculty && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFaculty(null)}>
        <div className="bg-card border border-border rounded-lg max-w-2xl w-full relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setSelectedFaculty(null)}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={selectedFaculty.image}
                alt={selectedFaculty.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop";
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {selectedFaculty.name}
              </h3>
              <p className="text-primary text-lg mb-4">{selectedFaculty.specialization}</p>
              
              {/* Experience Section */}
              {selectedFaculty.experience && (
                <div className="mb-3">
                  <h4 className="font-semibold text-foreground mb-1">Experience</h4>
                  <p className="text-muted-foreground">{selectedFaculty.experience}</p>
                </div>
              )}
              
              {/* Contact Info Section */}
              {selectedFaculty.contact_info && (
                <div className="mb-3">
                  <h4 className="font-semibold text-foreground mb-1">Contact Information</h4>
                  <p className="text-muted-foreground">{selectedFaculty.contact_info}</p>
                </div>
              )}
              
              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Click outside to close this dialog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default FacultySection;
