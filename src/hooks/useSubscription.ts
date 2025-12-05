import * as React from "react";

// Mock types to replace Stellar SDK types
export interface MockEventResponse {
  type: string;
  contractId: string;
  topic: string[];
  value: any;
}

/**
 * Valid subscription topics for the contract
 */
export type ContractTopic = string;

/**
 * Mock subscription hook that simulates listening to contract events.
 * Since we are removing the Stellar SDK, this will currently just log
 * the subscription attempt and do nothing, or we could add simulation logic later.
 */
export function useSubscription(
  contractId: string,
  topic: string,
  onEvent: (event: MockEventResponse) => void,
  pollInterval = 5000,
) {
  React.useEffect(() => {
    console.log(`[Mock Subscription] Subscribed to ${contractId}:${topic} (polling every ${pollInterval}ms)`);

    // Here we could simulate events firing if needed for testing UI
    /*
    const interval = setInterval(() => {
      // Simulate an event
    }, pollInterval);
    return () => clearInterval(interval);
    */

    return () => {
      console.log(`[Mock Subscription] Unsubscribed from ${contractId}:${topic}`);
    };
  }, [contractId, topic, pollInterval]);

  return {};
}
