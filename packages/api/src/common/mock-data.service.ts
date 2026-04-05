import { Injectable } from '@nestjs/common';

@Injectable()
export class MockDataService {
  private treatments = [
    {
      id: '1',
      slug: 'panchakarma-detox',
      name: 'Panchakarma Detox',
      description: 'Complete Ayurvedic detoxification and rejuvenation therapy',
      category: 'Detox',
      categoryId: '1',
      duration: 120,
      price: 5000,
      discountedPrice: 4500,
      status: 'active',
      rating: 4.9,
      reviews: 328,
      bookings: 156,
      benefits: [
        'Complete body detoxification',
        'Improved digestion',
        'Enhanced immunity',
        'Stress relief',
      ],
      process: [
        { step: 1, title: 'Consultation', description: 'Detailed health assessment' },
        { step: 2, title: 'Preparation', description: 'Internal and external oleation' },
        { step: 3, title: 'Main Treatment', description: 'Five purificatory procedures' },
        { step: 4, title: 'Rasayana', description: 'Rejuvenation therapy' },
      ],
      includes: [
        'Daily doctor consultation',
        'All Ayurvedic medicines',
        'Therapeutic treatments',
        'Special diet meals',
      ],
      images: ['/images/treatments/panchakarma-1.jpg'],
      createdAt: '2026-01-15T10:00:00Z',
      updatedAt: '2026-03-10T14:30:00Z',
    },
    {
      id: '2',
      slug: 'abhyanga-massage',
      name: 'Abhyanga Massage',
      description: 'Traditional full body oil massage with herbal oils',
      category: 'Massage',
      categoryId: '2',
      duration: 60,
      price: 1500,
      discountedPrice: null,
      status: 'active',
      rating: 4.8,
      reviews: 892,
      bookings: 234,
      benefits: [
        'Improved blood circulation',
        'Muscle relaxation',
        'Better sleep quality',
        'Skin nourishment',
      ],
      process: [
        { step: 1, title: 'Oil Selection', description: 'Customized herbal oil selection' },
        { step: 2, title: 'Full Body Massage', description: 'Synchronized massage by two therapists' },
        { step: 3, title: 'Steam Therapy', description: 'Herbal steam for oil absorption' },
      ],
      includes: ['Herbal massage oil', 'Steam therapy', 'Shower facilities'],
      images: ['/images/treatments/abhyanga-1.jpg'],
      createdAt: '2026-01-20T11:00:00Z',
      updatedAt: '2026-03-05T16:00:00Z',
    },
    {
      id: '3',
      slug: 'shirodhara-therapy',
      name: 'Shirodhara Therapy',
      description: 'Oil pouring therapy for stress relief and mental clarity',
      category: 'Therapy',
      categoryId: '3',
      duration: 45,
      price: 1200,
      discountedPrice: 1000,
      status: 'active',
      rating: 4.9,
      reviews: 534,
      bookings: 189,
      benefits: [
        'Deep mental relaxation',
        'Anxiety relief',
        'Better sleep',
        'Improved concentration',
      ],
      process: [
        { step: 1, title: 'Preparation', description: 'Head massage with herbal oil' },
        { step: 2, title: 'Shirodhara', description: 'Continuous oil stream on forehead' },
        { step: 3, title: 'Rest', description: 'Relaxation period' },
      ],
      includes: ['Specialized oil', 'Head massage', 'Relaxation room'],
      images: ['/images/treatments/shirodhara-1.jpg'],
      createdAt: '2026-02-01T09:00:00Z',
      updatedAt: '2026-03-08T12:00:00Z',
    },
    {
      id: '4',
      slug: 'ayurvedic-facial',
      name: 'Ayurvedic Facial',
      description: 'Natural facial using herbal ingredients',
      category: 'Beauty',
      categoryId: '4',
      duration: 60,
      price: 1800,
      discountedPrice: null,
      status: 'inactive',
      rating: 4.7,
      reviews: 298,
      bookings: 98,
      benefits: [
        'Glowing skin',
        'Reduced acne',
        'Anti-aging effects',
        'Natural radiance',
      ],
      process: [
        { step: 1, title: 'Cleansing', description: 'Herbal cleanser application' },
        { step: 2, title: 'Scrub', description: 'Natural exfoliation' },
        { step: 3, title: 'Face Pack', description: 'Herbal mask application' },
      ],
      includes: ['Herbal products', 'Face massage', 'Steam'],
      images: ['/images/treatments/facial-1.jpg'],
      createdAt: '2026-02-10T10:30:00Z',
      updatedAt: '2026-02-28T15:00:00Z',
    },
    {
      id: '5',
      slug: 'stress-management-package',
      name: 'Stress Management Package',
      description: 'Comprehensive stress relief program',
      category: 'Wellness',
      categoryId: '5',
      duration: 90,
      price: 2500,
      discountedPrice: 2200,
      status: 'active',
      rating: 4.8,
      reviews: 445,
      bookings: 145,
      benefits: [
        'Stress reduction',
        'Mental clarity',
        'Emotional balance',
        'Better focus',
      ],
      process: [
        { step: 1, title: 'Assessment', description: 'Stress level evaluation' },
        { step: 2, title: 'Therapy', description: 'Shirodhara and massage' },
        { step: 3, title: 'Counseling', description: 'Lifestyle guidance' },
      ],
      includes: ['Therapies', 'Counseling', 'Diet plan', 'Yoga session'],
      images: ['/images/treatments/stress-1.jpg'],
      createdAt: '2026-02-15T14:00:00Z',
      updatedAt: '2026-03-12T10:00:00Z',
    },
  ];

