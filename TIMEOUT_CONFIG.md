# Configuration du Timeout API

## Problème Résolu

L'erreur `Request timeout - The server took too long to respond` était causée par un timeout trop court (30 secondes) pour l'analyse IA.

## Solutions Implémentées

### 1. Timeout Augmenté
- **Avant** : 30 secondes
- **Maintenant** : 2 minutes (120 secondes)
- **Configuration** : `REACT_APP_API_TIMEOUT=120000`

### 2. Options de Timeout

```env
# Options recommandées
REACT_APP_API_TIMEOUT=30000   # 30 secondes (rapide)
REACT_APP_API_TIMEOUT=60000   # 1 minute (normal)
REACT_APP_API_TIMEOUT=120000  # 2 minutes (recommandé pour IA)
REACT_APP_API_TIMEOUT=0       # Pas de timeout (attention!)
```

### 3. Messages Améliorés

- **Interface** : "AI Analysis in progress... This may take up to 2 minutes"
- **Erreur** : "Request timeout after 120 seconds - The AI analysis is taking longer than expected. Please try again."

## Configuration Recommandée

Pour votre cas d'usage avec l'analyse IA :

```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_API_TIMEOUT=120000
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_MOCK_DATA=false
```

## Test avec Postman vs Frontend

### Postman
- Pas de timeout par défaut
- Peut attendre indéfiniment
- Parfait pour tester l'API

### Frontend
- Timeout configurable
- Protection contre les requêtes qui traînent
- Meilleure UX avec indicateurs de progression

## Dépannage

### Si l'API prend encore plus de 2 minutes :
1. Augmenter le timeout : `REACT_APP_API_TIMEOUT=300000` (5 minutes)
2. Ou désactiver : `REACT_APP_API_TIMEOUT=0`

### Si vous voulez un timeout plus court :
1. Optimiser l'API backend
2. Réduire le timeout : `REACT_APP_API_TIMEOUT=60000`

## Monitoring

L'application affiche maintenant :
- ✅ Temps d'attente estimé
- ✅ Messages d'erreur informatifs
- ✅ Fallback vers données mockées en cas d'échec
