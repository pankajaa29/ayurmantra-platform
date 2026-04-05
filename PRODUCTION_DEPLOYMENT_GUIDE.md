# AyurMantra Platform - Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables Configuration

Create `.env.production` files for each service:

#### Root `.env.production`
```env
# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@your-rds-endpoint:5432/ayurmantra?schema=public

# JWT
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
JWT_EXPIRATION=7d

# API
API_PORT=2600
API_URL=https://api.ayurmantra.com

# Frontend URLs
WEB_URL=https://ayurmantra.com
PATIENT_PORTAL_URL=https://portal.ayurmantra.com
ADMIN_PANEL_URL=https://admin.ayurmantra.com

# CORS
ALLOWED_ORIGINS=https://ayurmantra.com,https://portal.ayurmantra.com,https://admin.ayurmantra.com

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Twilio SMS
TWILIO_ACCOUNT_SID=AC_your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# WhatsApp Business API
WHATSAPP_API_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# AWS S3 (Media Storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=ayurmantra-media
AWS_S3_REGION=ap-south-1
AWS_CLOUDFRONT_URL=https://cdn.ayurmantra.com

# Email (SendGrid)
SENDGRID_API_KEY=SG.your_sendgrid_key
EMAIL_FROM=noreply@ayurmantra.com
EMAIL_FROM_NAME=AyurMantra Wellness

# Redis (Caching)
REDIS_URL=redis://your-redis-endpoint:6379

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=error
```

### 2. Database Setup

```bash
# 1. Create production database
# Using AWS RDS or similar managed PostgreSQL

# 2. Run migrations
pnpm db:generate
pnpm db:push

# 3. Seed essential data
pnpm db:seed
```

### 3. SSL Certificates

Ensure SSL certificates are configured for:
- `ayurmantra.com` (Main website)
- `portal.ayurmantra.com` (Patient portal)
- `admin.ayurmantra.com` (Admin panel)
- `api.ayurmantra.com` (API server)

## 🐳 Docker Production Build

### Build All Services

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Push to registry
docker-compose -f docker-compose.prod.yml push
```

### Production Docker Compose

See `docker-compose.prod.yml` below - includes:
- PostgreSQL with persistent volumes
- API server (NestJS)
- Web frontend (Next.js)
- Patient portal (Next.js)
- Admin panel (Next.js)
- Nginx reverse proxy
- Redis cache

## ☁️ AWS Deployment Architecture

### Recommended AWS Setup

```
┌─────────────────────────────────────────────────────────┐
│                      Route 53                           │
│              (DNS Management)                            │
└─────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ CloudFront   │ │ CloudFront   │ │ CloudFront   │
│ (Website)    │ │ (Portal)     │ │ (Admin)      │
└──────────────┘ └──────────────┘ └──────────────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
              ┌────────────┴────────────┐
              │      Application Load    │
              │         Balancer         │
              └────────────┬────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼──────┐ ┌────────▼───────┐ ┌──────▼──────┐
│   ECS/Fargate│ │   ECS/Fargate  │ │  ECS/Fargate│
│   (Web)      │ │   (Portal)     │ │  (Admin)    │
└──────────────┘ └────────────────┘ └─────────────┘
                           │
              ┌────────────┴────────────┐
              │      ECS/Fargate         │
              │      (API Server)         │
              └────────────┬──────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼──────┐ ┌────────▼───────┐ ┌──────▼──────┐
│   RDS        │ │   ElastiCache  │ │    S3       │
│ (PostgreSQL) │ │   (Redis)      │ │  (Media)    │
└──────────────┘ └────────────────┘ └─────────────┘
```

### AWS Services Required

1. **ECS/Fargate** - Container orchestration
2. **RDS PostgreSQL** - Managed database
3. **ElastiCache Redis** - Session & cache
4. **S3 + CloudFront** - Static assets & media
5. **Application Load Balancer** - Traffic distribution
6. **Route 53** - DNS management
7. **CloudWatch** - Monitoring & logs
8. **AWS WAF** - Security

## 🔧 Deployment Scripts

### 1. Pre-deployment Check
```bash
./scripts/pre-deploy-check.sh
```

### 2. Database Migration
```bash
./scripts/db-migrate.sh
```

### 3. Deploy to Production
```bash
./scripts/deploy-production.sh
```

### 4. Post-deployment Verification
```bash
./scripts/health-check.sh
```

## 📊 Monitoring & Logging

### Health Check Endpoints

- API Health: `https://api.ayurmantra.com/health`
- Database: `https://api.ayurmantra.com/health/db`
- Redis: `https://api.ayurmantra.com/health/redis`

### Key Metrics to Monitor

1. **Application Metrics**
   - Request latency (p50, p95, p99)
   - Error rate (< 1%)
   - Active users
   - API response times

2. **Database Metrics**
   - Connection pool usage
   - Query performance
   - Replication lag

3. **Business Metrics**
   - Successful payments
   - Failed payments
   - SMS/WhatsApp delivery rates
   - New appointments

## 🔄 CI/CD Pipeline (GitHub Actions)

See `.github/workflows/deploy.yml`

### Pipeline Stages
1. **Build** - Build Docker images
2. **Test** - Run test suites
3. **Security Scan** - Trivy/Docker security scan
4. **Deploy Staging** - Deploy to staging
5. **Integration Tests** - Run integration tests
6. **Deploy Production** - Deploy to production
7. **Smoke Tests** - Verify deployment

## 🛡️ Security Checklist

### Pre-Launch Security

- [ ] SSL/TLS certificates installed
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Rate limiting enabled
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Input validation on all endpoints
- [ ] File upload restrictions (type, size)
- [ ] API authentication verified
- [ ] Secrets not in code repositories
- [ ] Database encryption at rest
- [ ] Backup strategy tested

### Production Security Settings

```env
# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
CORS_ENABLED=true
HELMET_ENABLED=true

# Session
SESSION_SECRET=your-session-secret
SESSION_SECURE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=strict
```

## 📱 Go-Live Checklist

### 1 Week Before
- [ ] All features tested
- [ ] Performance testing complete
- [ ] Security audit passed
- [ ] SSL certificates valid
- [ ] Backup strategy tested
- [ ] Monitoring alerts configured
- [ ] Team trained on admin panel

### 1 Day Before
- [ ] Database backup created
- [ ] Production credentials ready
- [ ] Rollback plan documented
- [ ] Support team on standby

### Go-Live Day
- [ ] Deploy during low-traffic window
- [ ] Monitor all dashboards
- [ ] Test critical user flows
- [ ] Verify payment processing
- [ ] Check SMS/WhatsApp delivery
- [ ] Monitor error rates

### Post Go-Live (First Week)
- [ ] Daily health checks
- [ ] Monitor user feedback
- [ ] Track performance metrics
- [ ] Address any critical issues
- [ ] Collect user feedback

## 🚨 Emergency Procedures

### Rollback Process
```bash
# Quick rollback to previous version
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d --force-recreate
```

### Database Rollback
```bash
# Restore from backup
pg_restore --clean --if-exists --dbname=ayurmantra backup.sql
```

### Contact Escalation
1. **Level 1**: Technical team
2. **Level 2**: DevOps team
3. **Level 3**: Project manager
4. **Level 4**: Client notification

## 📞 Support Contacts

- **Technical Support**: support@ayurmantra.com
- **Emergency Hotline**: +91 800-123-4567
- **Escalation**: escalation@ayurmantra.com

---

**Remember**: Keep local development servers running until client officially confirms go-live!

**Deployment Date**: _______________
**Deployed By**: _______________
**Verified By**: _______________
