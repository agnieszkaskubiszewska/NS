# NordVPN API Tests

Automated test suite for NordVPN's IP Insights API endpoint. This project provides comprehensive testing of the geolocation data API functionality.

## Features

This test suite includes **11 automated test cases** covering:

### Functional Testing:

- ✅ Response status validation
- ✅ Data structure verification using Zod
- ✅ IP format validation (IPv4 & IPv6)
- ✅ Geographic coordinates validation

### Security Testing:

- 🔒 Security headers verification
- 🔒 Sensitive data exposure checks
- 🔒 Threat level validation

### Performance & Error Handling:

- ⚡ Response time monitoring
- ⚠️ Error handling for invalid requests
- ❌ Invalid IP handling
- 📋 Headers validation

## Technology Stack

- **Node.js** - Runtime environment
- **Jest** - Testing framework
- **Axios** - HTTP client for API requests
- **Zod** - Schema validation
- **ESLint & Prettier** - Code quality and formatting
- **Husky & lint-staged** - Git hooks for enforcing standards

## Setup

1. Clone the repository:

```bash
git clone https://github.com/agnieszkaskubiszewska/NS.git
cd NS

```

2. Install dependencies:

```bash
npm install

```

3. Create a .env file and set the API endpoint:

```bash
+ cp .env.example .env
+ # Then edit .env with your API endpoint
```

## Available Scripts

- `npm test` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## CI/CD

This project uses **GitHub Actions** for continuous integration, including:

- ✅ Running tests on push and pull requests
- ✅ Enforcing code quality checks (ESLint & Prettier)
- ✅ Generating test coverage reports
- ✅ Storing test artifacts
- ✅ Scheduled runs every 12 hours

## Development

- Code formatting and linting run automatically on commit
- Tests must pass before pushing
- Coverage reports are generated after test runs

## Project Structure

- ├── tests/
- │ └── nordvpn-api.test.js # Test suite
- ├── schemas/
- │ └── nordvpn.schema.js # Zod schema validation
- ├── .github/workflows/
- │ └── test.yml # CI/CD configuration
- ├── .env.example # Environment template
- ├── .eslintrc.js # ESLint configuration
- ├── .prettierrc # Prettier configuration
- └── package.json # Project
