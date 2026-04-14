const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createMockId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const api = {
  getFaculty: async () => {
    await mockDelay(100);
    return [];
  },
  createFaculty: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), ...data };
  },
  updateFaculty: async (id: string, data: any) => {
    await mockDelay(200);
    return { id, ...data };
  },
  deleteFaculty: async () => {
    await mockDelay(150);
    return { success: true };
  },

  getCourses: async () => {
    await mockDelay(100);
    return [];
  },
  createCourse: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), ...data };
  },
  updateCourse: async (id: string, data: any) => {
    await mockDelay(200);
    return { id, ...data };
  },
  deleteCourse: async () => {
    await mockDelay(150);
    return { success: true };
  },

  getEnquiries: async () => {
    await mockDelay(100);
    return [];
  },
  createEnquiry: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), created_at: new Date().toISOString(), ...data };
  },
  deleteEnquiry: async () => {
    await mockDelay(150);
    return { success: true };
  },

  getActivePopup: async () => {
    await mockDelay(100);
    return null;
  },
  getPopups: async () => {
    await mockDelay(100);
    return [];
  },
  createPopup: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), ...data };
  },
  updatePopup: async (id: string, data: any) => {
    await mockDelay(200);
    return { id, ...data };
  },
  deletePopup: async () => {
    await mockDelay(150);
    return { success: true };
  },

  getGallery: async () => {
    await mockDelay(100);
    return [];
  },
  getGalleryByCategory: async () => {
    await mockDelay(100);
    return [];
  },
  createGalleryItem: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), ...data };
  },
  updateGalleryItem: async (id: string, data: any) => {
    await mockDelay(200);
    return { id, ...data };
  },
  deleteGalleryItem: async () => {
    await mockDelay(150);
    return { success: true };
  },

  getNotifications: async () => {
    await mockDelay(100);
    return [];
  },
  getUnreadNotifications: async () => {
    await mockDelay(100);
    return [];
  },
  getUnreadCount: async () => {
    await mockDelay(100);
    return 0;
  },
  markAsRead: async () => {
    await mockDelay(100);
    return { success: true };
  },
  markAllAsRead: async () => {
    await mockDelay(100);
    return { success: true };
  },
  deleteNotification: async () => {
    await mockDelay(100);
    return { success: true };
  },

  getTestimonials: async () => {
    await mockDelay(100);
    return [];
  },
  createTestimonial: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), ...data };
  },
  updateTestimonial: async (id: string, data: any) => {
    await mockDelay(200);
    return { id, ...data };
  },
  deleteTestimonial: async () => {
    await mockDelay(150);
    return { success: true };
  },

  login: async () => {
    await mockDelay(300);
    return { token: `frontend-demo-token-${Date.now()}` };
  },

  getAnnouncements: async () => {
    await mockDelay(100);
    return [];
  },
  createAnnouncement: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), created_at: new Date().toISOString(), ...data };
  },
  updateAnnouncement: async (id: string, data: any) => {
    await mockDelay(200);
    return { id, ...data };
  },
  deleteAnnouncement: async () => {
    await mockDelay(150);
    return { success: true };
  },

  getContacts: async () => {
    await mockDelay(100);
    return [];
  },
  createContact: async (data: any) => {
    await mockDelay(200);
    return { id: createMockId(), created_at: new Date().toISOString(), ...data };
  },
  deleteContact: async () => {
    await mockDelay(150);
    return { success: true };
  },
};
