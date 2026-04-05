const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2600/api/v1';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  token?: string;
}

async function fetchApi(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Get token from localStorage (client-side only)
function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || '';
  }
  return '';
}

// Auth APIs
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi('/auth/login', { method: 'POST', body: { email, password } }),
  
  register: (data: any) =>
    fetchApi('/auth/register', { method: 'POST', body: data }),
  
  me: () => {
    const token = getToken();
    return fetchApi('/auth/me', { token });
  },
};

// Treatments APIs
export const treatmentsApi = {
  getAll: async (params?: { search?: string; category?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/treatments?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/treatments/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/treatments', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/treatments/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/treatments/${id}`, { method: 'DELETE', token });
  },
  
  getCategories: async () => {
    try {
      const token = getToken();
      return await fetchApi('/treatments/categories', { token });
    } catch {
      return { data: [] };
    }
  },
  
  createCategory: async (data: any) => {
    const token = getToken();
    return fetchApi('/treatments/categories', { method: 'POST', body: data, token });
  },
  
  updateCategory: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/treatments/categories/${id}`, { method: 'PUT', body: data, token });
  },
  
  deleteCategory: async (id: string) => {
    const token = getToken();
    return fetchApi(`/treatments/categories/${id}`, { method: 'DELETE', token });
  },
};

// Appointments APIs
export const appointmentsApi = {
  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/appointments?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/appointments/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/appointments', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/appointments/${id}`, { method: 'PATCH', body: data, token });
  },
  
  getAvailableSlots: async (doctorId: string, date: string) => {
    try {
      return await fetchApi(`/appointments/slots/${doctorId}?date=${date}`);
    } catch {
      return { data: [] };
    }
  },
  
  getDoctorsByTreatment: async (treatmentId: string) => {
    try {
      return await fetchApi(`/appointments/doctors/${treatmentId}`);
    } catch {
      return { data: [] };
    }
  },
};

