# AyurMantra Website Content Management System (CMS) - Implementation Plan

## Current State Analysis

### What Exists Now:
1. **Admin Panel** (`/blog`) - Basic blog posts table with limited functionality
2. **Treatments Management** - For clinic services only
3. **Static Website** - Hardcoded content in Next.js components

### What's Missing:
- No way to edit homepage sections without code changes
- No banner/slider management
- No testimonial management (currently hardcoded)
- No FAQ management (currently hardcoded)
- No page content editor
- No media library for website images
- No SEO management per page
- No navigation menu editor

---

## Proposed CMS Architecture

### Approach: Dedicated CMS Module in Admin Panel

We'll create a comprehensive **"Website"** section in the admin panel with these sub-modules:

```
/admin/website/
  ├── pages/           # Manage static pages (Home, About, Contact, Services)
  ├── sections/        # Homepage sections (Hero, Features, CTA, etc.)
  ├── banners/         # Hero sliders, promotional banners
  ├── testimonials/    # CRUD for patient testimonials
  ├── faq/             # FAQ categories and questions
  ├── media/           # Image/video library
  ├── navigation/      # Header/footer menus
  └── seo/             # Global and page-level SEO settings
```

---

## Detailed Implementation Plan

### Phase 1: Pages Management (Foundation)
**Duration: 3-4 days**

#### Features:
1. **Page List**
   - Homepage, About Us, Contact, Services, Treatments, Testimonials, FAQ, Privacy Policy, Terms
   - Status: Published/Draft
   - Last modified date
   - Author

2. **Visual Page Editor**
   - WYSIWYG editor (TipTap/Quill) for content
   - HTML code editor option
   - SEO meta fields (title, description, keywords)
   - URL slug management
   - Featured image upload
   - Page templates selection

3. **Homepage Sections Builder**
   - Drag-and-drop section ordering
   - Section types:
     * Hero Banner (background image, title, subtitle, CTA buttons)
     * Features Grid (icon, title, description)
     * Treatment Showcase
     * Doctor Profiles Section
     * Testimonials Slider
     * CTA Section
     * Newsletter Signup
     * Text/Image Blocks
   - Section visibility toggle (show/hide)
   - Section-specific settings

#### Database Schema:
```sql
CMSPage:
  - id, title, slug, content, template
  - metaTitle, metaDescription, metaKeywords
  - featuredImage, status (published/draft)
  - createdAt, updatedAt, authorId

CMSSection:
  - id, pageId, type, name, sortOrder
  - settings (JSON for section-specific data)
  - isVisible, createdAt, updatedAt
```

---

### Phase 2: Dynamic Content Management
**Duration: 4-5 days**

#### 2.1 Testimonials Manager
- **List View**: All testimonials with patient info, ratings, treatment
- **Add/Edit Form**:
  * Patient name, location, photo
  * Treatment received
  * Rating (1-5 stars)
  * Testimonial text
  * Before/After images (optional)
  * Video testimonial URL (optional)
  * Verified badge toggle
  * Display order
- **Categories**: By treatment type
- **Approval Workflow**: Pending → Approved → Published

#### 2.2 FAQ Manager
- **Category Management** (General, Treatments, Appointments, Payment)
- **Question/Answer CRUD**
- **Rich text answers**
- **Display order per category**
- **Search functionality**

#### 2.3 Team/Doctors Showcase
- Doctor profiles with:
  * Photo, name, title, specialization
  * Experience, education, awards
  * Bio/description (rich text)
  * Social links
  * Display order
  * Active/inactive toggle

---

### Phase 3: Media & Assets
**Duration: 3-4 days**

#### 3.1 Media Library
- **File Upload**: Drag-and-drop, multiple files
- **Organization**: Folders (Banners, Treatments, Team, Gallery)
- **File Types**: Images (JPG, PNG, WebP), Videos, Documents
- **Image Optimization**: Auto-resize, WebP conversion
- **Search & Filter**: By name, type, date, folder
- **Usage Tracking**: See where each image is used
- **CDN Integration**: AWS S3/Cloudflare ready

