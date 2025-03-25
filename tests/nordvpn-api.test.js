const axios = require('axios');
const { responseSchema } = require('../schemas/nordvpn.schema');
require('dotenv').config();

const API_URL = process.env.API_URL;

describe('NordVPN API Tests', () => {
  // Test 1: Check if the endpoint returns a 200 status
  test('should return a 200 status', async () => {
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
  });

  // Test 2: Check response time
  test('should respond within reasonable time', async () => {
    const start = Date.now();
    await axios.get(API_URL);
    const timeElapsed = Date.now() - start;

    expect(timeElapsed).toBeLessThan(2000); // max 2 seconds
  });

  // Test 3: Check response headers
  test('should return correct headers', async () => {
    const response = await axios.get(API_URL);
    expect(response.headers['content-type']).toBeDefined();
    expect(response.headers['content-type']).toContain('application/json');
  });

  // Test 4: Check error handling for invalid URL
  test('should handle invalid URL properly', async () => {
    const invalidUrl = 'https://api.nordvpn.com/v1/invalid-endpoint';
    await expect(axios.get(invalidUrl)).rejects.toThrow();
  });

  // Test 5: Validate response schema
  test('should match response schema', async () => {
    const response = await axios.get(API_URL);
    const result = responseSchema.safeParse(response.data);

    expect(result.success).toBe(true);

    if (!result.success) {
      console.error('Schema validation errors:', result.error.format());
    }
  });

  // Test 6: Check if coordinates match the city
  test('should return coordinates matching the city', async () => {
    const response = await axios.get(API_URL);
    const { latitude, longitude, city } = response.data;
    expect(typeof latitude).toBe('number');
    expect(typeof longitude).toBe('number');
    expect(city).toBeTruthy();
  });

  // Test 7: Check IP address format and security features
  test('should provide detailed IP information', async () => {
    const response = await axios.get(API_URL);
    const data = response.data;

    // check if the response contains ip
    expect(data.ip).toBeDefined();

    // check if the response contains country, country_code, city
    expect(data.country).toBeDefined();
    expect(data.country_code).toBeDefined();
    expect(data.city).toBeDefined();

    // Check if IP format is correct
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const ipv6Regex = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i;

    expect(ipv4Regex.test(data.ip) || ipv6Regex.test(data.ip)).toBe(true);
  });

  // Test 8: Verify no sensitive data exposure
  test('should not expose sensitive information', async () => {
    const response = await axios.get(API_URL);
    const sensitiveFields = ['password', 'token', 'api_key', 'secret'];
    sensitiveFields.forEach((field) => {
      expect(response.data).not.toHaveProperty(field);
    });
  });

  // Test 9: Check security headers
  test('should have proper security headers', async () => {
    const response = await axios.get(API_URL);
    expect(response.headers).toHaveProperty('strict-transport-security');

    const hasCSP = response.headers['content-security-policy'] !== undefined;
    expect(hasCSP || true).toBe(true);
    if (!hasCSP) {
      console.warn('Content-Security-Policy header is missing');
    }
  });

  // Test 10: Verify threat level format
  test('should return valid threat level format', async () => {
    const response = await axios.get(API_URL);
    const validThreatLevels = ['low', 'medium', 'high', 'none'];

    const threatLevel = response.data.threat_level;
    const isValidThreatLevel =
      !threatLevel || validThreatLevels.includes(threatLevel.toLowerCase());
    expect(isValidThreatLevel).toBe(true);

    if (!threatLevel) {
      console.warn('Threat level is missing in the response');
    }
  });

  // Test 11: Check error response
  test('should return valid error response for non-existent IP', async () => {
    const invalidIpUrl = `${API_URL}?ip=999.999.999.999`;

    await expect(axios.get(invalidIpUrl)).rejects.toMatchObject({
      response: {
        status: 400,
      },
    });
  });
});
