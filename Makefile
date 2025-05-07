.PHONY: install build start dev test clean docker-build docker-run docker-clean db-init

# Variables
DOCKER_IMAGE = open-library-explorer
DOCKER_TAG = latest
DOCKER_CONTAINER = open-library-explorer-container

# Environment variables
export DB_HOST ?= localhost
export DB_PORT ?= 5432
export DB_USERNAME ?= postgres
export DB_PASSWORD ?= pass@123
export DB_DATABASE ?= library
export JWT_SECRET ?= your-secret-key
export JWT_EXPIRATION ?= 1d
export NODE_ENV ?= development

# Development commands
install:
	npm install

build:
	npm run build:all

start:
	npm run start:all

dev:
	npm run start:dev

test:
	npm run test

clean:
	rm -rf dist
	rm -rf node_modules

# Docker commands
docker-build:
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

docker-run:
	docker run -d \
		--name $(DOCKER_CONTAINER) \
		-p 3002:3002 \
		-p 5000:5000 \
		-e DB_HOST=$(DB_HOST) \
		-e DB_PORT=$(DB_PORT) \
		-e DB_USERNAME=$(DB_USERNAME) \
		-e DB_PASSWORD=$(DB_PASSWORD) \
		-e DB_DATABASE=$(DB_DATABASE) \
		-e JWT_SECRET=$(JWT_SECRET) \
		-e JWT_EXPIRATION=$(JWT_EXPIRATION) \
		-e NODE_ENV=$(NODE_ENV) \
		$(DOCKER_IMAGE):$(DOCKER_TAG)

docker-stop:
	docker stop $(DOCKER_CONTAINER) || true
	docker rm $(DOCKER_CONTAINER) || true

docker-clean: docker-stop
	docker rmi $(DOCKER_IMAGE):$(DOCKER_TAG) || true

# Database commands
db-init:
	PGPASSWORD=$(DB_PASSWORD) psql -h $(DB_HOST) -U $(DB_USERNAME) -d postgres -c "CREATE DATABASE $(DB_DATABASE);" || true

db-migrate:
	npm run migration:run

db-seed:
	npm run seed

# Local setup
setup: install build db-init db-migrate

# Development environment
dev-env: setup dev

# Production environment
prod-env: setup start

# Help command
help:
	@echo "Available commands:"
	@echo "  make install        - Install dependencies"
	@echo "  make build         - Build the application"
	@echo "  make start         - Start the application"
	@echo "  make dev           - Start in development mode"
	@echo "  make test          - Run tests"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make docker-build  - Build Docker image"
	@echo "  make docker-run    - Run Docker container"
	@echo "  make docker-stop   - Stop Docker container"
	@echo "  make docker-clean  - Clean Docker resources"
	@echo "  make db-init       - Initialize database"
	@echo "  make db-migrate    - Run database migrations"
	@echo "  make db-seed       - Seed database"
	@echo "  make setup         - Full local setup"
	@echo "  make dev-env       - Setup development environment"
	@echo "  make prod-env      - Setup production environment" 