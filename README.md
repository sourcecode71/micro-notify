# 📬 Notification Service (Microservice Architecture)

This repository demonstrates a microservices-based **Notification System** using **Node.js** with **NestJS**, **RabbitMQ** (message broker), and **unit testing** for building production-grade, scalable infrastructure. It is designed to process and deliver notifications (e.g., email, SMS) via **queue-based architecture** and **strategy pattern**.

> ✅ Ideal for developers and learners exploring real-world microservice design in Node.js.

---

## 🛠 Tech Stack

| Layer/Component      | Technology Used                          |
|----------------------|-------------------------------------------|
| Framework            | [NestJS](https://nestjs.com/)             |
| Language             | TypeScript                                |
| Messaging            | RabbitMQ (via [amqplib](https://www.npmjs.com/package/amqplib)) |
| Email Client         | SMTP / Nodemailer                         |
| Design Pattern       | Strategy Pattern                          |
| Persistence          | MongoDB (via Mongoose)                    |
| Validation           | Joi, class-validator                      |
| Testing              | Jest + Supertest                          |
| Containerization     | Docker + Docker Compose                   |

---

## 📦 Project Structure

```

micro-notify/
├── services/
│   ├── notification-service/        # Main API service
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── queue/                   # Queue publishing logic
│   └── email-worker/                # Worker service that consumes queue and sends emails
│       ├── queue/
│       └── mail/

````

---

## ✅ Features

- [x] **REST API** for triggering notifications
- [x] **RabbitMQ integration** for decoupled message handling
- [x] **Email strategy** using SMTP
- [x] **SMS strategy** (stubbed for extension)
- [x] **Strategy Pattern** for dynamic message handling (Email, SMS, etc.)
- [x] **Worker service** that consumes queue and sends notifications
- [x] **Unit tests** for controller layer (using Jest)
- [x] **Docker support** for simplified local setup

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- MongoDB running locally (`mongodb://localhost:27017`)
- RabbitMQ running locally (`amqp://localhost`)
- Docker (optional for running RabbitMQ/MongoDB containers)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/micro-notify.git
cd micro-notify
````

---

### 2️⃣ Start RabbitMQ & MongoDB (Docker optional)

If you don’t have RabbitMQ locally, you can use:

```bash
docker-compose -f docker-compose.local.yml up -d
```

> This will start RabbitMQ at `localhost:5672` and MongoDB at `localhost:27017`.

---

### 3️⃣ Install Dependencies

```bash
cd services/notification-service
npm install

cd ../email-worker
npm install
```

---

### 4️⃣ Run Services

* **Run Notification API**:

```bash
cd services/notification-service
npm run start:dev
```

* **Run Email Worker**:

```bash
cd services/email-worker
npm run start:dev
```

---

### 5️⃣ Trigger Notification

Send a POST request to:

```http
POST http://localhost:3000/notifications
```

With body:

```json
{
  "recipient": "test@example.com",
  "subject": "Welcome to our system",
  "body": "<b>Hello!</b> You have a new message.",
  "notificationType": "WELCOME",
  "mediaType": "EMAIL"
}
```

---

## 🧪 Testing

```bash
cd services/notification-service
npm run test
```

> ✅ Jest-based unit tests are implemented for controller endpoints.

---

## 📦 Dockerization

Each service has its own `Dockerfile`.

You can also run both services together using a full `docker-compose.yml` (optional).

---

## 🧠 Learning Outcomes

This project helps you learn:

* Microservice architecture using NestJS
* Queue-based communication using RabbitMQ
* Dynamic messaging using the Strategy pattern
* Dependency injection and modular codebase
* Controller, Service, and Factory design separation
* Robust error handling and reconnection logic
* Writing unit tests for REST APIs

---

## 📚 Future Enhancements

* Add support for AWS SNS/SQS
* Extend SMS sending via Twilio
* Add custom retry logic for failed messages
* UI dashboard for queue monitoring
* Log aggregator (e.g., ELK or Prometheus)

---

## 📧 Contact

**Author:** Mostafizur Rahman
**LinkedIn:** [linkedin.com/in/mostafiz](https://linkedin.com/in/mostafiz)
**Email:** [mostafiz571@gmail.com](mailto:mostafiz571@gmail.com)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

----------------------------------------------------------------------------


## Full Project Structure

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
