
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  avatar: 'avatar',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  roleId: 'roleId'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  resource: 'resource',
  action: 'action',
  description: 'description'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  bloodGroup: 'bloodGroup',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  pincode: 'pincode',
  emergencyContact: 'emergencyContact',
  medicalHistory: 'medicalHistory',
  allergies: 'allergies',
  currentMedications: 'currentMedications',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DoctorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  specialization: 'specialization',
  qualifications: 'qualifications',
  experience: 'experience',
  licenseNumber: 'licenseNumber',
  biography: 'biography',
  isAvailable: 'isAvailable',
  consultationFee: 'consultationFee',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StaffScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  department: 'department',
  position: 'position',
  joiningDate: 'joiningDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TreatmentCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  slug: 'slug',
  image: 'image',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TreatmentScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  benefits: 'benefits',
  duration: 'duration',
  price: 'price',
  discountPrice: 'discountPrice',
  shortDescription: 'shortDescription',
  fullDescription: 'fullDescription',
  procedure: 'procedure',
  afterCare: 'afterCare',
  featuredImage: 'featuredImage',
  gallery: 'gallery',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  keywords: 'keywords',
  isActive: 'isActive',
  isFeatured: 'isFeatured',
  sortOrder: 'sortOrder',
  categoryId: 'categoryId',
  doctorId: 'doctorId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PatientTreatmentScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  treatmentId: 'treatmentId',
  startDate: 'startDate',
  endDate: 'endDate',
  sessions: 'sessions',
  notes: 'notes',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  slug: 'slug',
  image: 'image',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  shortDescription: 'shortDescription',
  price: 'price',
  discountPrice: 'discountPrice',
  costPrice: 'costPrice',
  sku: 'sku',
  stock: 'stock',
  lowStockThreshold: 'lowStockThreshold',
  trackInventory: 'trackInventory',
  featuredImage: 'featuredImage',
  gallery: 'gallery',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  keywords: 'keywords',
  isActive: 'isActive',
  isFeatured: 'isFeatured',
  sortOrder: 'sortOrder',
  categoryId: 'categoryId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  doctorId: 'doctorId',
  treatmentId: 'treatmentId',
  date: 'date',
  startTime: 'startTime',
  endTime: 'endTime',
  timeSlotId: 'timeSlotId',
  notes: 'notes',
  symptoms: 'symptoms',
  status: 'status',
  type: 'type',
  paymentStatus: 'paymentStatus',
  amount: 'amount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  confirmedAt: 'confirmedAt',
  cancelledAt: 'cancelledAt',
  completedAt: 'completedAt'
};

exports.Prisma.DoctorTimeSlotScalarFieldEnum = {
  id: 'id',
  doctorId: 'doctorId',
  dayOfWeek: 'dayOfWeek',
  startTime: 'startTime',
  endTime: 'endTime',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrescriptionScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  doctorId: 'doctorId',
  appointmentId: 'appointmentId',
  prescriptionDate: 'prescriptionDate',
  diagnosis: 'diagnosis',
  symptoms: 'symptoms',
  notes: 'notes',
  medications: 'medications',
  attachments: 'attachments',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MedicalRecordScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  appointmentId: 'appointmentId',
  recordType: 'recordType',
  title: 'title',
  description: 'description',
  files: 'files',
  vitals: 'vitals',
  notes: 'notes',
  recordedBy: 'recordedBy',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BlogCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  image: 'image',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BlogPostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  excerpt: 'excerpt',
  content: 'content',
  featuredImage: 'featuredImage',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  keywords: 'keywords',
  status: 'status',
  publishedAt: 'publishedAt',
  isFeatured: 'isFeatured',
  viewCount: 'viewCount',
  categoryId: 'categoryId',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BlogTagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  createdAt: 'createdAt'
};

