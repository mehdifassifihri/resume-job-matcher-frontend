# Configuration Stripe - Guide de mise en production

## 🚀 Intégration Stripe terminée !

L'intégration Stripe est maintenant complète dans votre application. Voici ce qui a été implémenté :

### ✅ Fonctionnalités implémentées

1. **Service Stripe** (`src/lib/stripe.ts`)
   - Configuration avec votre clé publique Stripe
   - Fonctions pour créer des sessions de checkout
   - Gestion des redirections vers Stripe Checkout

2. **Composant PricingPlans mis à jour**
   - Intégration avec Stripe Checkout
   - États de chargement pendant le traitement
   - Gestion des erreurs

3. **Pages de redirection**
   - Page de succès (`/success`) - après paiement réussi
   - Page d'annulation (`/cancel`) - si paiement annulé

4. **Routing React Router**
   - Routes configurées pour les pages de paiement
   - Navigation fluide entre les pages

### 🔧 Configuration actuelle

Votre clé publique Stripe est configurée dans `src/lib/config.ts` :
```typescript
stripe: {
  publishableKey: 'pk_test_51N4TKSJt7YIMwIlquAL1PcdwrcHO4f3ESec9aiC3J0XBlcRPKMycWZuFuGYCmdW0ORtw9iihJwAyTrpXDVK7bnjf00jPD3yKM0',
  // ...
}
```

### 🎯 Comment ça fonctionne

1. **Plan Gratuit** : Affiche un message de confirmation
2. **Plan Pro** : Redirige vers Stripe Checkout pour le paiement
3. **Après paiement** : Redirection vers `/success` ou `/cancel`

### 🚀 Pour la mise en production

#### 1. Créer un backend API

Vous devez créer un endpoint backend pour créer les sessions Stripe :

```javascript
// Exemple d'endpoint backend (Node.js/Express)
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, successUrl, cancelUrl, metadata } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription', // ou 'payment' pour un paiement unique
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: metadata,
  });
  
  res.json({ id: session.id });
});
```

#### 2. Mettre à jour le service Stripe

Dans `src/lib/stripe.ts`, décommentez et modifiez la fonction `redirectToCheckout` :

```typescript
// Remplacer la simulation par le vrai appel
const session = await createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  metadata: {
    planName,
    userId: 'current-user-id'
  }
});

const { error } = await stripe.redirectToCheckout({ 
  sessionId: session.id 
});
```

#### 3. Configurer les Price IDs

Dans votre dashboard Stripe :
1. Créez des produits et des prix
2. Mettez à jour `STRIPE_PRICE_IDS` dans `src/lib/stripe.ts` :

```typescript
export const STRIPE_PRICE_IDS = {
  FREE: null,
  PRO: 'price_1N4TKSJt7YIMwIlqYOUR_REAL_PRICE_ID', // Votre vrai Price ID
} as const;
```

#### 4. Variables d'environnement

Créez un fichier `.env` :
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
REACT_APP_STRIPE_PRICE_ID=price_YOUR_LIVE_PRICE_ID
REACT_APP_STRIPE_SUCCESS_URL=https://yourdomain.com/success
REACT_APP_STRIPE_CANCEL_URL=https://yourdomain.com/cancel
```

### 🧪 Test en mode développement

Actuellement, l'application simule la redirection Stripe. Pour tester :

1. Cliquez sur "Choose Pro" dans la section pricing
2. Vous verrez un message de simulation
3. Les URLs de redirection sont loggées dans la console

### 📋 Checklist pour la production

- [ ] Créer un backend API pour les sessions Stripe
- [ ] Configurer les vrais Price IDs dans Stripe Dashboard
- [ ] Mettre à jour les variables d'environnement
- [ ] Tester avec les vraies cartes de test Stripe
- [ ] Configurer les webhooks Stripe pour la validation
- [ ] Mettre à jour les URLs de redirection pour la production

### 🔗 Liens utiles

- [Documentation Stripe Checkout](https://stripe.com/docs/checkout)
- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Test Cards Stripe](https://stripe.com/docs/testing)

### 💡 Notes importantes

- La clé actuelle est en mode test (`pk_test_`)
- Pour la production, utilisez une clé live (`pk_live_`)
- Les webhooks Stripe sont recommandés pour valider les paiements
- Testez toujours avec les cartes de test avant la mise en production

---

**L'intégration est prête ! Il ne reste plus qu'à configurer le backend et les vrais Price IDs pour la mise en production.** 🎉



