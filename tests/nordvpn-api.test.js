const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL;

describe('NordVPN API Tests', () => {
  // Test 1: Check if the endpoint returns a 200 status
  test('should return a 200 status', async () => {
    const response = await axios.get(API_URL);
    console.log(response.status);
    console.log(response.data);
    expect(response.status).toBe(200);
  });

  // Test 2: Check response structure
  test('should return correct data structure', async () => {
    const response = await axios.get(API_URL);
    const data = response.data;
    
    expect(data).toHaveProperty('ip');
    expect(data).toHaveProperty('country');
    expect(data).toHaveProperty('city');
    expect(data).toHaveProperty('latitude');
    expect(data).toHaveProperty('longitude');
  });

  // Test 3: Check data types
  test('should return correct data types', async () => {
    const response = await axios.get(API_URL);
    const data = response.data;
    
    expect(typeof data.ip).toBe('string');
    expect(typeof data.country).toBe('string');
    expect(typeof data.city).toBe('string');
    expect(typeof data.latitude).toBe('number');
    expect(typeof data.longitude).toBe('number');
  });

  // Test 4: Check IP format
  test('should return valid IP format', async () => {
    const response = await axios.get(API_URL);
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    expect(response.data.ip).toMatch(ipRegex);
  });

  // Test 5: Check if geographic coordinates are within valid range
  test('should return valid geographic coordinates', async () => {
    const response = await axios.get(API_URL);
    const { latitude, longitude } = response.data;
    
    expect(latitude).toBeGreaterThanOrEqual(-90);
    expect(latitude).toBeLessThanOrEqual(90);
    expect(longitude).toBeGreaterThanOrEqual(-180);
    expect(longitude).toBeLessThanOrEqual(180);
  });

  // Test 6: Check response time
  test('should respond within reasonable time', async () => {
    const start = Date.now();
    await axios.get(API_URL);
    const timeElapsed = Date.now() - start;
    
    expect(timeElapsed).toBeLessThan(2000); // max 2 seconds
  });

  // Test 7: Check response headers
  test('should return correct headers', async () => {
    const response = await axios.get(API_URL);
    
    expect(response.headers['content-type']).toContain('application/json');
  });

  // Test 8: Check if country has ISO code
  test('should contain valid ISO country code', async () => {
    const response = await axios.get(API_URL);
    const isoCountryCodeRegex = /^[A-Z]{2}$/;
    
    expect(response.data.country_code).toMatch(isoCountryCodeRegex);
  });

  // Test 9: Check if city is not empty
  test('should return non-empty city name', async () => {
    const response = await axios.get(API_URL);
    
    expect(response.data.city).not.toBe('');
    expect(response.data.city.length).toBeGreaterThan(0);
  });

  // Test 10: Check error handling for invalid URL
  test('should handle invalid URL properly', async () => {
    const invalidUrl = 'https://api.nordvpn.com/v1/invalid-endpoint';
    
    await expect(axios.get(invalidUrl)).rejects.toThrow();
  });
}); 