// Blog APIs
export const blogApi = {
  // Get all posts (for admin)
  getAll: async (params?: { search?: string; category?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/blog?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  // Get published posts (for website)
  getPublished: async (params?: { category?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/blog/published?${query}`);
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/blog/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  getBySlug: async (slug: string) => {
    try {
      return await fetchApi(`/blog/slug/${slug}`);
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/blog', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/blog/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/blog/${id}`, { method: 'DELETE', token });
  },
};

// Products APIs
export const productsApi = {
  getAll: async (params?: { category?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/products?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/products/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/products', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/products/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/products/${id}`, { method: 'DELETE', token });
  },
  
  getCategories: async () => {
    try {
      const token = getToken();
      return await fetchApi('/products/categories', { token });
    } catch {
      return [];
    }
  },
  
  getSuppliers: async () => {
    try {
      const token = getToken();
      return await fetchApi('/products/suppliers', { token });
    } catch {
      return [];
    }
  },
};

// Testimonials APIs
export const testimonialsApi = {
  getAll: async (params?: { search?: string; status?: string; featured?: boolean; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/testimonials?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getPublished: async () => {
    try {
      return await fetchApi('/testimonials/published');
    } catch {
      return { data: [] };
    }
  },
  
  getFeatured: async () => {
    try {
      return await fetchApi('/testimonials/featured');
    } catch {
      return { data: [] };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/testimonials/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/testimonials', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/testimonials/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/testimonials/${id}`, { method: 'DELETE', token });
  },
};

// FAQ APIs
export const faqApi = {
  getAll: async (params?: { search?: string; category?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/faq?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getPublished: async (category?: string) => {
    try {
      const query = category ? `?category=${category}` : '';
      return await fetchApi(`/faq/published${query}`);
    } catch {
      return { data: [] };
    }
  },
  
  getCategories: async () => {
    try {
      const token = getToken();
      return await fetchApi('/faq/categories', { token });
    } catch {
      return { data: [] };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/faq/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/faq', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/faq/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/faq/${id}`, { method: 'DELETE', token });
  },
};

// CMS APIs
export const cmsApi = {
  getSettings: async () => {
    try {
      const token = getToken();
      return await fetchApi('/cms/settings', { token });
    } catch {
      return {};
    }
  },
  
  updateSettings: async (data: any) => {
    const token = getToken();
    return fetchApi('/cms/settings', { method: 'PUT', body: data, token });
  },
};

// Staff/Doctors APIs
export const staffApi = {
  getAll: async (params?: { role?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/staff?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/staff/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/staff', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/staff/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/staff/${id}`, { method: 'DELETE', token });
  },
};

// Patients APIs
export const patientsApi = {
  getAll: async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/patients?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/patients/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/patients', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/patients/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/patients/${id}`, { method: 'DELETE', token });
  },
};

// Dashboard/Stats APIs
export const dashboardApi = {
  getStats: async () => {
    try {
      const token = getToken();
      return await fetchApi('/dashboard/stats', { token });
    } catch {
      return {
        totalPatients: 0,
        totalAppointments: 0,
        totalTreatments: 0,
        revenue: 0,
        recentAppointments: [],
        popularTreatments: [],
      };
    }
  },
  
  getChartData: async (period: string = 'month') => {
    try {
      const token = getToken();
      return await fetchApi(`/dashboard/charts?period=${period}`, { token });
    } catch {
      return { labels: [], data: [] };
    }
  },
};

// Media Library APIs
export const mediaApi = {
  getAll: async (params?: { type?: string; category?: string; search?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const token = getToken();
      return await fetchApi(`/media?${query}`, { token });
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/media/${id}`, { token });
    } catch {
      return null;
    }
  },
  
  create: async (data: any) => {
    const token = getToken();
    return fetchApi('/media', { method: 'POST', body: data, token });
  },
  
  addYouTube: async (data: { youtubeUrl: string; title?: string; category?: string }) => {
    const token = getToken();
    return fetchApi('/media/youtube', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any) => {
    const token = getToken();
    return fetchApi(`/media/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string) => {
    const token = getToken();
    return fetchApi(`/media/${id}`, { method: 'DELETE', token });
  },
  
  getCategories: async () => {
    try {
      return await fetchApi('/media/categories');
    } catch {
      return { data: [] };
    }
  },
  
  getTypes: async () => {
    try {
      return await fetchApi('/media/types');
    } catch {
      return { data: [] };
    }
  },
};

// Homepage CMS APIs
export const homepageApi = {
  getSettings: async () => {
    try {
      return await fetchApi('/homepage');
    } catch {
      return { data: { sections: [] } };
    }
  },
  
  getAdminSettings: async () => {
    try {
      const token = getToken();
      return await fetchApi('/homepage/admin', { token });
    } catch {
      return { data: {} };
    }
  },
  
  updateSettings: async (data: any) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Not authenticated. Please login again.');
      }
      const result = await fetchApi('/homepage', { method: 'PUT', body: data, token });
      console.log('Homepage settings saved:', result);
      return result;
    } catch (error: any) {
      console.error('Failed to save homepage settings:', error);
      throw new Error(error.message || 'Failed to save settings');
    }
  },
  
  updateHero: async (data: any) => {
    const token = getToken();
    return fetchApi('/homepage/hero', { method: 'PUT', body: data, token });
  },
  
  updateTrustBadges: async (data: any) => {
    const token = getToken();
    return fetchApi('/homepage/trust-badges', { method: 'PUT', body: data, token });
  },
  
  updateWhyChoose: async (data: any) => {
    const token = getToken();
    return fetchApi('/homepage/why-choose', { method: 'PUT', body: data, token });
  },
  
  updateGallery: async (data: any) => {
    const token = getToken();
    return fetchApi('/homepage/gallery', { method: 'PUT', body: data, token });
  },
  
  updateNewsletter: async (data: any) => {
    const token = getToken();
    return fetchApi('/homepage/newsletter', { method: 'PUT', body: data, token });
  },
  
  updateCTA: async (data: any) => {
    const token = getToken();
    return fetchApi('/homepage/cta', { method: 'PUT', body: data, token });
  },
  
  updateSectionOrder: async (sections: { id: string; order: number; enabled: boolean }[]) => {
    const token = getToken();
    return fetchApi('/homepage/section-order', { method: 'PUT', body: { sections }, token });
  },
};

// Social Integration APIs
export const socialApi = {
  getGoogleReviews: async () => {
    try {
      return await fetchApi('/social/reviews/google');
    } catch {
      return { data: { enabled: false, reviews: [] } };
    }
  },
  
  getInstagramFeed: async () => {
    try {
      return await fetchApi('/social/instagram/feed');
    } catch {
      return { data: { enabled: false, posts: [] } };
    }
  },
  
  getSettings: async () => {
    try {
      const token = getToken();
      return await fetchApi('/social/admin/settings', { token });
    } catch {
      return { data: {} };
    }
  },
  
  updateSettings: async (data: any) => {
    const token = getToken();
    return fetchApi('/social/admin/settings', { method: 'PUT', body: data, token });
  },
};

// Theme / Branding
export const themeApi = {
  getSettings: async () => {
    try {
      const token = getToken();
      return await fetchApi('/theme/admin', { token });
    } catch {
      return { data: null };
    }
  },

  updateSettings: async (data: any) => {
    const token = getToken();
    return fetchApi('/theme', { method: 'PUT', body: data, token });
  },
};

// Pages CMS (Page Builder)
export const pagesApi = {
  getPage: async (slug: string) => {
    try {
      const token = getToken();
      return await fetchApi(`/pages/${slug}/admin`, { token });
    } catch {
      return { data: null };
    }
  },

  updatePage: async (slug: string, data: any) => {
    const token = getToken();
    return fetchApi(`/pages/${slug}`, { method: 'PUT', body: data, token });
  },

  getSectionTypes: async () => {
    try {
      return await fetchApi('/pages/section-types');
    } catch {
      return { data: [] };
    }
  },
};
