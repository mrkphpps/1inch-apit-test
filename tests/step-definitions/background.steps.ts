import { Given } from '@cucumber/cucumber';
import { APIRequestContext, request } from '@playwright/test';
import { context } from '../support/context';

/**
 * Step: Set up the User Service URL
 * base URL for all User Service API calls
 */
Given('the User Service is available at {string}', async (url: string) => {
  // Store the User Service URL in the test context
  context.userServiceUrl = url;
  
  // Create a PW API request context for User Service
  // This contxt manages cookies, headers, and other request settings
  context.userRequest = await request.newContext({
    baseURL: url,
  });
});

/**
 * Step: Set up the Order Service URL
 * base URL for all Order Service API calls
 */
Given('the Order Service is available at {string}', async (url: string) => {
  // Store the Order Service URL in the test context
  context.orderServiceUrl = url;
  
  // Create a Playwright API request context for Order Service
  // This context manages cookies, headers, and other request settings
  context.orderRequest = await request.newContext({
    baseURL: url,
  });
});

/**
 * Step: Verify that a user exists
 * Step ensures the user is available befre running scenarios
 */
Given('a user with id {string} exists', async (userId: string) => {
  // Store the user ID for use in subsequent steps
  context.userId = userId;
  
  // Verify the user exists by making a GET request
  if (!context.userRequest) {
    throw new Error('User Service request context not initialised');
  }
  
  const response = await context.userRequest.get(`/users/${userId}`);
  
  // Strict assertion: User must exist (HTTP 200) for tests to proceed
  // If it doesn't exist, the test should fail early
  if (response.status() !== 200) {
    throw new Error(`User with id ${userId} does not exist. Status: ${response.status()}`);
  }
});

