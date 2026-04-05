#!/bin/bash

# AyurMantra Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env.production"
BACKUP_DIR="./backups"
LOG_FILE="./logs/deploy-$(date +%Y%m%d-%H%M%S).log"

# Create necessary directories
mkdir -p logs backups

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Check if production environment file exists
if [ ! -f "$ENV_FILE" ]; then
    error "Production environment file $ENV_FILE not found!"
fi

log "✓ Environment file found"

# Check Docker and Docker Compose
if ! command -v docker &> /dev/null; then
    error "Docker is not installed!"
fi

if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose is not installed!"
fi

log "✓ Docker and Docker Compose are available"

# Health check function
health_check() {
    local url=$1
    local service=$2
    local max_attempts=30
    local attempt=1
    
    log "Health checking $service at $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url" > /dev/null 2>&1; then
            log "✓ $service is healthy"
            return 0
        fi
        
        warning "Attempt $attempt/$max_attempts: $service not ready yet..."
        sleep 5
        attempt=$((attempt + 1))
    done
    
    error "$service failed health check after $max_attempts attempts"
}

# Pre-deployment backup
log "Creating pre-deployment database backup..."
if docker-compose -f "$COMPOSE_FILE" ps | grep -q "postgres"; then
    docker-compose -f "$COMPOSE_FILE" exec -T postgres pg_dump -U postgres ayurmantra | gzip > "$BACKUP_DIR/pre-deploy-$(date +%Y%m%d-%H%M%S).sql.gz"
    log "✓ Database backup created"
else
    warning "PostgreSQL not running, skipping backup"
fi

# Pull latest images
log "Pulling latest Docker images..."
docker-compose -f "$COMPOSE_FILE" pull

# Build and start services
log "Building and starting services..."
docker-compose -f "$COMPOSE_FILE" up -d --build

# Wait for database to be ready
log "Waiting for PostgreSQL to be ready..."
sleep 10

# Run database migrations
log "Running database migrations..."
docker-compose -f "$COMPOSE_FILE" exec -T api pnpm db:push
log "✓ Database migrations completed"

# Health checks
log "Running health checks..."
sleep 15

health_check "http://localhost:2600/health" "API Server"
health_check "http://localhost:2900" "Web Frontend"
health_check "http://localhost:2700" "Patient Portal"
health_check "http://localhost:2800" "Admin Panel"

# Check database connection
log "Verifying database connection..."
docker-compose -f "$COMPOSE_FILE" exec -T api curl -f http://localhost:2600/health/db > /dev/null 2>&1
log "✓ Database connection verified"

# Display deployment summary
echo ""
echo "=========================================="
echo "✅ Deployment Successful!"
echo "=========================================="
echo ""
echo "Services Status:"
docker-compose -f "$COMPOSE_FILE" ps

echo ""
echo "Access URLs:"
echo "  🌐 Website:       http://localhost:2900"
echo "  👤 Patient Portal: http://localhost:2700"
echo "  ⚙️  Admin Panel:   http://localhost:2800"
echo "  🔌 API Server:    http://localhost:2600"
echo ""
echo "Logs: $LOG_FILE"
echo "=========================================="

log "Deployment completed successfully! 🎉"
