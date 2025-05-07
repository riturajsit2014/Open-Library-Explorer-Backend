# Open Library Explorer Backend

A backend application for managing a library system with REST API and gRPC services. The application allows users to browse, explore, and borrow books from a catalog while maintaining efficient inventory management.

## Features

### Catalogue & Inventory
- Add/Update/Remove book titles with ISBN, metadata, and tags
- Track physical copies with unique barcodes
- Full-text search across title, author, and subject
- Filter books by availability status

### Member Management
- Register/Update/Deactivate member records
- JWT-based authentication
- Member tier management
- Block/unblock members

### Circulation
- Check-out books with tier-based rules
- Check-in books with reservation queue handling
- Book renewal system
- Real-time notifications via WebSocket

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API**: REST + gRPC
- **Authentication**: JWT
- **Real-time**: WebSocket
- **Container**: Docker

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker and Docker Compose (for containerized deployment)
- Make (for using Makefile commands)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=pass@123
DB_DATABASE=library

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1d

# Application Configuration
NODE_ENV=development
PORT=3002
GRPC_PORT=5000
```

## Installation

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd Open-Library-Explorer-Backend
```

2. Install dependencies:
```bash
make install
```

3. Initialize the database:
```bash
make db-init
```

4. Run migrations:
```bash
make db-migrate
```

5. Start the development server:
```bash
make dev-env
```

### Docker Deployment

1. Build the Docker image:
```bash
make docker-build
```

2. Run the container:
```bash
make docker-run
```

## Available Make Commands

- `make install` - Install dependencies
- `make build` - Build the application
- `make start` - Start the application
- `make dev` - Start in development mode
- `make test` - Run tests
- `make clean` - Clean build artifacts
- `make docker-build` - Build Docker image
- `make docker-run` - Run Docker container
- `make docker-stop` - Stop Docker container
- `make docker-clean` - Clean Docker resources
- `make db-init` - Initialize database
- `make db-migrate` - Run database migrations
- `make db-seed` - Seed database
- `make setup` - Full local setup
- `make dev-env` - Setup development environment
- `make prod-env` - Setup production environment

## API Documentation

Once the application is running, you can access the API documentation at:
- REST API Swagger UI: `http://localhost:3002/api`
- gRPC Reflection: Available on port 5000

## Service Ports

- REST API: 3002
- gRPC: 5000
- WebSocket: 3002 (same as REST API)

## Project Structure

```
src/
├── auth/           # Authentication module
├── books/          # Books and inventory management
├── members/        # Member management
├── loans/          # Book circulation
├── reservations/   # Book reservations
├── grpc/           # gRPC service definitions
├── proto/          # Protocol buffer definitions
└── main.ts         # Application entry point
```

## Testing

Run the test suite:
```bash
make test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