#### 3.2 Banner/Slider Manager
- **Hero Slider** for homepage:
  * Multiple slides
  * Background image/video
  * Overlay text (title, subtitle)
  * CTA buttons with links
  * Slide duration
  * Transition effects
- **Promotional Banners**:
  * Position management (top bar, between sections)
  * Start/end dates (scheduling)
  * Target pages

---

### Phase 4: Navigation & SEO
**Duration: 2-3 days**

#### 4.1 Navigation Manager
- **Header Menu Editor**:
  * Drag-and-drop menu builder
  * Nested menu items (dropdowns)
  * Link to pages, treatments, external URLs
  * Icon selection
  * Mobile menu configuration

- **Footer Editor**:
  * Multi-column layout
  * Link groups (Treatments, Company, Support, Legal)
  * Social media links
  * Copyright text

#### 4.2 SEO Management
- **Global SEO Settings**:
  * Site title, description
  * Default social share image
  * Google Analytics ID
  * Google Search Console verification
  * Robots.txt editor
  * Sitemap configuration

- **Page-level SEO**:
  * Per-page meta editor
  * URL preview
  * SEO score/checklist
  * Social media preview (OG tags)

---

### Phase 5: Advanced Features
**Duration: 3-4 days**

#### 5.1 Content Scheduling
- Schedule page updates
- Scheduled banner displays
- Time-based content (e.g., "Summer Special")

#### 5.2 Version Control
- Page revision history
- Compare versions
- Rollback to previous version
- Who made what changes

#### 5.3 Analytics Integration
- Page view statistics
- Most popular content
- Search terms used
- Bounce rates

#### 5.4 Multi-language Support (Future)
- Content translation interface
- Language switcher management

---

## Technical Implementation Details

### New Database Tables Required:
```sql
-- Pages
CMSPage (id, title, slug, content, template, metaData, status, authorId, timestamps)
CMSSection (id, pageId, type, name, content, settings, sortOrder, isVisible)

-- Content
CMSTestimonial (id, patientName, location, image, treatment, rating, content, 
                beforeImage, afterImage, isVerified, displayOrder, status)
CMSFAQCategory (id, name, description, sortOrder)
CMSFAQ (id, categoryId, question, answer, sortOrder, isVisible)
CMSDoctorProfile (id, userId, bio, education, awards, displayOrder, isActive)

-- Media
CMSMedia (id, filename, originalName, mimeType, size, url, thumbnailUrl, 
          folder, altText, createdBy, timestamps)

-- Banners
CMSBanner (id, name, position, images[], settings, startDate, endDate, isActive)

-- Navigation
CMSNavigation (id, name, type (header/footer), items (JSON), isActive)

-- Settings
CMSSetting (id, key, value, group)
```

### API Endpoints Required:
```
Pages:
  GET    /api/cms/pages
  POST   /api/cms/pages
  GET    /api/cms/pages/:id
  PUT    /api/cms/pages/:id
  DELETE /api/cms/pages/:id
  POST   /api/cms/pages/:id/publish
  POST   /api/cms/pages/:id/duplicate

Sections:
  GET    /api/cms/sections?pageId=
  POST   /api/cms/sections
  PUT    /api/cms/sections/:id
  DELETE /api/cms/sections/:id
  POST   /api/cms/sections/reorder

Testimonials:
  GET    /api/cms/testimonials
  POST   /api/cms/testimonials
  GET    /api/cms/testimonials/:id
  PUT    /api/cms/testimonials/:id
  DELETE /api/cms/testimonials/:id

FAQ:
  GET    /api/cms/faq/categories
  POST   /api/cms/faq/categories
  GET    /api/cms/faq
  POST   /api/cms/faq
  PUT    /api/cms/faq/:id
  DELETE /api/cms/faq/:id

Media:
  GET    /api/cms/media
  POST   /api/cms/media/upload
  DELETE /api/cms/media/:id
  POST   /api/cms/media/folders

Navigation:
  GET    /api/cms/navigation
  POST   /api/cms/navigation
  PUT    /api/cms/navigation/:id

Settings:
  GET    /api/cms/settings
  PUT    /api/cms/settings
```

