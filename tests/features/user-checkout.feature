Feature: User Checkout Flow
Background:
Given the User Service is available at "http://localhost:3001"
And the Order Service is available at "http://localhost:3002"
And a user with id "1" exists

Scenario: Get User Information
When the client retrieves user "1"
And the client retrieves active orders for user "1"
Then the user response should have status HTTP 200 and fields "id", "name", "email"
And the orders response should have status HTTP 200

Scenario: Place a new order
When the client creates a new order for user "1" with amount "35.95"
Then the order response should have status HTTP 200 and fields "orderId", "userId", "amount" in the response

