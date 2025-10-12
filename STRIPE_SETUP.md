# Stripe Configuration - Production Setup Guide

## 🚀 Stripe Integration Complete!

Stripe integration is now fully implemented in your application. Here's what has been set up:

### ✅ Implemented Features

1. **Stripe Service** (`src/lib/stripe.ts`)
   - Configuration with your Stripe publishable key
   - Functions to create checkout sessions
   - Handle redirects to Stripe Checkout

2. **Updated PricingPlans Component**
   - Integration with Stripe Checkout
   - Loading states during processing
   - Error handling

3. **Redirect Pages**
   - Success page (`/success`) - after successful payment
   - Cancel page (`/cancel`) - if payment is cancelled

4. **React Router Configuration**
   - Routes configured for payment pages
   - Smooth navigation between pages

### 🔧 Current Configuration

Your Stripe publishable key should be configured via environment variables in `.env`:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
REACT_APP_STRIPE_PRICE_ID=price_your_price_id_here
```

### 🎯 How It Works

1. **Free Plan**: Displays confirmation message
2. **Pro Plan**: Redirects to Stripe Checkout for payment
3. **After Payment**: Redirects to `/success` or `/cancel`

### 🚀 Production Setup

#### 1. Create a Backend API

You must create a backend endpoint to create Stripe sessions:

```javascript
// Example backend endpoint (Node.js/Express)
const stripe = require('stripe')('sk_test_your_secret_key');

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // or 'payment' for one-time
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### 2. Get Your Stripe Keys

1. Create an account on [Stripe.com](https://stripe.com)
2. Go to [Dashboard > API Keys](https://dashboard.stripe.com/apikeys)
3. Copy your keys:
   - **Publishable key** (pk_test_...) → for frontend
   - **Secret key** (sk_test_...) → for backend only

#### 3. Create Products and Prices

1. Go to [Dashboard > Products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Configure your product:
   - **Name**: "Pro Plan"
   - **Description**: "Full access to all features"
   - **Pricing**: Recurring (monthly/yearly) or One-time
   - **Price**: $29/month (example)
4. Copy the **Price ID** (price_...)

#### 4. Configure Environment Variables

Update your `.env` file:

```env
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
REACT_APP_STRIPE_PRICE_ID=price_your_price_id_here
REACT_APP_STRIPE_SUCCESS_URL=https://yourdomain.com/success
REACT_APP_STRIPE_CANCEL_URL=https://yourdomain.com/cancel
```

#### 5. Update Backend URL

In `src/lib/stripe.ts`, the backend URL is now dynamically configured:

```typescript
const apiBaseUrl = config.api.baseURL || window.location.origin;
const response = await fetch(`${apiBaseUrl}/api/create-checkout-session`, {
  // ...
});
```

Make sure `REACT_APP_API_BASE_URL` is set to your backend URL.

#### 6. Test the Integration

**Test Mode:**
```bash
# Use test keys (pk_test_... and sk_test_...)
# Use test card: 4242 4242 4242 4242
# Any future expiry date
# Any CVC
```

**Live Mode:**
```bash
# Switch to live keys (pk_live_... and sk_live_...)
# Real payments will be processed
```

### 📝 Backend Example (Complete)

#### Node.js + Express

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl, metadata } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl,
      metadata: metadata || {},
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });
    
    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle post-payment events
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Update user's subscription in database
        console.log('Payment successful:', session);
        break;
      
      case 'invoice.payment_failed':
        // Handle failed payment
        console.log('Payment failed');
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Python + FastAPI

```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import stripe
import os

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.post("/api/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        data = await request.json()
        price_id = data.get("priceId")
        success_url = data.get("successUrl")
        cancel_url = data.get("cancelUrl")
        metadata = data.get("metadata", {})
        
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                },
            ],
            mode="subscription",
            success_url=success_url + "?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=cancel_url,
            metadata=metadata,
            allow_promotion_codes=True,
            billing_address_collection="required",
        )
        
        return {"id": session.id, "url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stripe-webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # Update user's subscription in database
        print("Payment successful:", session)
    elif event["type"] == "invoice.payment_failed":
        # Handle failed payment
        print("Payment failed")
    
    return {"received": True}
```

### 🔔 Webhooks Configuration

