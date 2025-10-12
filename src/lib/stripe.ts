import { loadStripe, Stripe } from '@stripe/stripe-js';
import { config } from './config';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.stripe.publishableKey);
  }
  return stripePromise;
};

// Stripe price IDs for different plans
export const STRIPE_PRICE_IDS = {
  FREE: null, // Free plan doesn't need Stripe
  PRO: 'price_1SASw8Jt7YIMwIlqpJhjiK34', // Votre Price ID Stripe
} as const;

export interface CreateCheckoutSessionParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

// Create a checkout session (calls your backend)
export const createCheckoutSession = async (params: CreateCheckoutSessionParams) => {
  try {
    const apiBaseUrl = config.api.baseURL || window.location.origin;
    const response = await fetch(`${apiBaseUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    throw error;
  }
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (priceId: string, planName: string) => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Create checkout session with proper URLs
    const successUrl = `${window.location.origin}/success`;
    const cancelUrl = `${window.location.origin}/cancel`;

    // For demo purposes, we'll create a mock checkout session
    // In production, this should come from your backend API
    const mockSession = {
      id: `cs_test_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/cs_test_${Date.now()}`,
    };

    // In a real implementation, you would call your backend to create the session:
    /*
    const session = await createCheckoutSession({
      priceId,
      successUrl,
      cancelUrl,
      metadata: {
        planName,
        userId: 'current-user-id' // Get from your auth system
      }
    });
    */

    // Create checkout session via backend
    const session = await createCheckoutSession({
      priceId,
      successUrl,
      cancelUrl,
      metadata: {
        planName,
        userId: 'current-user-id' // TODO: Get user ID from auth context
      }
    });

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ 
      sessionId: session.id 
    });

    if (error) {
      throw error;
    }

  } catch (error) {
    throw error;
  }
};

// Handle successful payment
export const handlePaymentSuccess = (sessionId: string) => {
  // Here you would typically:
  // 1. Verify the payment with your backend
  // 2. Update user's subscription status
  // 3. Redirect to dashboard or success page
};

// Handle cancelled payment
export const handlePaymentCancel = () => {
  // Redirect back to pricing page or show cancellation message
};
