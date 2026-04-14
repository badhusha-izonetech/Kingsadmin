import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { X, Trash2, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationPanelProps {
  onClose: () => void;
  onUpdate: () => void;
}

const NotificationPanel = ({ onClose, onUpdate }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await api.getUnreadNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications");
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.markAsRead(id.toString());
      loadNotifications();
      onUpdate();
    } catch (error) {
      toast({ title: "Failed to mark as read", variant: "destructive" });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await api.markAllAsRead();
      
      // Also update the enquiry read timestamp
      const currentTime = new Date().toISOString();
      localStorage.setItem('enquiries_last_read', currentTime);
      
