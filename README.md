# Micro Notify

A microservices-based notification system with distributed architecture.

## Project Structure

```
micro-notify/
├── services/                       # Microservices directory
│   ├── notification-service/      # Core notification logic
│   ├── user-service/              # Authentication and user management
│   ├── email-worker/              # Email processing worker
│   ├── audit-service/             # Logging and auditing
│   └── api-gateway/               # API Gateway
├── ui/                            # Next.js frontend dashboard
├── docker-compose.yml             # Container orchestration
├── .env.example                   # Environment variables template
└── README.md                      # Project documentation
```

## Services Overview

- **notification-service**: Handles core notification logic and storage
- **user-service**: Manages authentication and user profiles
- **email-worker**: Processes email notifications asynchronously
- **audit-service**: Handles logging and auditing of operations
- **api-gateway**: Central entry point for all API requests
- **ui**: Next.js based frontend dashboard

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure environment variables
3. Run `docker-compose up` to start all services

## Prerequisites

- Docker and Docker Compose
- Node.js (for UI development)
- Python (for backend services)
- Redis (for message queue)
- PostgreSQL (for database)
