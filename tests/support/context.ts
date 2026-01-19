import { World } from '@cucumber/cucumber';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserResponse, OrderResponse } from './interfaces';

/**
 * Custom World class to store shared state between step definitions
 * This allows us to pass data between Given/When/Then steps using the World object
 * Each scenario gets its own World instance, ensuring test isolation
 */
export class CustomWorld extends World {
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

