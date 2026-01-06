# User Guide: E-commerce API

## 1. How to Start the Application

You can start the application using the Maven wrapper included in the project.

**Terminal Command:**
```powershell
./mvnw spring-boot:run
```

**What to expect:**
- You will see Spring Boot logs appearing in the terminal.
- Look for `Started EcommerceApiApplication in ... seconds` to confirm it's running.
- The server will list on port `8080`.

## 2. Docker Desktop

**Question:** "What should I see on Docker Desktop?"

**Current State:**
- Your `docker-compose.yml` is configured to start **PostgreSQL** (port 5432) and **Redis** (port 6379).
- **HOWEVER**: Your `src/main/resources/application.yml` is currently configured to use a **file-based H2 database**, NOT the Docker PostgreSQL database.

**Explanation:**
- If you run `docker-compose up -d`, you will see two containers in Docker Desktop: `ecommerce_db` and `ecommerce_redis`.
- The running application will **NOT** use them in its current configuration. It will use a local file `data/ecommerce_db` for persistence.
- This means data **WILL** potentially persist across restarts if the file is not deleted.
- If you want to use the Docker database, you would need to update `application.yml` to point to `jdbc:postgresql://localhost:5432/ecommerce_db`.

## 3. Postman Configuration

To test the API, configure Postman as follows:

1.  **Create a Collection**: Name it "Ecommerce API".
2.  **Set a Variable (Optional)**: Set `baseUrl` to `http://localhost:8080/api/v1`.

### Endpoints & Responses

#### A. Register User
**Method:** `POST`
**URL:** `http://localhost:8080/api/v1/auth/register`
**Body (JSON):**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "CUSTOMER" // Optional: CUSTOMER (default) or ADMIN
}
```
**Expected Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```
> [!IMPORTANT]
> **Copy ONLY the token string** (starting with `eyJ...`). Do not copy the curly braces `{` or the key `"token":`.
>
> **Troubleshooting 403 Forbidden:**
> 1. **Check Token**: Ensure you pasted *only* the long string into the "Bearer Token" field.
> 2. **Did you restart the app?** Since the app uses an in-memory database (H2), **restarting the app deletes all users**. You valid token from before the restart will no longer work because the user doesn't exist anymore. You must **Register** again after every restart.

#### B. Authenticate (Login)
**Method:** `POST`
**URL:** `http://localhost:8080/api/v1/auth/authenticate`
**Body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
**Expected Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

#### C. Create Product (Requires Auth)
**Method:** `POST`
**URL:** `http://localhost:8080/api/v1/products`
**Authorization:** Select "Bearer Token" and paste the token from the Register/Login step.
**Body (JSON):**
```json
{
  "name": "Smartphone",
  "description": "Latest model",
  "price": 999.99,
  "categoryId": null
}
```
**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Smartphone",
  "description": "Latest model",
  "price": 999.99,
  "categoryName": null
}
```

#### D. Place Order (Requires Auth)
**Method:** `POST`
**URL:** `http://localhost:8080/api/v1/orders`
**Authorization:** Select "Bearer Token" and paste the token from the Register/Login step.
**Body (JSON):**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```
**Expected Response (200 OK):**
```
Order placed successfully
```
