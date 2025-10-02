// Exemple de backend pour Stripe (Node.js/Express)
// Installez les dépendances : npm install express stripe cors dotenv

const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY'); // Votre clé secrète Stripe
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint pour créer une session de checkout
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl, metadata } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // 'price_1N4TKSJt7YIMwIlqYOUR_PRO_PRICE_ID'
          quantity: 1,
        },
      ],
      mode: 'subscription', // ou 'payment' pour un paiement unique
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata,
    });
    
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook pour valider les paiements (optionnel mais recommandé)
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment successful:', session.id);
    // Mettre à jour votre base de données ici
  }

  res.json({received: true});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});