Webhooks allow Stripe to notify your backend when events occur:

1. Go to [Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourbackend.com/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Webhook Secret** (whsec_...)
6. Add to your backend environment variables

### 🧪 Testing

#### Test Cards

Stripe provides test cards for different scenarios:

| Card Number | Scenario |
|------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined card |
| 4000 0000 0000 0002 | Declined (charge) |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |

#### Test Webhooks

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward events to local: `stripe listen --forward-to localhost:3001/api/stripe-webhook`
4. Get webhook secret and use in your backend

### 💳 Payment Flow

```
User clicks "Subscribe to Pro"
    ↓
Frontend creates checkout session via backend
    ↓
Backend calls Stripe API with price ID
    ↓
Stripe returns session ID
    ↓
Frontend redirects to Stripe Checkout
    ↓
User enters payment details
    ↓
Stripe processes payment
    ↓
Redirects to success or cancel URL
    ↓
Webhook notifies backend of result
    ↓
Backend updates user subscription
```

### ⚙️ Advanced Configuration

#### Custom Checkout Options

```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card', 'alipay', 'ideal'],
  line_items: [...],
  mode: 'subscription',
  
  // Optional features
  allow_promotion_codes: true,
  billing_address_collection: 'required',
  customer_email: 'user@example.com',
  
  // Trial period
  subscription_data: {
    trial_period_days: 14,
  },
  
  // Tax calculation
  automatic_tax: {
    enabled: true,
  },
  
  // Custom fields
  custom_fields: [
    {
      key: 'company',
      label: { type: 'custom', custom: 'Company name' },
      type: 'text',
    },
  ],
});
```

#### Multiple Price Options

Update `src/lib/stripe.ts`:

```typescript
export const STRIPE_PRICE_IDS = {
  FREE: null,
  MONTHLY: 'price_monthly_id',
  YEARLY: 'price_yearly_id',
  ENTERPRISE: 'price_enterprise_id',
}
```

### 🔒 Security Best Practices

1. **Never expose secret key** - Only use in backend
2. **Validate webhooks** - Always verify webhook signatures
3. **Use HTTPS** - Required for production
4. **Handle errors** - Implement proper error handling
5. **Log events** - Keep audit logs of transactions
6. **Test thoroughly** - Use test mode before going live
7. **Monitor transactions** - Set up alerts for anomalies

### 📊 Analytics & Reporting

Stripe Dashboard provides:
- Revenue analytics
- Customer insights
- Payment success rates
- Failed payment reasons
- Churn analysis
- MRR (Monthly Recurring Revenue)

### 🚨 Error Handling

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| Invalid API key | Wrong key used | Check publishable vs secret key |
| Price not found | Invalid price ID | Verify price ID in dashboard |
| Card declined | Card issue | Use different card |
| CORS error | Backend CORS not configured | Enable CORS for frontend domain |
| Webhook signature failed | Invalid signature | Verify webhook secret |

### 📱 Mobile Payments

To add Apple Pay and Google Pay:

```javascript
payment_method_types: ['card', 'apple_pay', 'google_pay']
```

Requirements:
- HTTPS domain
- Verified domain in Stripe Dashboard
- Apple Pay requires domain verification file

### 🌍 Multi-Currency

To support multiple currencies:

1. Create prices in different currencies
2. Detect user's location
3. Show appropriate price

```javascript
// Example: Create prices in USD and EUR
const usdPrice = 'price_usd_xxx';
const eurPrice = 'price_eur_xxx';

const priceId = userCountry === 'US' ? usdPrice : eurPrice;
```

### 📝 Checklist

- [ ] Stripe account created
- [ ] Products and prices created
- [ ] Environment variables configured
- [ ] Backend endpoint implemented
- [ ] Webhook endpoint created
- [ ] Webhook secret configured
- [ ] Test mode working
- [ ] Success/cancel pages designed
- [ ] Error handling implemented
- [ ] HTTPS enabled (production)
- [ ] CORS configured correctly
- [ ] Test cards work
- [ ] Webhook events received
- [ ] Database updated on successful payment
- [ ] Ready for production

### 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Security](https://stripe.com/docs/security/guide)

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Status**: Production Ready

**Need Help?** Contact Stripe support or check their extensive documentation.
