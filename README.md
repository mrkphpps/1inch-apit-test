# 1inch API Test - User and Order Services

Two Express/TypeScript microservices implementing User and Order APIs per the exercise spec.

## Services

### User Service (Port 3001)
- `GET /users/:id` - Retrieve user info

### Order Service (Port 3002)
- `GET /orders?userId=:id` - Retrieve active orders for a user
- `POST /orders` - Create a new order

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Services Locally

(one per terminal window)

**User Service:**
```bash
npm run dev:user
# or
cd user-service && npm run dev
```

**Order Service:**
```bash
npm run dev:order
# or
cd order-service && npm run dev
```

### Build Services
```bash
npm run build
```

## Docker

### Build and Run with Docker Compose
```bash
docker-compose up --build
```

This will start both services:
- User Service: http://localhost:3001
- Order Service: http://localhost:3002

## Testing

The project includes Playwright API tests with Cucumber/Gherkin BDD format.

### Prerequisites

Before running tests, ensure both services are running:


Use compose:
```bash
docker-compose up
```

### Run Tests

**Standard output:**
```bash
npm test
```

**Pretty formatted output:**
```bash
npm run test:pretty
```

### Test Structure

Tests are located in the `tests/` directory:
- `tests/features/` - Gherkin feature files (.feature)
- `tests/step-definitions/` - Step definition implementations
- `tests/support/` - Test utilities, interfaces, and World object

The project uses Cucumber's **World object pattern** for test state management:
- Each scenario gets its own isolated `CustomWorld` instance
- The World object stores shared state (API contexts, responses, data) between step definitions
- This ensures test isolation and follows Cucumber best practices
- The World class is defined in `tests/support/context.ts` and registered in `tests/support/world-setup.ts`

### Test Scenarios

The test suite validates:
- **Get User Information**: Retrieves user data and active orders, validates response structure and status codes
- **Place a new order**: Creates a new order and validates the response contains requird fields

Tests use strict assertions with TypeScript interface-based validators to ensure svc contract complaince.

