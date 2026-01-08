import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserResponse, OrderResponse } from './interfaces';

/**
 * Test context to store shared state between step definitions
 * Menas we can pass data between Given/When/Then steps
 */
export class TestContext {
  public userServiceUrl: string = '';
  public orderServiceUrl: string = '';
  public userId: string = '';
  public userRequest: APIRequestContext | null = null;
  public orderRequest: APIRequestContext | null = null;
  public userResponse: APIResponse | null = null;
  public ordersResponse: APIResponse | null = null;
  public orderResponse: APIResponse | null = null;
  public userData: UserResponse | null = null;
  public ordersData: OrderResponse[] | null = null;
  public orderData: OrderResponse | null = null;
}

// Global context instance
export const context = new TestContext();

