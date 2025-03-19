# NordVPN API Tests

Automated test suite for NordVPN's IP Insights API endpoint. This project provides comprehensive testing of the geolocation data API functionality.

## Features

- 10 automated test cases covering:
  - Response status validation
  - Data structure verification
  - Data type checking
  - IP format validation
  - Geographic coordinates validation
  - Response time monitoring
  - Headers validation
  - ISO country code verification
  - City data validation
  - Error handling

## Technology Stack

- Node.js
- Jest (Testing Framework)
- Axios (HTTP Client)
- GitHub Actions (CI/CD)
- dotenv (Environment Configuration)

## Setup

1. Clone the repository:
git clone https://github.com/agnieszkaskubiszewska/NS.git
cd NS
2. Install dependencies:
npm install
3. Set up environment variables:
cp .env.example .env

## Run tests:
npm test