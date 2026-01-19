import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/context';
import { UserResponse, OrderResponse, isUserResponse, isOrderResponse } from '../support/interfaces';

/**
 * When step: Retrieve user information
 * Makes a GET request to fetch user data by ID
 */
When('the client retrieves user {string}', async function (this: CustomWorld, userId: string) {
  if (!this.userRequest) {
    throw new Error('User Service request context not initialised');
  }
  
  // Make GET request to retrieve user information
  // Using the userId parameter from the step definition
  this.userResponse = await this.userRequest.get(`/users/${userId}`);
  
  // Parse and validate the response body structure
  const responseBody = await this.userResponse.json();
  
  // Strict validation: Ensure response matches UserResponse interface
  // This catches any structural changes or missing fields early
  if (!isUserResponse(responseBody)) {
    throw new Error(`Invalid user response structure: ${JSON.stringify(responseBody)}`);
  }
  
  // Store validated user data in World object for use in Then steps
  this.userData = responseBody;
});

/**
 * When step: Retrieve active orders for a user
 * Makes a GET request to fetch orders filtered by userId
 */
When('the client retrieves active orders for user {string}', async function (this: CustomWorld, userId: string) {
  // Validate that Order Service request context is initialised
  if (!this.orderRequest) {
    throw new Error('Order Service request context not initialised');
  }
  
  // Make GET request with userId query parameter
  // Filters orders to only return those for the specified user
  this.ordersResponse = await this.orderRequest.get(`/orders?userId=${userId}`);
  
  // Parse the response body
  const responseBody = await this.ordersResponse.json();
  
  // Strict validation: Ensure response is an array of OrderResponse objects
  // Validates the structure matches the svc spec
  if (!Array.isArray(responseBody)) {
    throw new Error(`Expected orders response to be an array, got: ${typeof responseBody}`);
  }
  
  // Validate each order in the array matches the OrderResponse interface
  // Ensures all orders have the required fields (orderId, userId, amount)
  responseBody.forEach((order, index) => {
    if (!isOrderResponse(order)) {
      throw new Error(`Invalid order structure at index ${index}: ${JSON.stringify(order)}`);
    }
  });
  
  // Store validated orders data in World object for use in Then steps
  this.ordersData = responseBody as OrderResponse[];
});

/**
 * When step: Create a new order
 * Makes a POST request to create an order with userId and amount
 */
When('the client creates a new order for user {string} with amount {string}', async function (this: CustomWorld, userId: string, amount: string) {
  // Validate that Order Service request context is initialised
  if (!this.orderRequest) {
    throw new Error('Order Service request context not initialised');
  }
  
  // Parse amount to number for strict type validation
  const amountNumber = parseFloat(amount);
  
  // Strict validation: Ensure amount is a valid number
  if (isNaN(amountNumber)) {
    throw new Error(`Invalid amount value: ${amount}`);
  }
  
  // Make POST request to create a new order
  // Request body matches the API specification: { userId, amount }
  this.orderResponse = await this.orderRequest.post('/orders', {
    data: {
      userId: parseInt(userId, 10),
      amount: amountNumber,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Parse and validate the response body structure
  const responseBody = await this.orderResponse.json();
  
  // Strict validation: Ensure response matches OrderResponse interface
  // This validates the created order has all required fields
  if (!isOrderResponse(responseBody)) {
    throw new Error(`Invalid order response structure: ${JSON.stringify(responseBody)}`);
  }
  
  // Store validated order data in World object for use in Then steps
  this.orderData = responseBody;
});

