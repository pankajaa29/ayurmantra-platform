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

// Auth APIs
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi('/auth/login', { method: 'POST', body: { email, password } }),
  
  register: (data: any) =>
    fetchApi('/auth/register', { method: 'POST', body: data }),
  
  me: (token: string) =>
    fetchApi('/auth/me', { token }),
};

// Treatments APIs
export const treatmentsApi = {
  getAll: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/treatments?${query}`);
    } catch {
      return { data: [] };
    }
  },
  
  getBySlug: async (slug: string) => {
    try {
      return await fetchApi(`/treatments/slug/${slug}`);
    } catch {
      return null;
    }
  },
  
  getFeatured: async () => {
    try {
      return await fetchApi('/treatments/featured');
    } catch {
      return [];
    }
  },
  
  getCategories: async () => {
    try {
      return await fetchApi('/treatments/categories');
    } catch {
      return [];
    }
  },
};

// Appointments APIs
export const appointmentsApi = {
  getAll: async (token: string, params?: any) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/appointments?${query}`, { token });
    } catch {
      return { data: [] };
    }
  },
  
  create: async (data: any, token?: string) => {
    try {
      return await fetchApi('/appointments', { method: 'POST', body: data, token });
    } catch {
      throw new Error('Failed to create appointment');
    }
  },
  
  update: async (id: string, data: any, token: string) => {
    try {
      return await fetchApi(`/appointments/${id}`, { method: 'PATCH', body: data, token });
    } catch {
      throw new Error('Failed to update appointment');
    }
  },
  
  getAvailableSlots: async (doctorId: string, date: string) => {
    try {
      return await fetchApi(`/appointments/slots/${doctorId}?date=${date}`);
    } catch {
      return [];
    }
  },
  
  getDoctorsByTreatment: async (treatmentId: string) => {
    try {
      return await fetchApi(`/appointments/doctors/${treatmentId}`);
    } catch {
      return [];
    }
  },
};

// Products APIs
export const productsApi = {
  getAll: async (params?: { category?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/products?${query}`);
    } catch {
      return { data: [] };
    }
  },
  
  getBySlug: async (slug: string) => {
    try {
      return await fetchApi(`/products/slug/${slug}`);
    } catch {
      return null;
    }
  },
  
  getCategories: async () => {
    try {
      return await fetchApi('/products/categories');
    } catch {
      return [];
    }
  },
};

// CMS APIs
export const cmsApi = {
  getPage: async (slug: string) => {
    try {
      return await fetchApi(`/cms/pages/${slug}`);
    } catch {
      return null;
    }
  },
  
  getSettings: async () => {
    try {
      return await fetchApi('/cms/settings');
    } catch {
      return {};
    }
  },
};

// Blog APIs
export const blogApi = {
  // Get all published posts (for website)
  getPublished: async (params?: { category?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/blog/published?${query}`);
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  // Get all posts (for admin)
  getAll: async (params?: { search?: string; category?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/blog?${query}`);
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      return await fetchApi(`/blog/${id}`);
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
  
  create: async (data: any, token: string) => {
    return fetchApi('/blog', { method: 'POST', body: data, token });
  },
  
  update: async (id: string, data: any, token: string) => {
    return fetchApi(`/blog/${id}`, { method: 'PUT', body: data, token });
  },
  
  delete: async (id: string, token: string) => {
    return fetchApi(`/blog/${id}`, { method: 'DELETE', token });
  },
};

// Staff/Doctors APIs
export const staffApi = {
  getDoctors: async () => {
    try {
      return await fetchApi('/staff/doctors');
    } catch {
      return { data: [] };
    }
  },
  
  getAll: async (params?: { role?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/staff?${query}`);
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      return await fetchApi(`/staff/${id}`);
    } catch {
      return null;
    }
  },
};

// Testimonials APIs
export const testimonialsApi = {
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
  
  getAll: async (params?: { page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/testimonials?${query}`);
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }
  },
};

// FAQ APIs
export const faqApi = {
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
      return await fetchApi('/faq/categories');
    } catch {
      return { data: [] };
    }
  },
};

// Homepage CMS APIs
export const homepageApi = {
  getSettings: async () => {
    try {
      // Add cache-busting query param and explicit no-cache headers for fresh data
      const timestamp = Date.now();
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2600/api/v1';
      const response = await fetch(`${API_URL}/homepage?_t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch homepage settings');
      }
      
      return await response.json();
    } catch (error) {
      console.error('homepageApi.getSettings error:', error);
      return { data: { sections: [] } };
    }
  },
};

// Media Library APIs
export const mediaApi = {
  getAll: async (params?: { type?: string; category?: string; page?: number; limit?: number }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      return await fetchApi(`/media?${query}`);
    } catch {
      return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0 } };
    }
  },
  
  getById: async (id: string) => {
    try {
      return await fetchApi(`/media/${id}`);
    } catch {
      return null;
    }
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
};