### Admin Panel UI Components Needed:
1. **Rich Text Editor** - TipTap or Quill.js
2. **Media Uploader** - Dropzone with image preview
3. **Drag-and-Drop** - For section/ navigation ordering
4. **Form Builder** - Dynamic forms for different sections
5. **SEO Preview** - Google search result preview
6. **Image Cropper** - For avatar/banner uploads
7. **Color Picker** - For theme customization

---

## Integration with Current System

### Changes to Website (apps/web):
1. **Dynamic Content Loading**:
   - Homepage sections load from CMS API
   - Static content replaced with API calls
   - SWR/React Query for caching

2. **SEO Dynamic Meta Tags**:
   - Next.js metadata API integration
   - Per-page meta from CMS

3. **Image Optimization**:
   - Next.js Image component with CMS URLs
   - Blur placeholder from CMS

### Fallback Strategy:
- If CMS is unavailable, show static content
- If no CMS content exists, use defaults
- Graceful degradation

---

## Implementation Roadmap

### Option A: Quick Start (2 weeks)
Focus on essential features only:
- Pages management (Homepage editable)
- Testimonials CRUD
- FAQ CRUD
- Basic media library

### Option B: Full CMS (4 weeks)
Complete implementation:
- All phases 1-5
- Advanced features
- Full website content editable

### Option C: Progressive (Ongoing)
Add features incrementally:
1. Week 1: Pages + Homepage sections
2. Week 2: Testimonials + FAQ
3. Week 3: Media library + Banners
4. Week 4: Navigation + SEO

---

## Key Decisions Needed

### 1. Rich Text Editor Choice:
- **TipTap** - Modern, headless, customizable (recommended)
- **Quill** - Easy to use, good ecosystem
- **CKEditor** - Full-featured but heavy

### 2. Media Storage:
- Local storage (simple, limited)
- AWS S3 (scalable, CDN-ready)
- Cloudflare R2 (S3-compatible, cheaper)

### 3. Image Handling:
- Next.js built-in optimization
- Sharp library for processing
- CDN with image transformation

### 4. Preview Functionality:
- Draft mode in website
- Shareable preview links
- Side-by-side editor

---

## Success Criteria

✅ Admin can edit homepage content without code changes  
✅ Add/edit testimonials from admin  
✅ Manage FAQ from admin  
✅ Upload and use images in content  
✅ Edit SEO meta per page  
✅ Changes reflect on website immediately  
✅ Non-technical staff can manage content  

---

## Cost/Benefit Analysis

### Without CMS:
- ❌ Every content change requires developer
- ❌ 2-4 hours per small text update
- ❌ Cannot respond quickly to marketing needs
- ❌ Dependency on technical team

### With CMS:
- ✅ Marketing team self-serves
- ✅ Instant content updates
- ✅ A/B testing capability
- ✅ Multi-person content workflow
- ✅ Professional content scheduling

---

## My Recommendation

**Go with Option A (Quick Start - 2 weeks)** because:
1. Gets you 80% benefit with 50% effort
2. Homepage + Testimonials + FAQ covers 90% of content updates
3. Can always expand later
4. Provides immediate value
5. Lower risk, faster ROI

---

**Ready to proceed? Which option would you like:**
- **Option A**: Quick Start (2 weeks) - Essential features
- **Option B**: Full CMS (4 weeks) - Complete system
- **Option C**: Progressive - Add features incrementally

Or would you like me to clarify any part of the plan?