  private categories = [
    { id: '1', name: 'Detox', description: 'Body cleansing therapies', sortOrder: 1 },
    { id: '2', name: 'Massage', description: 'Therapeutic massage treatments', sortOrder: 2 },
    { id: '3', name: 'Therapy', description: 'Specialized Ayurvedic therapies', sortOrder: 3 },
    { id: '4', name: 'Beauty', description: 'Natural beauty treatments', sortOrder: 4 },
    { id: '5', name: 'Wellness', description: 'Holistic wellness packages', sortOrder: 5 },
    { id: '6', name: 'Panchakarma', description: 'Five-fold detoxification', sortOrder: 6 },
  ];

  getMockTreatments() {
    return this.treatments;
  }

  getMockCategories() {
    return this.categories;
  }

  getMockTreatmentById(id: string) {
    return this.treatments.find(t => t.id === id);
  }

  // Additional methods for services
  getAllTreatments(query?: any) {
    let result = [...this.treatments];
    if (query?.status) {
      result = result.filter(t => t.status === query.status);
    }
    if (query?.category) {
      result = result.filter(t => t.category?.toLowerCase() === query.category.toLowerCase());
    }
    return result;
  }

  getTreatmentById(id: string) {
    return this.treatments.find(t => t.id === id);
  }

  getTreatmentBySlug(slug: string) {
    return this.treatments.find(t => t.slug === slug || t.id === slug);
  }

  getCategories() {
    return this.categories;
  }

  getFeaturedTreatments() {
    return this.treatments.filter(t => t.rating >= 4.8).slice(0, 4);
  }

  // Appointments methods
  getAvailableSlots(doctorId: string, date: string) {
    // Return mock available time slots
    return [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
      '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
    ];
  }

  getDoctorsByTreatment(treatmentId: string) {
    // Return mock doctors for treatment
    return [
      { id: '1', name: 'Dr. Rajesh Sharma', specialization: 'Panchakarma' },
      { id: '2', name: 'Dr. Priya Patel', specialization: 'Wellness' },
    ];
  }

  addMockTreatment(treatment: any) {
    this.treatments.push(treatment);
    return treatment;
  }

  updateMockTreatment(id: string, updates: any) {
    const index = this.treatments.findIndex(t => t.id === id);
    if (index !== -1) {
      this.treatments[index] = { ...this.treatments[index], ...updates };
      return this.treatments[index];
    }
    return null;
  }

