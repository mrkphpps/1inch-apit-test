/**
 * Interfaces for API response validation
 * These interfaces ensure type safety and structure validation
 */

/**
 * User response interface matching the User Service API specification
 */
export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

/**
 * Order response interface matching the Order Service API specification
 */
export interface OrderResponse {
  orderId: number;
  userId: number;
  amount: number;
}

/**
 * Type guard to validate if an object matches the UserResponse interface
 * @param obj - Object to validate
 * @returns true if object matches UserResponse structure
 */
export function isUserResponse(obj: any): obj is UserResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}

/**
 * Type guard to validate if an object matches the OrderResponse interface
 * @param obj - Object to validate
 * @returns true if object matches OrderResponse structure
 */
export function isOrderResponse(obj: any): obj is OrderResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.orderId === 'number' &&
    typeof obj.userId === 'number' &&
    typeof obj.amount === 'number'
  );
}

/**
 * Type guard to validate if an array contains OrderResponse objects
 * @param arr - Array to validate
 * @returns true if array contains only OrderResponse objects
 */
export function isOrderResponseArray(arr: any): arr is OrderResponse[] {
  return (
    Array.isArray(arr) &&
    arr.every(item => isOrderResponse(item))
  );
}

