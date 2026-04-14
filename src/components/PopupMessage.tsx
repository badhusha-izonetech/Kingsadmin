import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PopupMessage = () => {
  const [popup, setPopup] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [lastPopupId, setLastPopupId] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadActivePopup = async () => {
      try {
        const data = await api.getActivePopup();
        console.log('Popup data received:', data); // Debug log
        
        if (data && data.status === 'active') {
          const currentPopupId = data.id;
          const wasClosedKey = `popup_closed_${currentPopupId}`;
          
          // Show popup if:
          // 1. It's a completely new popup (different ID)
          // 2. It wasn't manually closed by user in this session
          // 3. Force show if it's a brand new popup (different from last seen)
          const shouldShow = (
            currentPopupId !== lastPopupId || // New popup
            !sessionStorage.getItem(wasClosedKey) // Not closed by user
          );
          
          if (shouldShow) {
            console.log('Showing popup:', data.title); // Debug log
            setPopup(data);
            setShowPopup(true);
            setLastPopupId(currentPopupId);
            
            // Store in localStorage for persistence across tabs
            localStorage.setItem('last_seen_popup', `popup_${currentPopupId}`);
          }
        } else {
          // No active popup, hide if showing
          if (showPopup) {
            console.log('No active popup, hiding'); // Debug log
            setShowPopup(false);
            setPopup(null);
          }
        }
      } catch (error) {
        console.error('Failed to load active popup:', error);
      }
    };
    
    // Load immediately
    loadActivePopup();
    
    // Check for new popups every 2 seconds for faster response
    intervalRef.current = setInterval(loadActivePopup, 2000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lastPopupId, showPopup]);

  const handleClose = () => {
    console.log('Closing popup:', popup?.id); // Debug log
    setShowPopup(false);
    
    // Store in sessionStorage to prevent showing again in this session
    if (popup?.id) {
      sessionStorage.setItem(`popup_closed_${popup.id}`, 'true');
    }
    
    // Clear the popup after animation
    setTimeout(() => {
      setPopup(null);
    }, 300);
  };

  // Force refresh popup check when window gains focus (user switches back to tab)
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, checking for new popups'); // Debug log
      // Clear any existing interval and start fresh
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Check immediately
      const loadActivePopup = async () => {
        try {
          const data = await api.getActivePopup();
          if (data && data.status === 'active') {
            const currentPopupId = data.id;
            const wasClosedKey = `popup_closed_${currentPopupId}`;
            
            if (currentPopupId !== lastPopupId && !sessionStorage.getItem(wasClosedKey)) {
              setPopup(data);
              setShowPopup(true);
              setLastPopupId(currentPopupId);
            }
          }
        } catch (error) {
          console.error('Failed to load popup on focus:', error);
        }
      };
      
      loadActivePopup();
      
      // Restart interval
      intervalRef.current = setInterval(loadActivePopup, 2000);
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [lastPopupId]);

  if (!showPopup || !popup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-lg max-w-md sm:max-w-lg md:max-w-xl w-full relative shadow-2xl animate-slide-up">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full transition-colors z-10 bg-background/80"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 sm:p-8">
          {/* Image Section */}
          {popup.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={popup.image}
                alt={popup.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Content Section */}
          <div className="text-center">
            {popup.title && (
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
                {popup.title}
              </h2>
            )}
            
            {popup.description && (
              <div className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                {popup.description.split('\n').map((line: string, index: number) => (
                  <p key={index} className={index > 0 ? 'mt-2' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            )}
            
            {/* Deadline Section */}
            {popup.deadline && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-primary font-semibold text-sm">
                    📅 Deadline: {new Date(popup.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {/* Show days remaining */}
                {(() => {
                  const today = new Date();
                  const deadlineDate = new Date(popup.deadline);
                  const diffTime = deadlineDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  if (diffDays > 0) {
                    return (
                      <p className="text-primary/80 text-xs mt-1">
                        {diffDays} day{diffDays !== 1 ? 's' : ''} remaining
                      </p>
                    );
                  } else if (diffDays === 0) {
                    return (
                      <p className="text-red-600 text-xs mt-1 font-semibold">
                        Last day!
                      </p>
                    );
                  } else {
                    return (
                      <p className="text-red-600 text-xs mt-1">
                        Deadline passed
                      </p>
                    );
                  }
                })()}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleClose}
                className="bg-primary text-primary-foreground hover:brightness-110 transition-all duration-200"
              >
                Got it!
              </Button>
              {popup.deadline && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Scroll to contact or programs section
                    const element = document.querySelector('#programs') || document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    handleClose();
                  }}
                  className="transition-all duration-200"
                >
                  Learn More
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;