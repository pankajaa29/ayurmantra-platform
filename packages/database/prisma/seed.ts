import { PrismaClient, Gender, Role, AppointmentStatus, PostStatus } from '../generated/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create roles and permissions
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'SUPER_ADMIN',
      description: 'Full system access',
      permissions: {
        create: [
          { resource: '*', action: '*' },
        ],
      },
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'System administrator',
      permissions: {
        create: [
          { resource: 'users', action: 'manage' },
          { resource: 'patients', action: 'manage' },
          { resource: 'appointments', action: 'manage' },
          { resource: 'treatments', action: 'manage' },
          { resource: 'products', action: 'manage' },
          { resource: 'blog', action: 'manage' },
          { resource: 'cms', action: 'manage' },
          { resource: 'media', action: 'manage' },
          { resource: 'reports', action: 'view' },
        ],
      },
    },
  });

  const doctorRole = await prisma.role.create({
    data: {
      name: 'DOCTOR',
      description: 'Medical practitioner',
      permissions: {
        create: [
          { resource: 'patients', action: 'view' },
          { resource: 'patients', action: 'update' },
          { resource: 'appointments', action: 'view' },
          { resource: 'appointments', action: 'update' },
          { resource: 'prescriptions', action: 'manage' },
          { resource: 'medical_records', action: 'manage' },
        ],
      },
    },
  });

  const staffRole = await prisma.role.create({
    data: {
      name: 'STAFF',
      description: 'Clinic staff',
      permissions: {
        create: [
          { resource: 'patients', action: 'view' },
          { resource: 'patients', action: 'create' },
          { resource: 'appointments', action: 'manage' },
          { resource: 'treatments', action: 'view' },
        ],
      },
    },
  });

  const patientRole = await prisma.role.create({
    data: {
      name: 'PATIENT',
      description: 'Registered patient',
      permissions: {
        create: [
          { resource: 'profile', action: 'manage' },
          { resource: 'appointments', action: 'create' },
          { resource: 'appointments', action: 'view_own' },
          { resource: 'medical_records', action: 'view_own' },
          { resource: 'prescriptions', action: 'view_own' },
        ],
      },
    },
  });

  // Create default super admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@ayurmantra.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      phone: '+91 98765 43210',
      roleId: superAdminRole.id,
    },
  });

  // Create default doctor
  const doctorUser = await prisma.user.create({
    data: {
      email: 'doctor@ayurmantra.com',
      password: hashedPassword,
      firstName: 'Dr. Rajesh',
      lastName: 'Sharma',
      phone: '+91 98765 43211',
      roleId: doctorRole.id,
      doctor: {
        create: {
          specialization: 'Ayurvedic Medicine & Panchakarma',
          qualifications: 'BAMS, MD (Ayurveda)',
          experience: 15,
          licenseNumber: 'AY-12345',
          biography: 'Dr. Rajesh Sharma is a renowned Ayurvedic practitioner with over 15 years of experience in Panchakarma treatments and holistic healing.',
          consultationFee: 500.00,
        },
      },
    },
  });

  // Create treatment categories
  const panchakarmaCategory = await prisma.treatmentCategory.create({
    data: {
      name: 'Panchakarma',
      description: 'Authentic Ayurvedic detoxification and rejuvenation therapies',
      slug: 'panchakarma',
      image: '/images/categories/panchakarma.jpg',
      sortOrder: 1,
    },
  });

  const skinCategory = await prisma.treatmentCategory.create({
    data: {
      name: 'Skin Treatments',
      description: 'Natural Ayurvedic solutions for healthy, glowing skin',
      slug: 'skin-treatments',
      image: '/images/categories/skin.jpg',
      sortOrder: 2,
    },
  });

  const wellnessCategory = await prisma.treatmentCategory.create({
    data: {
      name: 'Wellness Programs',
      description: 'Holistic wellness programs for mind, body, and spirit',
      slug: 'wellness-programs',
      image: '/images/categories/wellness.jpg',
      sortOrder: 3,
    },
  });

  // Create treatments
  const treatments = await prisma.treatment.createMany({
    data: [
      {
        title: 'Abhyanga (Full Body Massage)',
        slug: 'abhyanga-full-body-massage',
        description: 'Traditional Ayurvedic full body massage with warm herbal oils',
        shortDescription: 'Rejuvenating full body massage with medicated oils',
        fullDescription: 'Abhyanga is a traditional Ayurvedic massage therapy that involves full body massage with warm herbal oils. It helps improve circulation, detoxify the body, and promote relaxation.',
        benefits: ['Improves blood circulation', 'Detoxifies the body', 'Relieves stress and anxiety', 'Nourishes the skin', 'Promotes better sleep'],
        duration: 60,
        price: 1500.00,
        featuredImage: '/images/treatments/abhyanga.jpg',
        metaTitle: 'Abhyanga Ayurvedic Massage | AyurMantra',
        metaDescription: 'Experience authentic Abhyanga massage therapy at AyurMantra. Full body massage with herbal oils for complete rejuvenation.',
        isFeatured: true,
        sortOrder: 1,
        categoryId: panchakarmaCategory.id,
        createdById: superAdmin.id,
      },
      {
        title: 'Shirodhara',
        slug: 'shirodhara',
        description: 'Therapeutic pouring of warm oil on the forehead',
        shortDescription: 'Stress-relieving forehead oil therapy',
        fullDescription: 'Shirodhara is a classic Ayurvedic therapy that involves pouring warm herbal oil on the forehead in a continuous stream. It is highly effective for stress relief, insomnia, and mental clarity.',
        benefits: ['Relieves stress and anxiety', 'Treats insomnia', 'Improves mental clarity', 'Helps with headaches', 'Balances the nervous system'],
        duration: 45,
        price: 1200.00,
        featuredImage: '/images/treatments/shirodhara.jpg',
        metaTitle: 'Shirodhara Treatment | Stress Relief Therapy | AyurMantra',
        metaDescription: 'Experience deep relaxation with Shirodhara therapy. Warm oil stream on forehead for stress relief and mental peace.',
        isFeatured: true,
        sortOrder: 2,
        categoryId: panchakarmaCategory.id,
        createdById: superAdmin.id,
      },
      {
        title: 'Panchakarma Detox',
        slug: 'panchakarma-detox',
        description: 'Complete Ayurvedic detoxification and rejuvenation program',
        shortDescription: 'Complete body detoxification program',
        fullDescription: 'Panchakarma is the ultimate Ayurvedic detoxification and rejuvenation therapy. It consists of five therapeutic procedures that eliminate toxins from the body and restore balance to the doshas.',
        benefits: ['Complete body detoxification', 'Balances doshas', 'Boosts immunity', 'Improves digestion', 'Rejuvenates tissues'],
        duration: 120,
        price: 5000.00,
        discountPrice: 4500.00,
        featuredImage: '/images/treatments/panchakarma.jpg',
        metaTitle: 'Panchakarma Detox Program | Ayurvedic Cleansing | AyurMantra',
        metaDescription: 'Complete Panchakarma detox program at AyurMantra. 5-step Ayurvedic cleansing for total body rejuvenation.',
        isFeatured: true,
        sortOrder: 3,
        categoryId: panchakarmaCategory.id,
        createdById: superAdmin.id,
      },
      {
        title: 'Ayurvedic Facial',
        slug: 'ayurvedic-facial',
        description: 'Natural facial treatment using Ayurvedic herbs and oils',
        shortDescription: 'Natural glow with herbal facial',
        fullDescription: 'Our Ayurvedic facial uses natural herbs, oils, and traditional techniques to cleanse, nourish, and rejuvenate your skin. Suitable for all skin types.',
        benefits: ['Deep skin cleansing', 'Natural glow', 'Anti-aging effects', 'Reduces blemishes', 'Improves skin texture'],
        duration: 60,
        price: 1800.00,
        featuredImage: '/images/treatments/facial.jpg',
        metaTitle: 'Ayurvedic Facial Treatment | Natural Skin Care | AyurMantra',
        metaDescription: 'Get natural glowing skin with our Ayurvedic facial. Herbal treatments for all skin types.',
        isFeatured: false,
        sortOrder: 1,
        categoryId: skinCategory.id,
        createdById: superAdmin.id,
      },
      {
        title: 'Stress Management Program',
        slug: 'stress-management',
        description: 'Comprehensive program for stress relief and mental wellness',
        shortDescription: 'Holistic stress relief program',
        fullDescription: 'Our stress management program combines Ayurvedic therapies, yoga, meditation, and dietary guidance to help you achieve mental peace and emotional balance.',
        benefits: ['Reduces stress hormones', 'Improves sleep quality', 'Enhances mental clarity', 'Builds resilience', 'Promotes inner peace'],
        duration: 90,
        price: 2500.00,
        featuredImage: '/images/treatments/stress.jpg',
        metaTitle: 'Stress Management Program | Ayurvedic Wellness | AyurMantra',
        metaDescription: 'Holistic stress management with Ayurvedic therapies, yoga, and meditation at AyurMantra.',
        isFeatured: true,
        sortOrder: 1,
        categoryId: wellnessCategory.id,
        createdById: superAdmin.id,
      },
    ],
  });

  // Create product categories
  const herbsCategory = await prisma.productCategory.create({
    data: {
      name: 'Herbal Medicines',
      description: 'Authentic Ayurvedic medicines and formulations',
      slug: 'herbal-medicines',
      sortOrder: 1,
    },
  });

  const skincareCategory = await prisma.productCategory.create({
    data: {
      name: 'Skin Care',
      description: 'Natural Ayurvedic skin care products',
      slug: 'skin-care',
      sortOrder: 2,
    },
  });

  const wellnessProductCategory = await prisma.productCategory.create({
    data: {
      name: 'Wellness Products',
      description: 'Products for daily wellness and health',
      slug: 'wellness-products',
      sortOrder: 3,
    },
  });

  // Create products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Triphala Churna',
        slug: 'triphala-churna',
        description: 'Traditional digestive tonic made from three fruits - Amalaki, Bibhitaki, and Haritaki.',
        shortDescription: 'Natural digestive tonic and detoxifier',
        price: 250.00,
        sku: 'AYM-TRI-001',
        stock: 100,
        featuredImage: '/images/products/triphala.jpg',
        categoryId: herbsCategory.id,
        createdById: superAdmin.id,
      },
      {
        name: 'Kumkumadi Tailam',
        slug: 'kumkumadi-tailam',
        description: 'Luxurious facial oil with saffron and precious herbs for glowing skin.',
        shortDescription: 'Radiance facial oil with saffron',
        price: 850.00,
        sku: 'AYM-KUM-001',
        stock: 50,
        featuredImage: '/images/products/kumkumadi.jpg',
        categoryId: skincareCategory.id,
        createdById: superAdmin.id,
      },
      {
        name: 'Brahmi Capsules',
        slug: 'brahmi-capsules',
        description: 'Brain tonic capsules for memory, concentration, and mental clarity.',
        shortDescription: 'Brain tonic for memory and focus',
        price: 450.00,
        sku: 'AYM-BRA-001',
        stock: 75,
        featuredImage: '/images/products/brahmi.jpg',
        categoryId: wellnessProductCategory.id,
        createdById: superAdmin.id,
      },
      {
        name: 'Neem Face Wash',
        slug: 'neem-face-wash',
        description: 'Gentle purifying face wash with neem and aloe vera.',
        shortDescription: 'Purifying neem face wash',
        price: 320.00,
        sku: 'AYM-NEE-001',
        stock: 120,
        featuredImage: '/images/products/neem-wash.jpg',
        categoryId: skincareCategory.id,
        createdById: superAdmin.id,
      },
      {
        name: 'Ashwagandha Powder',
        slug: 'ashwagandha-powder',
        description: 'Pure ashwagandha root powder for vitality and stress relief.',
        shortDescription: 'Stress relief and vitality powder',
        price: 380.00,
        sku: 'AYM-ASH-001',
        stock: 80,
        featuredImage: '/images/products/ashwagandha.jpg',
        categoryId: herbsCategory.id,
        createdById: superAdmin.id,
      },
    ],
  });

  // Create blog categories
  const ayurvedaTipsCategory = await prisma.blogCategory.create({
    data: {
      name: 'Ayurveda Tips',
      slug: 'ayurveda-tips',
      description: 'Daily Ayurvedic wisdom for healthy living',
    },
  });

  const detoxCategory = await prisma.blogCategory.create({
    data: {
      name: 'Detox & Cleansing',
      slug: 'detox-cleansing',
      description: 'Articles about Ayurvedic detoxification methods',
    },
  });

  // Create blog posts
  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        title: 'Understanding Your Dosha: Vata, Pitta, and Kapha',
        slug: 'understanding-your-dosha',
        excerpt: 'Discover your unique body constitution and learn how to balance your doshas for optimal health.',
        content: `
          <h2>What Are Doshas?</h2>
          <p>In Ayurveda, the three doshas - Vata, Pitta, and Kapha - are the fundamental biological energies that govern all physical and mental processes. Understanding your dominant dosha can help you make lifestyle choices that promote balance and wellness.</p>
          
          <h3>Vata Dosha</h3>
          <p>Vata is composed of air and space elements. People with dominant Vata are typically creative, energetic, and quick-thinking. When balanced, they are enthusiastic and adaptable. When imbalanced, they may experience anxiety, dry skin, and digestive issues.</p>
          
          <h3>Pitta Dosha</h3>
          <p>Pitta consists of fire and water elements. Pitta types are usually intelligent, determined, and strong leaders. Balanced Pitta manifests as good digestion and a sharp mind. Imbalanced Pitta can lead to anger, inflammation, and skin rashes.</p>
          
          <h3>Kapha Dosha</h3>
          <p>Kapha is made up of earth and water elements. Kapha individuals are typically calm, loving, and stable. Balanced Kapha brings strength and immunity. Imbalance may result in weight gain, lethargy, and congestion.</p>
          
          <h2>Finding Your Balance</h2>
          <p>Take our dosha quiz to discover your constitution and receive personalized recommendations for diet, lifestyle, and treatments.</p>
        `,
        featuredImage: '/images/blog/doshas.jpg',
        categoryId: ayurvedaTipsCategory.id,
        authorId: superAdmin.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
        isFeatured: true,
      },
      {
        title: 'Morning Rituals for Ayurvedic Wellness',
        slug: 'morning-rituals-ayurveda',
        excerpt: 'Start your day the Ayurvedic way with these simple morning practices.',
        content: `
          <h2>The Power of Morning Rituals</h2>
          <p>According to Ayurveda, the morning hours are crucial for setting the tone of your entire day. These simple practices can transform your health and energy levels.</p>
          
          <h3>1. Wake Up Early</h3>
          <p>Rising before sunrise (Brahma Muhurta) is ideal for optimal health. This time is considered spiritually charged and helps synchronize your body with natural rhythms.</p>
          
          <h3>2. Oil Pulling</h3>
          <p>Swish a tablespoon of sesame or coconut oil in your mouth for 10-15 minutes. This practice detoxifies, improves oral health, and stimulates digestion.</p>
          
          <h3>3. Warm Water Ritual</h3>
          <p>Drink a glass of warm water to stimulate digestion and flush out toxins accumulated overnight.</p>
          
          <h3>4. Self-Massage (Abhyanga)</h3>
          <p>A quick self-massage with warm oil before bathing improves circulation and nourishes the skin.</p>
          
          <h3>5. Yoga and Meditation</h3>
          <p>Even 15 minutes of yoga and meditation can center your mind and energize your body for the day ahead.</p>
        `,
        featuredImage: '/images/blog/morning.jpg',
        categoryId: ayurvedaTipsCategory.id,
        authorId: superAdmin.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
        isFeatured: true,
      },
    ],
  });

  // Create testimonials
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: 'Priya Sharma',
        role: 'Business Executive',
        rating: 5,
        content: 'The Panchakarma program at AyurMantra completely transformed my health. After years of digestive issues, I finally feel balanced and energized. Dr. Sharma and his team are truly gifted healers.',
        isApproved: true,
        isFeatured: true,
      },
      {
        name: 'Rajesh Kumar',
        role: 'Software Engineer',
        rating: 5,
        content: 'I was suffering from chronic stress and insomnia. The Shirodhara treatment and stress management program helped me find peace and restful sleep. Highly recommended!',
        isApproved: true,
        isFeatured: true,
      },
      {
        name: 'Anita Patel',
        role: 'Teacher',
        rating: 5,
        content: 'The Ayurvedic facial treatment gave my skin a natural glow that no chemical product ever could. The staff is professional and the atmosphere is so peaceful.',
        isApproved: true,
        isFeatured: true,
      },
    ],
  });

  // Create CMS Pages
  const homePage = await prisma.cmsPage.create({
    data: {
      title: 'Home',
      slug: 'home',
      description: 'Homepage content sections',
      showInNav: false,
      sections: {
        create: [
          {
            name: 'Hero Section',
            type: 'HERO',
            content: {
              title: 'Discover Your Ayurvedic Path to Wellness',
              subtitle: 'Personalized Health & Healing Solutions',
              description: 'Experience authentic Ayurvedic treatments for holistic well-being',
              primaryCta: { text: 'Take Dosha Quiz', link: '/dosha-quiz' },
              secondaryCta: { text: 'Book Appointment', link: '/book-appointment' },
              backgroundImage: '/images/hero-bg.jpg',
            },
            sortOrder: 1,
          },
          {
            name: 'Services Section',
            type: 'FEATURES',
            content: {
              title: 'Our Services',
              description: 'Comprehensive Ayurvedic care for your wellness journey',
              features: [
                { icon: 'leaf', title: 'Dosha Analysis', description: 'Personalized health assessment' },
                { icon: 'herb', title: 'Herbal Remedies', description: 'Natural healing solutions' },
                { icon: 'heart', title: 'Lifestyle Guidance', description: 'Holistic wellness coaching' },
              ],
            },
            sortOrder: 2,
          },
          {
            name: 'Treatments Section',
            type: 'TREATMENTS',
            content: {
              title: 'Featured Treatments',
              description: 'Experience our most popular Ayurvedic therapies',
              showFeaturedOnly: true,
              limit: 3,
            },
            sortOrder: 3,
          },
          {
            name: 'Testimonials Section',
            type: 'TESTIMONIALS',
            content: {
              title: 'What Our Patients Say',
              description: 'Real stories of transformation and healing',
              showFeaturedOnly: true,
            },
            sortOrder: 4,
          },
          {
            name: 'CTA Section',
            type: 'CUSTOM',
            content: {
              title: 'Ready to Begin Your Wellness Journey?',
              description: 'Book your consultation today and take the first step towards holistic health',
              cta: { text: 'Book Now', link: '/book-appointment' },
            },
            sortOrder: 5,
          },
        ],
      },
    },
  });

  const aboutPage = await prisma.cmsPage.create({
    data: {
      title: 'About Us',
      slug: 'about',
      description: 'About AyurMantra clinic',
      showInNav: true,
      sortOrder: 1,
      sections: {
        create: [
          {
            name: 'About Hero',
            type: 'HERO',
            content: {
              title: 'About AyurMantra',
              subtitle: 'Healing Through Ancient Wisdom',
              description: 'Founded with a mission to bring authentic Ayurvedic healing to modern lives',
              backgroundImage: '/images/about-hero.jpg',
            },
            sortOrder: 1,
          },
          {
            name: 'Our Story',
            type: 'TEXT',
            content: {
              title: 'Our Story',
              content: 'AyurMantra was established with a vision to make authentic Ayurvedic healthcare accessible to everyone. Our team of experienced Ayurvedic doctors and therapists are committed to providing personalized care that addresses the root cause of health issues.',
            },
            sortOrder: 2,
          },
          {
            name: 'Our Team',
            type: 'TEAM',
            content: {
              title: 'Meet Our Experts',
              description: 'Experienced Ayurvedic practitioners dedicated to your wellness',
            },
            sortOrder: 3,
          },
        ],
      },
    },
  });

  // Create settings
  const settings = await prisma.setting.createMany({
    data: [
      { key: 'site_name', value: 'AyurMantra', group: 'general' },
      { key: 'site_tagline', value: 'Authentic Ayurvedic Wellness', group: 'general' },
      { key: 'contact_email', value: 'info@ayurmantra.com', group: 'contact' },
      { key: 'contact_phone', value: '+91 98765 43210', group: 'contact' },
      { key: 'contact_address', value: '123 Wellness Lane, Ayurveda Nagar, Kerala 682001', group: 'contact' },
      { key: 'whatsapp_number', value: '+91 98765 43210', group: 'contact' },
      { key: 'social_facebook', value: 'https://facebook.com/ayurmantra', group: 'social' },
      { key: 'social_instagram', value: 'https://instagram.com/ayurmantra', group: 'social' },
      { key: 'appointment_notice_hours', value: '24', group: 'appointments' },
      { key: 'currency', value: 'INR', group: 'general' },
    ],
  });

  console.log('Database seeded successfully!');
  console.log('\nDefault accounts:');
  console.log('  Super Admin: admin@ayurmantra.com / admin123');
  console.log('  Doctor: doctor@ayurmantra.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
