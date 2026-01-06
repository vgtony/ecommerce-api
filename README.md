# E-commerce REST API

A production-ready Spring Boot 3 REST API for an E-commerce platform.

## Tech Stack
- **Java 25**
- **Spring Boot 4.0**
- **Spring Security + JWT**
- **PostgreSQL** (Dockerized)
- **Redis** (Dockerized)

## Prerequisites
- Docker & Docker Compose
- Java 25
- Maven

## How to Run

1. **Start Database & Cache**
   ```bash
   docker compose up -d
   ```

2. **Run Application**
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register`
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "CUSTOMER" // Optional: CUSTOMER (default) or ADMIN
  }
  ```
- `POST /api/v1/auth/authenticate` (Returns JWT Token)

### Products
- `POST /api/v1/products` (Requires Token)
  ```json
  {
    "name": "Smartphone",
    "description": "Latest model",
    "price": 999.99,
    "categoryId": 1
  }
  ```
- `GET /api/v1/products`

### Orders
- `POST /api/v1/orders` (Requires Token)
  ```json
  {
    "items": [
      { "productId": 1, "quantity": 2 }
    ]
  }
  ```

### Payments
- `POST /api/v1/payment/create-payment-intent`

## Troubleshooting & Environment Notes
> [!WARNING]
> **Java Version Mismatch**: You are currently running **Java 11**, but this project requires **Java 25** (or at least Java 17). You will see compile errors until you update your JDK.

> [!NOTE]
> **Database**: I have configured the app to use **H2 (In-Memory Database)** by default. This means you **do not need Docker** running to test the app.
> - Access the database console at: `http://localhost:8080/h2-console`
> - JDBC URL: `jdbc:h2:file:./data/ecommerce_db`
> - User: `sa`
> - Password: (empty)

> **Build Tool**: You need **Maven** installed to run `mvn spring-boot:run`. If you don't have it, open this project in **IntelliJ IDEA** or **Eclipse**, which have Maven built-in.
