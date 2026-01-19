import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/context';
import { UserResponse, OrderResponse, isUserResponse, isOrderResponse } from '../support/interfaces';

/**
 * Helper function to parse field names from Cucumber step parameters
 * Removes quotes and trims whitespace from each field name
 * @param fields - Variable number of field name strings from Cucumber
 * @returns Array of cleaned field names
 */
function parseFieldNames(...fields: string[]): string[] {
  return fields.map(f => f.trim().replace(/"/g, ''));
}

/**
 * Then step: Validate user response status and fields
 * As requested in exercise, performing strict assertions
 */
Then(
  'the user response should have status HTTP {int} and fields {string}, {string}, {string}',
  async function (this: CustomWorld, expectedStatus: number, field1: string, field2: string, field3: string) {
    // Strict assertion: User response must exist
    // If this fails, it means the When step didn't execute properly
    if (!this.userResponse) {
      throw new Error('User response is null. Ensure the user retrieval step executed successfully.');
    }
    
    // Strict assertion: HTTP status code must match exactly
    // This validates the API returned the expected status code
    expect(this.userResponse.status(), 
      `Expected HTTP status ${expectedStatus}, but got ${this.userResponse.status()}`
    ).toBe(expectedStatus);
    
    // Parse field names from step definition parameters
    const expectedFields = parseFieldNames(field1, field2, field3);
    
    // Strict assertion: User data must exist and be validated
    if (!this.userData) {
      throw new Error('User data is null. Ensure the user retrieval step executed successfully.');
    }
    
    // Strict validation: Verify response matches UserResponse interface
    if (!isUserResponse(this.userData)) {
      throw new Error(`User data does not match UserResponse interface: ${JSON.stringify(this.userData)}`);
    }
    
    // Store validated user data in local variable for TypeScript type narrowing
    const userData: UserResponse = this.userData;
    
    // Strict assertion: Verify each expected field exists in the response
    expectedFields.forEach(field => {
      expect(userData, 
        `User response should contain field '${field}'`
      ).toHaveProperty(field);
      
      // extra assertion: Field value must not be null or undefined
      expect(userData[field as keyof UserResponse], 
        `Field '${field}' should not be null or undefined`
      ).toBeDefined();
    });
    
    // Strict assertion: Verify field types match the interface
    // This ensures data integrity and type safety
    expect(typeof userData.id, 'User id should be a number').toBe('number');
    expect(typeof userData.name, 'User name should be a string').toBe('string');
    expect(typeof userData.email, 'User email should be a string').toBe('string');
  }
);

/**
 * Then step: Validate orders response status
 */
Then('the orders response should have status HTTP {int}', async function (this: CustomWorld, expectedStatus: number) {
  // Strict assertion: Orders response must exist
  if (!this.ordersResponse) {
    throw new Error('Orders response is null. Ensure the orders retrieval step executed successfully.');
  }
  
  // Strict assertion: HTTP status code must match exactly
  expect(this.ordersResponse.status(), 
    `Expected HTTP status ${expectedStatus}, but got ${this.ordersResponse.status()}`
  ).toBe(expectedStatus);
  
  // Strict assertion: Orders data must exist
  if (!this.ordersData) {
    throw new Error('Orders data is null. Ensure the orders retrieval step executed successfully.');
  }
  
  // Strict assertion: Response should be an array
  expect(Array.isArray(this.ordersData), 
    'Orders response should be an array'
  ).toBe(true);
});

/**
 * Then step: Validate order response status and fields
 * As requested in exercise, performing strict assertions
 */
Then(
  'the order response should have status HTTP {int} and fields {string}, {string}, {string} in the response',
  async function (this: CustomWorld, expectedStatus: number, field1: string, field2: string, field3: string) {
    // Strict assertion: Order response must exist
    if (!this.orderResponse) {
      throw new Error('Order response is null. Ensure the order creation step executed successfully.');
    }
    
    // Strict assertion: HTTP status code must match exactly
    expect(this.orderResponse.status(), 
      `Expected HTTP status ${expectedStatus}, but got ${this.orderResponse.status()}`
    ).toBe(expectedStatus);
    
    // Parse field names from step definition parameters
    const expectedFields = parseFieldNames(field1, field2, field3);
    
    // Strict assertion: Order data must exist and be validated
    if (!this.orderData) {
      throw new Error('Order data is null. Ensure the order creation step executed successfully.');
    }
    
    // Strict validation: Verify response matches OrderResponse interface
    if (!isOrderResponse(this.orderData)) {
      throw new Error(`Order data does not match OrderResponse interface: ${JSON.stringify(this.orderData)}`);
    }
    
    // Store validated order data in local variable
    const orderData: OrderResponse = this.orderData;
    
    // Strict assertion: Verify each expected field exists in the response
    expectedFields.forEach(field => {
      expect(orderData, 
        `Order response should contain field '${field}'`
      ).toHaveProperty(field);
      
      // Additional strict assertion: Field value must not be null or undefined
      expect(orderData[field as keyof OrderResponse], 
        `Field '${field}' should not be null or undefined`
      ).toBeDefined();
    });
    
    // Strict assertion: Verify field types match the interface
    expect(typeof orderData.orderId, 'Order orderId should be a number').toBe('number');
    expect(typeof orderData.userId, 'Order userId should be a number').toBe('number');
    expect(typeof orderData.amount, 'Order amount should be a number').toBe('number');
    
    // Strict assertion: Verify orderId is a positive integer
    expect(orderData.orderId, 
      'Order orderId should be a positive number'
    ).toBeGreaterThan(0);
    
    // Strict assertion: Verify amount is a valid number (can be positive decimal)
    expect(orderData.amount, 
      'Order amount should be a valid number'
    ).toBeGreaterThanOrEqual(0);
  }
);

