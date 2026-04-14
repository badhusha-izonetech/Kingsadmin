import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  const checkConnection = async () => {
    try {
      setStatus('checking');
      const response = await fetch('http://localhost:8000/', {
        method: 'GET',
        mode: 'cors',
      });
      
      if (response.ok) {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setStatus('disconnected');
    }
    setLastCheck(new Date());
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-red-600';
      case 'checking': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return '✅ Backend Connected';
      case 'disconnected': return '❌ Backend Disconnected';
      case 'checking': return '🔄 Checking...';
      default: return '❓ Unknown';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-50">
      <div className={`text-sm font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Last check: {lastCheck.toLocaleTimeString()}
      </div>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={checkConnection}
        className="mt-2 w-full text-xs"
      >
        Check Now
      </Button>
      {status === 'disconnected' && (
        <div className="text-xs text-red-600 mt-2">
          Make sure backend is running on port 8000
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;