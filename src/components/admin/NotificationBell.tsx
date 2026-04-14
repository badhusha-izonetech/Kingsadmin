import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Bell, X, Mail, MessageSquare, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'enquiry' | 'popup_expired';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  data?: any;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastNotificationCount, setLastNotificationCount] = useState(0);
  const { toast } = useToast();

  // Simple notification sound using Web Audio API
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio notification not supported');
    }
  };

  useEffect(() => {
    loadNotifications();
    // Check for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      // Get recent enquiries (last 24 hours)
      const enquiries = await api.getEnquiries().catch(() => []);
      const popups = await api.getPopups().catch(() => []);
      
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const today = now.toISOString().split('T')[0];

      // Create notifications for recent enquiries
      const enquiryNotifications: Notification[] = enquiries
        .filter((enquiry: any) => new Date(enquiry.created_at) > yesterday)
        .map((enquiry: any) => ({
          id: `enquiry-${enquiry.id}`,
          type: 'enquiry' as const,
          title: 'New Course Enquiry',
          message: `${enquiry.student_name} enquired about ${enquiry.course_name}`,
          timestamp: enquiry.created_at,
          isRead: false,
          data: enquiry
        }));

      // Create notifications for expired popups
      const expiredPopupNotifications: Notification[] = popups
        .filter((popup: any) => 
          popup.status === 'active' && 
          popup.deadline && 
          popup.deadline < today
        )
        .map((popup: any) => ({
          id: `popup-expired-${popup.id}`,
          type: 'popup_expired' as const,
          title: 'Popup Message Expired',
          message: `"${popup.title}" has reached its deadline and should be deactivated`,
          timestamp: popup.deadline + 'T23:59:59',
          isRead: false,
          data: popup
        }));

      const allNotifications = [...enquiryNotifications, ...expiredPopupNotifications]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 20); // Keep only latest 20 notifications

      setNotifications(allNotifications);
      const newUnreadCount = allNotifications.filter(n => !n.isRead).length;
      
      // Play sound for new notifications
      if (newUnreadCount > lastNotificationCount && lastNotificationCount > 0) {
        playNotificationSound();
      }
      
      setUnreadCount(newUnreadCount);
      setLastNotificationCount(newUnreadCount);

      // Show toast for new enquiries (only if very recent)
      const veryRecentEnquiries = enquiryNotifications.filter(n => 
        new Date(n.timestamp).getTime() > (now.getTime() - 2 * 60000) // Last 2 minutes
      );
      
      if (veryRecentEnquiries.length > 0) {
        toast({
          title: "🔔 New Course Enquiry!",
          description: `${veryRecentEnquiries[0].message}`,
          duration: 8000,
        });
      }

      // Show toast for expired popups (only if expired today)
      const todayExpiredPopups = expiredPopupNotifications.filter(n => {
        const expiredDate = new Date(n.timestamp).toDateString();
        const todayDate = new Date().toDateString();
        return expiredDate === todayDate;
      });
      
      if (todayExpiredPopups.length > 0) {
        toast({
          title: "⚠️ Popup Expired!",
          description: `${todayExpiredPopups[0].message}`,
          duration: 8000,
        });
      }

    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const clearNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setUnreadCount(prev => {
      const notification = notifications.find(n => n.id === notificationId);
      return notification && !notification.isRead ? Math.max(0, prev - 1) : prev;
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'enquiry':
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'popup_expired':
        return <MessageSquare className="w-4 h-4 text-orange-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPanel(!showPanel)}
        className={`relative transition-all duration-200 hover:scale-110 ${
          unreadCount > 0 ? 'animate-pulse' : ''
        }`}
      >
        <Bell className={`w-5 h-5 ${
          unreadCount > 0 ? 'text-orange-500' : ''
        }`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowPanel(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden animate-slide-down">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPanel(false)}
                  className="w-6 h-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                  <p className="text-xs mt-1">New enquiries and expired popups will appear here</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${
                            !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                            className="w-4 h-4 opacity-50 hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{notifications.length} total notifications</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={loadNotifications}
                    className="text-xs h-6"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;