exports.Prisma.CmsPageScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  keywords: 'keywords',
  isActive: 'isActive',
  showInNav: 'showInNav',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CmsSectionScalarFieldEnum = {
  id: 'id',
  pageId: 'pageId',
  name: 'name',
  type: 'type',
  content: 'content',
  styles: 'styles',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MediaScalarFieldEnum = {
  id: 'id',
  filename: 'filename',
  originalName: 'originalName',
  mimeType: 'mimeType',
  size: 'size',
  url: 'url',
  thumbnailUrl: 'thumbnailUrl',
  folder: 'folder',
  altText: 'altText',
  caption: 'caption',
  width: 'width',
  height: 'height',
  duration: 'duration',
  uploadedById: 'uploadedById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GalleryScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  category: 'category',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GalleryImageScalarFieldEnum = {
  id: 'id',
  galleryId: 'galleryId',
  url: 'url',
  thumbnailUrl: 'thumbnailUrl',
  caption: 'caption',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.TestimonialScalarFieldEnum = {
  id: 'id',
  name: 'name',
  avatar: 'avatar',
  role: 'role',
  rating: 'rating',
  content: 'content',
  patientId: 'patientId',
  isApproved: 'isApproved',
  isFeatured: 'isFeatured',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  type: 'type',
  entityType: 'entityType',
  entityId: 'entityId',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  type: 'type',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  entityType: 'entityType',
  entityId: 'entityId',
  oldValues: 'oldValues',
  newValues: 'newValues',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.TreatmentStatus = exports.$Enums.TreatmentStatus = {
  PLANNED: 'PLANNED',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.AppointmentStatus = exports.$Enums.AppointmentStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

exports.AppointmentType = exports.$Enums.AppointmentType = {
  IN_PERSON: 'IN_PERSON',
  ONLINE: 'ONLINE',
  PHONE: 'PHONE'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
};

exports.RecordType = exports.$Enums.RecordType = {
  LAB_REPORT: 'LAB_REPORT',
  DIAGNOSIS: 'DIAGNOSIS',
  TREATMENT_NOTE: 'TREATMENT_NOTE',
  PROGRESS_NOTE: 'PROGRESS_NOTE',
  REFERRAL: 'REFERRAL',
  OTHER: 'OTHER'
};

exports.PostStatus = exports.$Enums.PostStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.SectionType = exports.$Enums.SectionType = {
  HERO: 'HERO',
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  GALLERY: 'GALLERY',
  TESTIMONIALS: 'TESTIMONIALS',
  FEATURES: 'FEATURES',
  TREATMENTS: 'TREATMENTS',
  PRODUCTS: 'PRODUCTS',
  BLOG: 'BLOG',
  TEAM: 'TEAM',
  CONTACT_FORM: 'CONTACT_FORM',
  CUSTOM: 'CUSTOM'
};

exports.GalleryCategory = exports.$Enums.GalleryCategory = {
  CLINIC: 'CLINIC',
  TREATMENTS: 'TREATMENTS',
  EVENTS: 'EVENTS',
  TRANSFORMATIONS: 'TRANSFORMATIONS',
  FACILITIES: 'FACILITIES'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  APPOINTMENT: 'APPOINTMENT',
  PRESCRIPTION: 'PRESCRIPTION',
  SYSTEM: 'SYSTEM',
  REMINDER: 'REMINDER',
  PROMOTION: 'PROMOTION'
};

exports.Prisma.ModelName = {
  User: 'User',
  Role: 'Role',
  Permission: 'Permission',
  Patient: 'Patient',
  Doctor: 'Doctor',
  Staff: 'Staff',
  TreatmentCategory: 'TreatmentCategory',
  Treatment: 'Treatment',
  PatientTreatment: 'PatientTreatment',
  ProductCategory: 'ProductCategory',
  Product: 'Product',
  Appointment: 'Appointment',
  DoctorTimeSlot: 'DoctorTimeSlot',
  Prescription: 'Prescription',
  MedicalRecord: 'MedicalRecord',
  BlogCategory: 'BlogCategory',
  BlogPost: 'BlogPost',
  BlogTag: 'BlogTag',
  CmsPage: 'CmsPage',
  CmsSection: 'CmsSection',
  Media: 'Media',
  Gallery: 'Gallery',
  GalleryImage: 'GalleryImage',
  Testimonial: 'Testimonial',
  Notification: 'Notification',
  Setting: 'Setting',
  AuditLog: 'AuditLog'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
