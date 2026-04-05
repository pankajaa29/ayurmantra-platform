# AyurMantra Platform - User Manual

## 📚 Table of Contents

1. [Getting Started](#getting-started)
2. [Public Website](#public-website)
3. [Patient Portal](#patient-portal)
4. [Admin Panel](#admin-panel)
5. [Managing Treatments](#managing-treatments)
6. [Managing Products](#managing-products)
7. [Managing Staff](#managing-staff)
8. [Appointment Management](#appointment-management)
9. [Calendar & Scheduling](#calendar--scheduling)
10. [Payment Management](#payment-management)
11. [Notifications (SMS/WhatsApp)](#notifications-smswhatsapp)
12. [Blog & Content](#blog--content)
13. [Website CMS](#website-cms)
14. [Settings & Configuration](#settings--configuration)
15. [Reports & Analytics](#reports--analytics)
16. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Access URLs

| Platform | URL | Purpose |
|----------|-----|---------|
| **Public Website** | http://localhost:2900 | Marketing & Information |
| **Patient Portal** | http://localhost:2700 | Patient bookings & records |
| **Admin Panel** | http://localhost:2800 | Clinic management |

### Default Login Credentials

**Admin Panel:**
- Email: `admin@ayurmantra.com`
- Password: `admin123` (change immediately)

**Patient Portal:**
- Create account via "Register" or use test account:
- Email: `patient@example.com`
- Password: `patient123`

---

## 🌐 Public Website

### Overview
The public-facing website showcases your clinic services and allows visitors to:
- Browse treatments and services
- Read health articles from the blog
- View doctor profiles
- Book appointments
- Contact the clinic

### Key Sections
1. **Homepage** - Hero banner, services, testimonials, CTA
2. **Treatments** - Detailed treatment listings
3. **Doctors** - Doctor profiles and specializations
4. **About Us** - Clinic story and mission
5. **Blog** - Health articles and tips
6. **Contact** - Location, phone, email, contact form
7. **Testimonials** - Patient success stories
8. **FAQ** - Common questions answered

### Floating Action Buttons
- **WhatsApp** - Quick chat with clinic
- **Phone** - Direct call button
- **Back to Top** - Scroll to top

---

## 👤 Patient Portal

### Dashboard
After login, patients see:
- Upcoming appointments
- Quick action buttons
- Recent activity
- Health summary

### Booking Appointments
1. Click "Book Appointment" in sidebar
2. Select treatment type
3. Choose doctor
4. Pick date and time slot
5. Confirm booking
6. Receive confirmation via SMS/WhatsApp

### My Appointments
- View all upcoming and past appointments
- Reschedule or cancel appointments
- Download appointment receipts
- View doctor notes (if shared)

### Medical Records
- View prescriptions
- Download medical reports
- Access treatment history
- View lab results

### Profile Management
- Update personal information
- Change password
- Upload profile photo
- Manage notification preferences

---

## ⚙️ Admin Panel

### Dashboard Overview
The admin dashboard provides:
- Quick stats (patients, appointments, revenue)
- Today's appointment list
- Recent patient registrations
- Revenue charts
- Pending tasks

### Navigation Sidebar
**Main Menu:**
- Dashboard - Overview and analytics
- Patients - Patient management
- Doctors & Staff - Team management
- Appointments - Schedule management
- Treatments - Service management
- Products - Inventory management
- Blog & CMS - Content management
- Messages - Communications
- Analytics - Reports and insights

**Bottom Menu:**
- Settings - Clinic configuration
- Help - Support and documentation

---

## 🏥 Managing Treatments

### Adding a New Treatment

1. Navigate to **Treatments** in sidebar
2. Click **"Add Treatment"** button
3. Fill in the form:

**Basic Info Tab:**
- **Name** - Treatment name (e.g., "Panchakarma Detox")
- **Category** - Select from dropdown
- **Duration** - Time in minutes
- **Price** - Base price in INR
- **Discounted Price** - Optional promotional price
- **Description** - Detailed description
- **Images** - Upload treatment photos

**Details Tab:**
- **Benefits** - List key benefits (click "Add Benefit")
- **Process Steps** - Step-by-step procedure
- **What's Included** - Items included in package
- **Pre-Care Instructions** - Before treatment guidelines
- **Post-Care Instructions** - Aftercare guidelines
- **Contraindications** - Who should avoid this

**SEO Tab:**
- **URL Slug** - Custom URL (e.g., "panchakarma-detox")
- **Meta Title** - SEO title
- **Meta Description** - SEO description

4. Click **"Save Treatment"**

### Managing Treatment Categories
1. Go to **Treatments** → **Categories**
2. Add, edit, or delete categories
3. Set display order

### Editing/Deleting Treatments
- Click **Edit** icon on treatment card
- Modify fields and save
- Click **Delete** to remove (with confirmation)

---

## 📦 Managing Products

### Adding a New Product

1. Navigate to **Products** in sidebar
2. Click **"Add Product"** button
3. Fill product details:

**Basic Information:**
- **Product Name** - Display name
- **SKU** - Unique code (e.g., "AYUR-TP-001")
- **Category** - Select category
- **Supplier** - Choose supplier
- **Description** - Product details

**Pricing & Stock:**
- **Cost Price** - Your purchase price
- **Selling Price** - Customer price
- **Discounted Price** - Sale price (optional)
- **Current Stock** - Available quantity
- **Low Stock Alert** - Threshold for alerts
- **Unit** - ml, g, capsules, etc.

**Additional Details:**
- **Barcode** - For scanning
- **Batch Number** - For tracking
- **Expiry Date** - For medicines
- **Specifications** - Product details
- **Usage Instructions** - How to use
- **Warnings** - Side effects/precautions

4. Click **"Save Product"**

### Low Stock Alerts
- View low stock items on dashboard
- Red badge shows "Low Stock" warning
- Use **"View Low Stock"** filter
- Restock before reaching zero

### Managing Suppliers
1. Go to **Products** → **Suppliers**
2. Add supplier details:
   - Name, contact person
   - Email, phone, address
   - Payment terms
   - GST/Tax ID

### Inventory Tracking
- Automatic stock updates on sales
- Manual stock adjustment with reason
- View stock history
- Export inventory reports

---

## 👨‍⚕️ Managing Staff & Doctors

### Adding a New Staff Member

1. Navigate to **Doctors & Staff** in sidebar
2. Click **"Add Member"** button
3. Enter details:

**Personal Information:**
- Full Name
- Email address
- Phone number
- Profile photo

**Professional Details:**
- Role (Doctor, Admin, Receptionist, Staff)
- Department
- Specialization (for doctors)
- Qualifications
- Experience (years)
- Designation

**Account Settings:**
- Login credentials
- Permissions (based on role)
- Status (Active, On Leave, Inactive)

4. Click **"Save Member"**

### Role Permissions

**Super Admin:**
- Full system access
- Can manage all users
- Configure settings

**Admin:**
- Manage patients, appointments
- View reports
- Manage content

**Doctor:**
- View assigned patients
- Manage appointments
- View medical records
- Update treatment notes

**Receptionist:**
- Book appointments
- Manage patient check-ins
- View schedules

**Staff:**
- Limited access based on assignment

### Managing Leave & Status
- Click **Edit** on staff member
- Change status: Active, On Leave, Inactive
- Set leave dates
- View availability calendar

---

## 📅 Appointment Management

### Viewing Appointments
1. Navigate to **Appointments**
2. Filter by:
   - Date range
   - Doctor
   - Status (Confirmed, Pending, Cancelled)
   - Treatment type

### Booking an Appointment (Admin)
1. Click **"New Appointment"**
2. Select patient (search by name/phone)
3. Choose doctor
4. Select treatment
5. Pick date and time slot
6. Add notes (optional)
7. Confirm booking
8. Patient receives SMS/WhatsApp confirmation

### Managing Schedule
- View calendar by day/week/month
- Block time slots for breaks
- Set recurring availability
- Mark holidays

### Appointment Actions
- **Confirm** - Send confirmation
- **Reschedule** - Move to new slot
- **Cancel** - With reason
- **Complete** - Mark as done
- **No-Show** - Mark patient absence

---

## 🗓️ Calendar & Scheduling

### Doctor Calendar View
1. Go to **Doctors** → **Calendar**
2. Select doctor from dropdown
3. View:
   - Available slots (green)
   - Booked appointments (blue)
   - Breaks/blocked time (gray)

### Setting Availability
1. Open doctor calendar
2. Click **"Set Schedule"**
3. Define:
   - Working days
   - Start/end times
   - Break duration
   - Slot duration (e.g., 30 min)

### Bulk Scheduling
- Set recurring schedule
- Copy schedule to multiple weeks
- Set special hours for holidays

---

## 💳 Payment Management

### Viewing Transactions
1. Navigate to **Payments**
2. See list of all transactions:
   - Transaction ID
   - Patient name
   - Amount
   - Payment method
   - Status
   - Date

### Payment Methods Supported
- Credit/Debit Cards
- UPI (Google Pay, PhonePe, etc.)
- Net Banking
- Wallets (Paytm, etc.)
- Cash (record manually)

### Processing Refunds
1. Find transaction in list
2. Click **"Refund"** button
3. Enter refund amount (partial or full)
4. Add reason for refund
5. Confirm
6. Patient receives refund confirmation

### Payment Statistics
- Daily revenue
- Weekly trends
- Monthly reports
- Payment method breakdown
- Refund summary

### Configuring Payment Gateway
1. Go to **Settings** → **Payment**
2. Configure:
   - Razorpay/Stripe API keys
   - Currency settings
   - Tax rate (GST)
   - Payment methods to enable

---

## 📱 Notifications (SMS/WhatsApp)

### Sending Messages

1. Navigate to **Notifications**
2. Choose mode:
   - **Single** - One recipient
   - **Bulk** - Multiple recipients

3. Select message type:
   - **SMS** - Text message
   - **WhatsApp** - WhatsApp message

4. Enter recipient phone number(s)
5. Type message or use template:
   - Appointment Confirmation
   - Appointment Reminder
   - Payment Received
   - Promotional Offers

6. Click **"Send"**

### Message Templates

**Appointment Confirmation:**
```
Hi {{name}}, your appointment is confirmed for {{date}} 
at {{time}} with {{doctor}}. Location: AyurMantra Wellness Center.
For changes, call: +91 800-123-4567
```

**Appointment Reminder:**
```
Reminder: {{name}}, you have an appointment tomorrow at {{time}}.
Please arrive 15 minutes early.
```

**Payment Confirmation:**
```
Payment Received! Thank you for your payment of ₹{{amount}} 
for {{treatment}}. Order ID: {{orderId}}
```

### Viewing Message History
- See sent messages
- Delivery status (Sent/Delivered/Failed)
- Resend failed messages
- Export message logs

---

## 📝 Blog & Content

### Writing a Blog Post

1. Navigate to **Blog & CMS** → **New Post**
2. Enter post details:

**Content Tab:**
- **Title** - Catchy headline
- **Content** - Use rich text editor
- **Formatting** - Bold, italic, lists, links

**Settings Tab:**
- **Category** - Treatments, Wellness, Nutrition, etc.
- **Tags** - Relevant keywords
- **Featured Image** - Upload cover photo
- **Author** - Select doctor/staff

**SEO Tab:**
- **URL Slug** - /blog/your-post-title
- **Meta Title** - Search result title
- **Meta Description** - Search snippet

3. Choose status:
   - **Draft** - Save for later
   - **Published** - Live immediately
   - **Scheduled** - Publish later

4. Click **"Publish"** or **"Save Draft"**

### Managing Blog Posts
- View all posts in Blog section
- Edit existing posts
- Delete old posts
- View post analytics (views)

---

## 🌐 Website CMS

### Managing Homepage Sections

1. Navigate to **Website** → **Homepage Sections**
2. View all 11 sections:
   - Hero Banner
   - Trust Badges
   - Services
   - Dosha Section
   - Meet Doctors
   - Why Choose Us
   - Testimonials
   - Gallery
   - FAQ
   - Newsletter
   - Call to Action

3. For each section:
   - **Show/Hide** - Toggle visibility
   - **Reorder** - Use up/down arrows
   - **Edit** - Click edit to modify content

### Quick Edit
Click **Edit** on any section to modify:
- Section title
- Subtitle
- Description
- Button text

Changes reflect immediately on website.

### Managing Testimonials

1. Go to **Website** → **Testimonials**
2. Add new testimonial:
   - Patient name
   - Location
   - Treatment received
   - Star rating (1-5)
   - Testimonial text
   - Before/After photos (optional)
   - Verified badge

3. Set status:
   - **Pending** - Awaiting approval
   - **Published** - Live on website
   - **Featured** - Shows in carousel

### Managing FAQ

1. Navigate to **Website** → **FAQ**
2. Organize by categories:
   - General
   - Treatments
   - Appointments
   - Payment & Insurance

3. For each question:
   - Question text
   - Detailed answer
   - Category assignment
   - Display order

4. Drag to reorder questions

### Media Library

1. Go to **Website** → **Media**
2. Upload images:
   - Drag and drop
   - Multiple file upload
   - Organize in folders
3. Use in content:
   - Copy image URL
   - Insert in blog posts
   - Use in sections

---

## ⚙️ Settings & Configuration

### General Settings

**Clinic Information:**
- Clinic name
- Tagline
- Logo upload
- Favicon

**Regional:**
- Timezone (Asia/Kolkata)
- Date format (DD/MM/YYYY)
- Time format (12h/24h)
- Currency (INR)

### Contact Settings

1. **Contact Details:**
   - Primary email
   - Phone numbers
   - Address
   - Google Maps link

2. **Social Media:**
   - Facebook URL
   - Instagram handle
   - Twitter/X handle
   - YouTube channel

### Business Hours

Set schedule for each day:
- **Monday-Friday:** 9:00 AM - 8:00 PM
- **Saturday:** 10:00 AM - 6:00 PM
- **Sunday:** Closed (or limited hours)

Mark holidays and special closures.

### Payment Settings

1. **Tax Configuration:**
   - Tax name (GST)
   - Tax rate (18%)
   - Inclusive/Exclusive pricing

2. **Payment Methods:**
   - Enable/Disable Cash
   - Enable/Disable Cards
   - Enable/Disable UPI
   - Enable/Disable Online

3. **Bank Details:**
   - Account for transfers
   - UPI ID
   - QR Code upload

### Notification Settings

Configure automatic notifications:
- **Appointment Confirmation** - Email + SMS
- **Appointment Reminder** - 24 hours before
- **Payment Confirmation** - Immediate
- **Daily Summary** - To admin

Enable/Disable:
- Email notifications
- SMS notifications
- WhatsApp notifications

---

## 📊 Reports & Analytics

### Available Reports

**Financial Reports:**
- Daily revenue
- Weekly summary
- Monthly breakdown
- Treatment-wise revenue
- Doctor-wise collections
- Payment method analysis

**Operational Reports:**
- Appointment statistics
- Patient count (new/returning)
- Treatment popularity
- Doctor utilization
- No-show analysis

**Inventory Reports:**
- Stock levels
- Low stock alerts
- Sales by product
- Expiry tracking

### Exporting Data
- Export to Excel/CSV
- Generate PDF reports
- Schedule automated reports
- Email reports to stakeholders

---

## 🔧 Troubleshooting

### Common Issues & Solutions

**1. Cannot Login**
- Check email/password
- Clear browser cache
- Reset password if forgotten
- Contact admin if account locked

**2. Page Not Loading**
- Check internet connection
- Refresh page (F5)
- Clear browser cookies
- Try different browser

**3. Payment Failed**
- Check card/UPI details
- Ensure sufficient balance
- Try different payment method
- Contact bank if issue persists

**4. SMS/WhatsApp Not Sending**
- Check recipient phone number format
- Verify integration credentials in Settings
- Check balance in Twilio/WhatsApp account
- View error logs in Notifications

**5. Images Not Uploading**
- Check file size (max 5MB)
- Use supported formats (JPG, PNG)
- Check internet connection
- Try smaller image

**6. Calendar Not Showing**
- Refresh page
- Check if doctor has schedule set
- Verify timezone settings
- Contact support

### Getting Help

**Support Channels:**
- Email: support@ayurmantra.com
- Phone: +91 800-123-4567
- In-app: Messages → Support

**Emergency Contact:**
- Technical: +91 800-123-4568
- After hours: +91 800-123-4569

---

## 💡 Best Practices

### For Administrators

1. **Daily Tasks:**
   - Check appointment schedule
   - Review low stock alerts
   - Respond to pending messages
   - Verify payment reconciliations

2. **Weekly Tasks:**
   - Review appointment analytics
   - Check inventory levels
   - Update website content if needed
   - Backup important data

3. **Monthly Tasks:**
   - Generate financial reports
   - Review patient feedback
   - Update treatment pricing if needed
   - Staff performance review

### For Doctors

1. **Before Appointment:**
   - Review patient history
   - Check previous treatments
   - Note any special requirements

2. **After Appointment:**
   - Update treatment notes
   - Add prescriptions
   - Schedule follow-up if needed

### For Receptionists

1. **Patient Check-in:**
   - Verify appointment
   - Update patient records
   - Collect payment if due

2. **Booking Appointments:**
   - Confirm doctor availability
   - Check treatment duration
   - Send confirmation immediately

---

## 🎓 Training Videos

*Note: Links to training videos will be added here*

1. **Getting Started with Admin Panel** (10 min)
2. **Managing Appointments** (15 min)
3. **Inventory Management** (12 min)
4. **Payment Processing** (8 min)
5. **Content Management** (10 min)

---

## 📞 Support

For additional help:
- 📧 Email: support@ayurmantra.com
- 📱 Phone: +91 800-123-4567
- 💬 WhatsApp: +91 800-123-4567
- 🌐 Website: https://ayurmantra.com/support

---

**Document Version:** 1.0
**Last Updated:** March 2026
**Platform Version:** AyurMantra v1.0

---

*This manual is a living document. Updates will be provided as new features are added.*