  deleteMockTreatment(id: string) {
    const index = this.treatments.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.treatments.splice(index, 1)[0];
    }
    return null;
  }

  // Blog Posts Mock Data
  private blogPosts = [
    {
      id: '1',
      title: 'The Complete Guide to Panchakarma: Detoxify Your Body Naturally',
      slug: 'complete-guide-to-panchakarma',
      excerpt: 'Discover the ancient Ayurvedic detoxification process that cleanses your body, balances your doshas, and rejuvenates your entire system.',
      content: 'Panchakarma is Ayurveda\'s premier detoxification and rejuvenation therapy...',
      featuredImage: null,
      category: 'Treatments',
      tags: ['Panchakarma', 'Detox', 'Ayurveda', 'Wellness'],
      status: 'PUBLISHED',
      featured: true,
      authorId: '1',
      authorName: 'Dr. Rajesh Sharma',
      authorRole: 'Chief Ayurvedic Physician',
      publishedAt: '2026-03-10T10:00:00Z',
      createdAt: '2026-03-08T14:00:00Z',
      updatedAt: '2026-03-10T10:00:00Z',
      readTime: '8 min read',
      views: 1250,
    },
    {
      id: '2',
      title: 'Understanding Your Dosha: Vata, Pitta, and Kapha Explained',
      slug: 'understanding-your-dosha',
      excerpt: 'Every person has a unique constitutional type. Learn how to identify your dominant dosha and customize your diet, lifestyle, and treatments.',
      content: 'According to Ayurveda, the five elements combine to form three fundamental energies...',
      featuredImage: null,
      category: 'Education',
      tags: ['Dosha', 'Prakriti', 'Vata', 'Pitta', 'Kapha'],
      status: 'PUBLISHED',
      featured: true,
      authorId: '2',
      authorName: 'Dr. Priya Patel',
      authorRole: 'Ayurvedic Consultant',
      publishedAt: '2026-03-08T12:00:00Z',
      createdAt: '2026-03-06T10:00:00Z',
      updatedAt: '2026-03-08T12:00:00Z',
      readTime: '6 min read',
      views: 980,
    },
    {
      id: '3',
      title: '10 Ayurvedic Herbs for Boosting Immunity Naturally',
      slug: 'ayurvedic-herbs-for-immunity',
      excerpt: 'Strengthen your immune system with these powerful Ayurvedic herbs. From Ashwagandha to Tulsi, discover nature\'s pharmacy.',
      content: 'Ayurveda offers a treasure trove of immune-boosting herbs...',
      featuredImage: null,
      category: 'Wellness',
      tags: ['Immunity', 'Herbs', 'Ashwagandha', 'Tulsi'],
      status: 'PUBLISHED',
      featured: false,
      authorId: '3',
      authorName: 'Dr. Ananya Iyer',
      authorRole: 'Wellness Expert',
      publishedAt: '2026-03-05T09:00:00Z',
      createdAt: '2026-03-03T11:00:00Z',
      updatedAt: '2026-03-05T09:00:00Z',
      readTime: '5 min read',
      views: 750,
    },
    {
      id: '4',
      title: 'Ayurvedic Diet Tips for Winter: Stay Warm and Healthy',
      slug: 'ayurvedic-diet-winter',
      excerpt: 'Winter is the season of Vata. Learn what to eat, what to avoid, and how to maintain your digestive fire during the cold months.',
      content: 'Winter season brings with it the qualities of Vata dosha...',
      featuredImage: null,
      category: 'Nutrition',
      tags: ['Winter', 'Diet', 'Vata', 'Seasonal'],
      status: 'PUBLISHED',
      featured: false,
      authorId: '1',
      authorName: 'Dr. Rajesh Sharma',
      authorRole: 'Chief Ayurvedic Physician',
      publishedAt: '2026-03-01T08:00:00Z',
      createdAt: '2026-02-28T10:00:00Z',
      updatedAt: '2026-03-01T08:00:00Z',
      readTime: '4 min read',
      views: 620,
    },
    {
      id: '5',
      title: 'Managing Stress with Ayurveda: Techniques That Actually Work',
      slug: 'managing-stress-with-ayurveda',
      excerpt: 'Modern life is stressful. Discover time-tested Ayurvedic techniques including Shirodhara, meditation, and herbal remedies.',
      content: 'In today\'s fast-paced world, stress has become a common companion...',
      featuredImage: null,
      category: 'Wellness',
      tags: ['Stress', 'Shirodhara', 'Meditation', 'Mental Health'],
      status: 'DRAFT',
      featured: false,
      authorId: '2',
      authorName: 'Dr. Priya Patel',
      authorRole: 'Ayurvedic Consultant',
      publishedAt: null,
      createdAt: '2026-03-11T15:00:00Z',
      updatedAt: '2026-03-11T15:00:00Z',
      readTime: '7 min read',
      views: 0,
    },
  ];

  async getBlogPosts() {
    return this.blogPosts;
  }

  async getBlogPostById(id: string) {
    return this.blogPosts.find(p => p.id === id);
  }

  async getBlogPostBySlug(slug: string) {
    return this.blogPosts.find(p => p.slug === slug);
  }

  async createBlogPost(data: any) {
    const newPost = {
      id: (this.blogPosts.length + 1).toString(),
      ...data,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.blogPosts.push(newPost);
    return newPost;
  }

  async updateBlogPost(id: string, data: any) {
    const index = this.blogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.blogPosts[index] = { 
        ...this.blogPosts[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return this.blogPosts[index];
    }
    return null;
  }

  async deleteBlogPost(id: string) {
    const index = this.blogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      return this.blogPosts.splice(index, 1)[0];
    }
    return null;
  }

  // Staff Mock Data
  private staff = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      email: 'rajesh@ayurmantra.com',
      phone: '+91 98765 43210',
      role: 'DOCTOR',
      department: 'Medical',
      specialization: 'Panchakarma Specialist',
      qualification: 'BAMS, MD (Ayurveda)',
      experience: '20+ years',
      bio: 'Dr. Rajesh Sharma is a renowned Ayurvedic physician with expertise in Panchakarma therapies and chronic disease management.',
      avatar: null,
      status: 'active',
      joinDate: '2020-01-15',
      rating: 4.9,
      reviews: 328,
      patients: 15000,
      createdAt: '2020-01-15T10:00:00Z',
      updatedAt: '2026-03-10T14:30:00Z',
    },
    {
      id: '2',
      name: 'Dr. Priya Patel',
      email: 'priya@ayurmantra.com',
      phone: '+91 98765 43211',
      role: 'DOCTOR',
      department: 'Medical',
      specialization: 'Women\'s Health & Wellness',
      qualification: 'BAMS, PGDHHM',
      experience: '15+ years',
      bio: 'Dr. Priya Patel specializes in women\'s health, hormonal balance, and prenatal care.',
      avatar: null,
      status: 'active',
      joinDate: '2021-03-20',
      rating: 4.9,
      reviews: 256,
      patients: 8900,
      createdAt: '2021-03-20T10:00:00Z',
      updatedAt: '2026-03-08T12:00:00Z',
    },
    {
      id: '3',
      name: 'Dr. Ananya Iyer',
      email: 'ananya@ayurmantra.com',
      phone: '+91 98765 43212',
      role: 'DOCTOR',
      department: 'Medical',
      specialization: 'Stress Management & Yoga Therapy',
      qualification: 'BAMS, M.Sc Yoga',
      experience: '12+ years',
      bio: 'Dr. Ananya Iyer is a certified yoga therapist who integrates Ayurvedic treatments with yoga and meditation.',
      avatar: null,
      status: 'active',
      joinDate: '2021-08-12',
      rating: 4.8,
      reviews: 189,
      patients: 6200,
      createdAt: '2021-08-12T10:00:00Z',
      updatedAt: '2026-03-05T09:00:00Z',
    },
    {
      id: '4',
      name: 'Dr. Vikram Mehta',
      email: 'vikram@ayurmantra.com',
      phone: '+91 98765 43213',
      role: 'DOCTOR',
      department: 'Medical',
      specialization: 'Herbal Medicine & Nutrition',
      qualification: 'BAMS, Ph.D Herbal Medicine',
      experience: '18+ years',
      bio: 'Dr. Vikram Mehta is an expert in medicinal herbs and Ayurvedic nutrition.',
      avatar: null,
      status: 'active',
      joinDate: '2019-06-10',
      rating: 4.9,
      reviews: 412,
      patients: 11000,
      createdAt: '2019-06-10T10:00:00Z',
      updatedAt: '2026-03-01T08:00:00Z',
    },
    {
      id: '5',
      name: 'Ankit Kumar',
      email: 'ankit@ayurmantra.com',
      phone: '+91 98765 43214',
      role: 'ADMIN',
      department: 'Administration',
      specialization: null,
      qualification: 'MBA Healthcare Management',
      experience: '8+ years',
      bio: 'Ankit manages the administrative operations of AyurMantra.',
      avatar: null,
      status: 'active',
      joinDate: '2019-06-10',
      createdAt: '2019-06-10T10:00:00Z',
      updatedAt: '2026-02-15T10:00:00Z',
    },
    {
      id: '6',
      name: 'Meera Singh',
      email: 'meera@ayurmantra.com',
      phone: '+91 98765 43215',
      role: 'RECEPTIONIST',
      department: 'Front Desk',
      specialization: null,
      qualification: 'Bachelor in Hospitality',
      experience: '5+ years',
      bio: 'Meera manages patient appointments and front desk operations.',
      avatar: null,
      status: 'active',
      joinDate: '2022-01-05',
      createdAt: '2022-01-05T10:00:00Z',
      updatedAt: '2026-01-20T10:00:00Z',
    },
  ];

  async getStaff() {
    return this.staff;
  }

  async getStaffById(id: string) {
    return this.staff.find(s => s.id === id);
  }

  async createStaff(data: any) {
    const newStaff = {
      id: (this.staff.length + 1).toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.staff.push(newStaff);
    return newStaff;
  }

  async updateStaff(id: string, data: any) {
    const index = this.staff.findIndex(s => s.id === id);
    if (index !== -1) {
      this.staff[index] = { 
        ...this.staff[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return this.staff[index];
    }
    return null;
  }

  async deleteStaff(id: string) {
    const index = this.staff.findIndex(s => s.id === id);
    if (index !== -1) {
      return this.staff.splice(index, 1)[0];
    }
    return null;
  }

  // Testimonials Mock Data
  private testimonials = [
    {
      id: '1',
      patientName: 'Priya Sharma',
      location: 'Mumbai',
      age: 35,
      rating: 5,
      treatment: 'Panchakarma Detox',
      doctorName: 'Dr. Rajesh Sharma',
      content: 'Life-changing experience! I came to AyurMantra with chronic digestive issues and stress. The 14-day Panchakarma program completely transformed my health.',
      avatar: null,
      status: 'PUBLISHED',
      featured: true,
      hasBeforeAfter: true,
      views: 1250,
      createdAt: '2026-03-10T10:00:00Z',
      updatedAt: '2026-03-10T10:00:00Z',
    },
    {
      id: '2',
      patientName: 'Rahul Mehta',
      location: 'Bangalore',
      age: 42,
      rating: 5,
      treatment: 'Stress Management Program',
      doctorName: 'Dr. Ananya Iyer',
      content: 'Best stress relief ever! As a software engineer, I was dealing with severe anxiety. The Shirodhara therapy worked wonders.',
      avatar: null,
      status: 'PUBLISHED',
      featured: true,
      hasBeforeAfter: false,
      views: 980,
      createdAt: '2026-03-08T12:00:00Z',
      updatedAt: '2026-03-08T12:00:00Z',
    },
    {
      id: '3',
      patientName: 'Anita Patel',
      location: 'Delhi',
      age: 28,
      rating: 5,
      treatment: 'Ayurvedic Facial & Skin Care',
      doctorName: 'Dr. Priya Patel',
      content: 'My skin has never looked better! I have been coming to AyurMantra for 6 months. The results are amazing.',
      avatar: null,
      status: 'PUBLISHED',
      featured: false,
      hasBeforeAfter: true,
      views: 750,
      createdAt: '2026-03-05T09:00:00Z',
      updatedAt: '2026-03-05T09:00:00Z',
    },
    {
      id: '4',
      patientName: 'Suresh Kumar',
      location: 'Chennai',
      age: 55,
      rating: 5,
      treatment: 'Diabetes Management',
      doctorName: 'Dr. Rajesh Sharma',
      content: 'Natural diabetes control! After 5 years of struggling, Dr. Sharma personalized a treatment plan that reduced my HbA1c from 9.2 to 6.8.',
      avatar: null,
      status: 'PUBLISHED',
      featured: false,
      hasBeforeAfter: false,
      views: 620,
      createdAt: '2026-03-01T08:00:00Z',
      updatedAt: '2026-03-01T08:00:00Z',
    },
    {
      id: '5',
      patientName: 'Meera Iyer',
      location: 'Kochi',
      age: 32,
      rating: 5,
      treatment: 'Post-Pregnancy Care',
      doctorName: 'Dr. Priya Patel',
      content: 'Excellent postnatal care! The traditional massage therapies helped me recover quickly.',
      avatar: null,
      status: 'PUBLISHED',
      featured: false,
      hasBeforeAfter: true,
      views: 540,
      createdAt: '2026-02-28T10:00:00Z',
      updatedAt: '2026-02-28T10:00:00Z',
    },
    {
      id: '6',
      patientName: 'Arjun Nair',
      location: 'Hyderabad',
      age: 48,
      rating: 5,
      treatment: 'Joint Pain Treatment',
      doctorName: 'Dr. Vikram Mehta',
      content: 'Finally pain-free! After years of knee pain, I found relief at AyurMantra. The Janu Basti treatment reduced my pain by 90%.',
      avatar: null,
      status: 'PUBLISHED',
      featured: true,
      hasBeforeAfter: true,
      views: 890,
      createdAt: '2026-02-25T09:00:00Z',
      updatedAt: '2026-02-25T09:00:00Z',
    },
  ];

  async getTestimonials() {
    return this.testimonials;
  }

  async getTestimonialById(id: string) {
    return this.testimonials.find(t => t.id === id);
  }

  async createTestimonial(data: any) {
    const newTestimonial = {
      id: (this.testimonials.length + 1).toString(),
      ...data,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, data: any) {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.testimonials[index] = { 
        ...this.testimonials[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return this.testimonials[index];
    }
    return null;
  }

  async deleteTestimonial(id: string) {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.testimonials.splice(index, 1)[0];
    }
    return null;
  }

  // FAQ Mock Data
  private faqs = [
    {
      id: '1',
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment through our website, patient portal, or by calling us directly at +91 800-123-4567. Online booking is available 24/7.',
      category: 'General',
      order: 1,
      status: 'PUBLISHED',
      createdAt: '2026-01-15T10:00:00Z',
      updatedAt: '2026-03-10T14:30:00Z',
    },
    {
      id: '2',
      question: 'Do you offer online consultations?',
      answer: 'Yes, we offer video consultations for follow-up visits and minor concerns. Initial consultations for complex conditions are recommended in-person.',
      category: 'General',
      order: 2,
      status: 'PUBLISHED',
      createdAt: '2026-01-20T11:00:00Z',
      updatedAt: '2026-03-05T16:00:00Z',
    },
    {
      id: '3',
      question: 'What should I bring for my first visit?',
      answer: 'Please bring any previous medical reports, current medications list, and arrive 15 minutes early for registration.',
      category: 'General',
      order: 3,
      status: 'PUBLISHED',
      createdAt: '2026-02-01T09:00:00Z',
      updatedAt: '2026-03-08T12:00:00Z',
    },
    {
      id: '4',
      question: 'Is there parking available?',
      answer: 'Yes, we have complimentary parking for all our patients and visitors.',
      category: 'General',
      order: 4,
      status: 'PUBLISHED',
      createdAt: '2026-02-10T10:30:00Z',
      updatedAt: '2026-02-28T15:00:00Z',
    },
    {
      id: '5',
      question: 'What is Panchakarma?',
      answer: 'Panchakarma is Ayurveda\'s premier detoxification and rejuvenation therapy. It consists of five therapeutic procedures designed to eliminate toxins from the body.',
      category: 'Treatments',
      order: 1,
      status: 'PUBLISHED',
      createdAt: '2026-02-15T14:00:00Z',
      updatedAt: '2026-03-12T10:00:00Z',
    },
    {
      id: '6',
      question: 'How long does a typical treatment take?',
      answer: 'Treatment duration varies. Massages typically take 60-90 minutes, while Panchakarma programs range from 7-21 days depending on your condition.',
      category: 'Treatments',
      order: 2,
      status: 'PUBLISHED',
      createdAt: '2026-02-20T09:00:00Z',
      updatedAt: '2026-03-10T10:00:00Z',
    },
    {
      id: '7',
      question: 'Are your doctors certified?',
      answer: 'Yes, all our doctors are AYUSH certified with extensive clinical experience. Many hold additional certifications in specialized Ayurvedic treatments.',
      category: 'Doctors',
      order: 1,
      status: 'PUBLISHED',
      createdAt: '2026-02-25T10:00:00Z',
      updatedAt: '2026-03-05T09:00:00Z',
    },
    {
      id: '8',
      question: 'What is your cancellation policy?',
      answer: 'We require 24-hour notice for cancellations. Late cancellations may incur a fee of 50% of the treatment cost.',
      category: 'Appointments',
      order: 1,
      status: 'PUBLISHED',
      createdAt: '2026-03-01T08:00:00Z',
      updatedAt: '2026-03-01T08:00:00Z',
    },
  ];

  async getFAQs() {
    return this.faqs;
  }

  async getFAQById(id: string) {
    return this.faqs.find(f => f.id === id);
  }

  async createFAQ(data: any) {
    const newFAQ = {
      id: (this.faqs.length + 1).toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.faqs.push(newFAQ);
    return newFAQ;
  }

  async updateFAQ(id: string, data: any) {
    const index = this.faqs.findIndex(f => f.id === id);
    if (index !== -1) {
      this.faqs[index] = { 
        ...this.faqs[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return this.faqs[index];
    }
    return null;
  }

  async deleteFAQ(id: string) {
    const index = this.faqs.findIndex(f => f.id === id);
    if (index !== -1) {
      return this.faqs.splice(index, 1)[0];
    }
    return null;
  }

  // ============================================
  // MEDIA LIBRARY
  // ============================================
  private media = [
    {
      id: 'm1',
      title: 'Hero Background',
      description: 'Main homepage hero banner image',
      altText: 'AyurMantra Ayurvedic healing center',
      type: 'IMAGE',
      category: 'HERO',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300',
      externalId: null,
      metadata: { width: 1920, height: 1080 },
      createdAt: '2026-03-01T10:00:00Z',
      updatedAt: '2026-03-01T10:00:00Z',
    },
    {
      id: 'm2',
      title: 'Treatment Room',
      description: 'Luxurious treatment room setup',
      altText: 'Ayurvedic treatment room at AyurMantra',
      type: 'IMAGE',
      category: 'TREATMENT',
      url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300',
      externalId: null,
      metadata: { width: 1920, height: 1280 },
      createdAt: '2026-03-02T11:00:00Z',
      updatedAt: '2026-03-02T11:00:00Z',
    },
    {
      id: 'm3',
      title: 'Shirodhara Therapy',
      description: 'Shirodhara oil pouring therapy',
      altText: 'Shirodhara therapy session',
      type: 'IMAGE',
      category: 'TREATMENT',
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920',
      thumbnailUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300',
      externalId: null,
      metadata: { width: 1920, height: 1280 },
      createdAt: '2026-03-03T12:00:00Z',
      updatedAt: '2026-03-03T12:00:00Z',
    },
    {
      id: 'm4',
      title: 'Introduction to AyurMantra',
      description: 'Welcome video about our center',
      altText: 'AyurMantra introduction video',
      type: 'YOUTUBE',
      category: 'GENERAL',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      externalId: 'dQw4w9WgXcQ',
      metadata: { originalUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
      createdAt: '2026-03-04T09:00:00Z',
      updatedAt: '2026-03-04T09:00:00Z',
    },
    {
      id: 'm5',
      title: 'Herbal Products Display',
      description: 'Our herbal medicine collection',
      altText: 'Ayurvedic herbal products',
      type: 'IMAGE',
      category: 'GENERAL',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920',
      thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300',
      externalId: null,
      metadata: { width: 1920, height: 1280 },
      createdAt: '2026-03-05T14:00:00Z',
      updatedAt: '2026-03-05T14:00:00Z',
    },
    {
      id: 'm6',
      title: 'Wellness Testimonial',
      description: 'Patient testimonial video',
      altText: 'Patient testimonial video',
      type: 'YOUTUBE',
      category: 'TESTIMONIAL',
      url: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      thumbnailUrl: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
      externalId: 'ScMzIvxBSi4',
      metadata: { originalUrl: 'https://youtube.com/watch?v=ScMzIvxBSi4' },
      createdAt: '2026-03-06T10:00:00Z',
      updatedAt: '2026-03-06T10:00:00Z',
    },
  ];

  async getMedia() {
    return this.media;
  }

  async getMediaById(id: string) {
    return this.media.find(m => m.id === id);
  }

  async createMedia(data: any) {
    const newMedia = {
      id: `m${this.media.length + 1}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.media.push(newMedia);
    return newMedia;
  }

  async updateMedia(id: string, data: any) {
    const index = this.media.findIndex(m => m.id === id);
    if (index !== -1) {
      this.media[index] = { 
        ...this.media[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return this.media[index];
    }
    return null;
  }

  async deleteMedia(id: string) {
    const index = this.media.findIndex(m => m.id === id);
    if (index !== -1) {
      return this.media.splice(index, 1)[0];
    }
    return null;
  }

  // ============================================
  // HOMEPAGE CMS SETTINGS
  // ============================================
  private homepageSettings = {
    hero: {
      title: 'Heal Naturally, Live Fully',
      subtitle: 'Experience the ancient wisdom of Ayurveda with personalized treatments, authentic herbal remedies, and holistic wellness programs tailored just for you.',
      badgeText: 'Trusted by 15,000+ patients',
      primaryCtaText: 'Book Consultation',
      primaryCtaLink: '/book-appointment',
      secondaryCtaText: 'Explore Treatments',
      secondaryCtaLink: '/treatments',
      backgroundImage: 'm1',
      enabled: true,
    },
    trustBadges: {
      stats: [
        { icon: 'users', value: '15,000+', label: 'Happy Patients', color: '#0D9488' },
        { icon: 'star', value: '4.9', label: 'Average Rating', color: '#D97706' },
        { icon: 'award', value: '25+', label: 'Years Experience', color: '#0D9488' },
        { icon: 'shield', value: '100%', label: 'Safe & Natural', color: '#D97706' },
      ],
      certifications: ['AYUSH Certified', 'ISO 9001:2015', 'GMP Certified', 'Organic Certified'],
      enabled: true,
    },
    whyChoose: {
      title: 'Why Choose AyurMantra?',
      subtitle: 'We combine traditional Ayurvedic wisdom with modern comfort to provide you with the best healing experience.',
      features: [
        { icon: 'user-check', title: 'Expert Doctors', description: 'Our team consists of AYUSH-certified physicians with decades of clinical experience in Ayurvedic healing.' },
        { icon: 'leaf', title: '100% Natural', description: 'All our treatments use pure herbal ingredients, free from harmful chemicals or side effects.' },
        { icon: 'heart', title: 'Personalized Care', description: 'Every treatment plan is customized based on your unique Prakriti (constitution) and health needs.' },
        { icon: 'sparkles', title: 'Modern Facility', description: 'State-of-the-art treatment rooms and equipment for your comfort and hygiene.' },
      ],
      enabled: true,
    },
    gallery: {
      title: 'Experience Our Center',
      subtitle: 'Take a glimpse of our healing space, treatment rooms, and wellness facilities.',
      imageIds: ['m2', 'm3', 'm5', 'm1'],
      enabled: true,
    },
    newsletter: {
      title: 'Subscribe to Wellness Tips',
      subtitle: 'Get Ayurvedic health tips, seasonal diet advice, and exclusive offers delivered to your inbox.',
      buttonText: 'Subscribe',
      enabled: true,
    },
    cta: {
      title: 'Ready to Begin Your Healing Journey?',
      subtitle: 'Book your consultation today and take the first step towards a healthier, happier you.',
      primaryButtonText: 'Book Appointment',
      primaryButtonLink: '/book-appointment',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/contact',
      backgroundImage: 'm1',
      enabled: true,
    },
    sectionOrder: [
      { id: 'hero', name: 'Hero Banner', order: 1, enabled: true },
      { id: 'trustBadges', name: 'Trust Badges', order: 2, enabled: true },
      { id: 'whyChoose', name: 'Why Choose Us', order: 3, enabled: true },
      { id: 'treatments', name: 'Featured Treatments', order: 4, enabled: true },
      { id: 'doctors', name: 'Our Doctors', order: 5, enabled: true },
      { id: 'testimonials', name: 'Testimonials', order: 6, enabled: true },
      { id: 'gallery', name: 'Gallery', order: 7, enabled: true },
      { id: 'faq', name: 'FAQ', order: 8, enabled: true },
      { id: 'newsletter', name: 'Newsletter', order: 9, enabled: true },
      { id: 'cta', name: 'Call to Action', order: 10, enabled: true },
    ],
    socialIntegrations: {
      googleReviews: {
        enabled: true,
        placeId: 'ChIJ_sample_place_id',
        maxReviews: 6,
      },
      instagram: {
        enabled: true,
        username: 'ayurmantra',
        maxPosts: 6,
      },
    },
    updatedAt: '2026-03-10T10:00:00Z',
  };

  async getHomepageSettings() {
    return this.homepageSettings;
  }

  async updateHomepageSettings(data: any) {
    this.homepageSettings = { 
      ...this.homepageSettings, 
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.homepageSettings;
  }

  // ============================================
  // THEME / BRANDING SETTINGS
  // ============================================
  private themeSettings: any = {
    activePreset: 'ayurvedic-classic',
    colors: {
      primary: '#2D5A3D',
      primaryDark: '#1F4030',
      primaryLight: '#4A7C59',
      secondary: '#D4853C',
      secondaryDark: '#B86E2E',
      accent: '#D4AF37',
      accentDark: '#B8941F',
      background: '#F8F6F0',
      border: '#E8E2D5',
      text: '#1a2e1a',
      textLight: '#6b7280',
    },
    presets: [
      {
        id: 'ayurvedic-classic',
        name: 'Ayurvedic Classic',
        description: 'Traditional green and gold with earthy tones',
        colors: { primary: '#2D5A3D', primaryDark: '#1F4030', primaryLight: '#4A7C59', secondary: '#D4853C', secondaryDark: '#B86E2E', accent: '#D4AF37', accentDark: '#B8941F', background: '#F8F6F0', border: '#E8E2D5', text: '#1a2e1a', textLight: '#6b7280' },
      },
      {
        id: 'royal-saffron',
        name: 'Royal Saffron',
        description: 'Warm saffron and deep maroon inspired by temple art',
        colors: { primary: '#8B1A1A', primaryDark: '#6B0F0F', primaryLight: '#A52A2A', secondary: '#FF9933', secondaryDark: '#E68A00', accent: '#C49B2A', accentDark: '#A67C00', background: '#FFF8F0', border: '#E8D5C4', text: '#3B1515', textLight: '#7C6B6B' },
      },
      {
        id: 'peacock-blue',
        name: 'Peacock Blue',
        description: 'Inspired by the vibrant peacock feathers of India',
        colors: { primary: '#1A5276', primaryDark: '#0E3D5C', primaryLight: '#2E86C1', secondary: '#148F77', secondaryDark: '#0E6655', accent: '#D4AF37', accentDark: '#B8941F', background: '#F0F8FF', border: '#D5E8F0', text: '#1B2631', textLight: '#5D6D7E' },
      },
      {
        id: 'lotus-pink',
        name: 'Lotus Pink',
        description: 'Soft pinks and purples inspired by the sacred lotus',
        colors: { primary: '#7B2D5F', primaryDark: '#5B1F47', primaryLight: '#9B4D7F', secondary: '#C74882', secondaryDark: '#A53368', accent: '#D4AF37', accentDark: '#B8941F', background: '#FDF5F9', border: '#EDCFE0', text: '#3D1F30', textLight: '#7C6B75' },
      },
      {
        id: 'earth-tone',
        name: 'Earth & Clay',
        description: 'Warm earth tones inspired by natural Ayurvedic herbs',
        colors: { primary: '#5D4037', primaryDark: '#3E2723', primaryLight: '#795548', secondary: '#BF360C', secondaryDark: '#9A2B08', accent: '#F9A825', accentDark: '#C88A1E', background: '#FBF5EF', border: '#D7CCC8', text: '#3E2723', textLight: '#795548' },
      },
      {
        id: 'modern-teal',
        name: 'Modern Teal',
        description: 'Clean contemporary look with teal accents',
        colors: { primary: '#0D7377', primaryDark: '#095B5E', primaryLight: '#14A3A8', secondary: '#FF6B35', secondaryDark: '#D4551C', accent: '#FFC947', accentDark: '#D4A73A', background: '#F7FDFD', border: '#D0EDED', text: '#0A3D40', textLight: '#5E8C8E' },
      },
    ],
    updatedAt: '2026-03-10T10:00:00Z',
  };

  async getThemeSettings() {
    return this.themeSettings;
  }

  async updateThemeSettings(data: any) {
    this.themeSettings = {
      ...this.themeSettings,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.themeSettings;
  }

  // ============================================
  // PAGES CMS (Section-based Page Builder)
  // ============================================
  private pages: Record<string, any> = {
    about: {
      slug: 'about',
      title: 'About Us',
      metaTitle: 'About Us | AyurMantra',
      metaDescription: 'Learn about AyurMantra - our mission, team, and commitment to authentic Ayurvedic healing.',
      sections: [
        {
          id: 'about-hero',
          type: 'HERO_BANNER',
          order: 0,
          visible: true,
          content: {
            badge: 'About AyurMantra',
            title: 'Healing Through Ancient Wisdom',
            subtitle: 'Founded with a mission to bring authentic Ayurvedic healing to modern lives.',
            backgroundImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920',
            ctaText: 'Book a Consultation',
            ctaLink: '/book-appointment',
          },
        },
        {
          id: 'about-story',
          type: 'TEXT_IMAGE',
          order: 1,
          visible: true,
          content: {
            heading: 'A Journey of Healing & Wellness',
            sectionLabel: 'Our Story',
            body: '<p>AyurMantra was established with a vision to make authentic Ayurvedic healthcare accessible to everyone. Our founder envisioned a place where ancient wisdom meets modern care.</p><p>Today, our team of experienced Ayurvedic doctors and therapists are committed to providing personalized care that addresses the root cause of health issues, not just the symptoms.</p>',
            image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
            imagePosition: 'right',
          },
        },
        {
          id: 'about-values',
          type: 'VALUES_GRID',
          order: 2,
          visible: true,
          content: {
            title: 'What We Stand For',
            subtitle: 'Our core values guide everything we do',
            columns: 4,
            items: [
              { icon: '🌿', title: 'Authenticity', description: 'We follow traditional Ayurvedic practices with uncompromising authenticity.' },
              { icon: '❤️', title: 'Compassion', description: 'Every patient receives personalized care with empathy and understanding.' },
              { icon: '🏆', title: 'Excellence', description: 'We strive for excellence in every treatment and service we offer.' },
              { icon: '👥', title: 'Holistic Approach', description: 'We treat the whole person - mind, body, and spirit.' },
            ],
          },
        },
        {
          id: 'about-stats',
          type: 'STATS_COUNTER',
          order: 3,
          visible: true,
          content: {
            title: 'Our Impact in Numbers',
            items: [
              { icon: '👥', number: '5000+', label: 'Happy Patients' },
              { icon: '👨‍⚕️', number: '15+', label: 'Expert Doctors' },
              { icon: '🏆', number: '20+', label: 'Years Experience' },
              { icon: '🌿', number: '50+', label: 'Treatments Offered' },
            ],
          },
        },
        {
          id: 'about-team',
          type: 'TEAM',
          order: 4,
          visible: true,
          content: {
            title: 'Meet Our Experts',
            subtitle: 'Our experienced team of Ayurvedic practitioners',
            showAll: true,
            doctorIds: [],
          },
        },
        {
          id: 'about-cta',
          type: 'CTA_BANNER',
          order: 5,
          visible: true,
          content: {
            title: 'Ready to Begin Your Healing Journey?',
            subtitle: 'Book a consultation with our expert Ayurvedic doctors today.',
            buttonText: 'Book Appointment',
            buttonLink: '/book-appointment',
            backgroundColor: '#2D5A3D',
          },
        },
      ],
      updatedAt: '2026-03-10T10:00:00Z',
    },
    contact: {
      slug: 'contact',
      title: 'Contact Us',
      metaTitle: 'Contact Us | AyurMantra',
      metaDescription: 'Get in touch with AyurMantra. Book appointments, ask questions, or visit our wellness center.',
      sections: [
        {
          id: 'contact-hero',
          type: 'HERO_BANNER',
          order: 0,
          visible: true,
          content: {
            badge: 'Get in Touch',
            title: "We're Here to Help",
            subtitle: 'Have questions? Need to book an appointment? Reach out to us through any of the channels below.',
            backgroundImage: '',
            ctaText: '',
            ctaLink: '',
          },
        },
        {
          id: 'contact-cards',
          type: 'CONTACT_CARDS',
          order: 1,
          visible: true,
          content: {
            items: [
              { icon: '📞', title: 'Phone', details: ['+91 800-123-4567', '+91 800-123-4568'], actionText: 'Call Now', actionLink: 'tel:+918001234567' },
              { icon: '✉️', title: 'Email', details: ['info@ayurmantra.com', 'appointments@ayurmantra.com'], actionText: 'Send Email', actionLink: 'mailto:info@ayurmantra.com' },
              { icon: '📍', title: 'Address', details: ['123 Wellness Lane, Ayurveda Nagar', 'Kerala, India - 682001'], actionText: 'Get Directions', actionLink: 'https://maps.google.com/?q=AyurMantra+Wellness+Center+Kerala' },
              { icon: '🕐', title: 'Working Hours', details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 4:00 PM'], actionText: 'Book Appointment', actionLink: '/book-appointment' },
            ],
          },
        },
        {
          id: 'contact-form',
          type: 'CONTACT_FORM',
          order: 2,
          visible: true,
          content: {
            title: 'Send us a Message',
            subtitle: "Fill out the form below and we'll get back to you within 24 hours.",
            recipientEmail: 'info@ayurmantra.com',
            subjectOptions: ['Book an Appointment', 'General Inquiry', 'Treatment Question', 'Feedback', 'Other'],
            successMessage: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
          },
        },
        {
          id: 'contact-map',
          type: 'GOOGLE_MAP',
          order: 3,
          visible: true,
          content: {
            title: 'Visit Our Center',
            embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5!2d76.3!3d9.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTQnMDAuMCJOIDc2wrAxOCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1',
            address: '123 Wellness Lane, Ayurveda Nagar, Kerala, India - 682001',
          },
        },
        {
          id: 'contact-info-list',
          type: 'BULLET_LIST',
          order: 4,
          visible: true,
          content: {
            title: 'Quick Information',
            items: [
              'Free parking available for patients',
              'Wheelchair accessible entrance',
              'Complimentary WiFi available',
              'Waiting lounge with herbal tea',
            ],
          },
        },
        {
          id: 'contact-whatsapp',
          type: 'WHATSAPP_CTA',
          order: 5,
          visible: true,
          content: {
            title: 'Prefer WhatsApp?',
            subtitle: 'Chat with us directly for quick responses',
            phoneNumber: '918001234567',
            buttonText: 'Chat on WhatsApp',
          },
        },
        {
          id: 'contact-faq',
          type: 'FAQ_SECTION',
          order: 6,
          visible: true,
          content: {
            title: 'Frequently Asked Questions',
            items: [
              { question: 'How do I book an appointment?', answer: 'You can book an appointment through our website, patient portal, or by calling us directly at +91 800-123-4567.' },
              { question: 'Do you offer online consultations?', answer: 'Yes, we offer video consultations for follow-up visits and minor concerns.' },
              { question: 'What should I bring for my first visit?', answer: 'Please bring any previous medical reports, current medications list, and arrive 15 minutes early.' },
              { question: 'Is there parking available?', answer: 'Yes, we have complimentary parking for all our patients and visitors.' },
            ],
            showViewAll: true,
            viewAllLink: '/faq',
          },
        },
      ],
      updatedAt: '2026-03-10T10:00:00Z',
    },
  };

  async getPage(slug: string) {
    return this.pages[slug] || null;
  }

  async updatePage(slug: string, data: any) {
    if (!this.pages[slug]) return null;
    this.pages[slug] = {
      ...this.pages[slug],
      ...data,
      slug,
      updatedAt: new Date().toISOString(),
    };
    return this.pages[slug];
  }

  // ============================================
  // SOCIAL INTEGRATIONS SETTINGS
  // ============================================
  private socialSettings = {
    googleReviews: {
      enabled: true,
      placeId: '',
      apiKey: '',
      maxReviews: 6,
    },
    instagram: {
      enabled: true,
      username: 'ayurmantra',
      accessToken: '',
      maxPosts: 6,
    },
    updatedAt: '2026-03-10T10:00:00Z',
  };

  async getSocialSettings() {
    return this.socialSettings;
  }

  async updateSocialSettings(data: any) {
    this.socialSettings = { 
      ...this.socialSettings, 
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.socialSettings;
  }
}
