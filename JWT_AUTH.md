# Authentification JWT - Documentation

## Vue d'ensemble

Le frontend utilise maintenant l'authentification JWT (JSON Web Token) pour les requêtes sécurisées vers le backend.

## Comment ça fonctionne

### 1. **Connexion de l'utilisateur**

Lorsqu'un utilisateur se connecte:
```typescript
// L'utilisateur entre email et password
await authService.login({ email, password })

// Le backend retourne:
{
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  token_type: "Bearer"
}

// Les tokens sont stockés dans localStorage
localStorage.setItem('access_token', access_token)
localStorage.setItem('refresh_token', refresh_token)
```

### 2. **Requêtes authentifiées**

Lorsqu'une requête nécessite l'authentification:
```typescript
// Le frontend ajoute automatiquement le token JWT
headers['Authorization'] = `Bearer ${accessToken}`
```

### 3. **Rafraîchissement automatique du token**

Si le token expire (erreur 401):
```typescript
// 1. Le frontend détecte l'erreur 401
// 2. Appelle automatiquement /auth/refresh avec le refresh_token
// 3. Obtient un nouveau access_token
// 4. Réessaye la requête originale avec le nouveau token
```

Si le refresh_token est également expiré:
```typescript
// 1. Déconnecte automatiquement l'utilisateur
// 2. Supprime les tokens du localStorage
// 3. Redirige vers la page de connexion
```

## Endpoints protégés

### ✅ Avec authentification JWT requise:

- **`GET /history/analyses/{user_id}`** - Récupérer l'historique des analyses
  - Nécessite: `Authorization: Bearer {access_token}`
  - Erreur 403 si le token est manquant ou invalide

- **`GET /auth/me`** - Obtenir les informations de l'utilisateur connecté
  - Nécessite: `Authorization: Bearer {access_token}`

### ❌ Sans authentification (publics):

- **`POST /match/upload`** - Analyser un CV
  - Paramètre `user_id` optionnel
  - Si `user_id` fourni → analyse sauvegardée dans l'historique
  - Si `user_id` absent → analyse en temps réel uniquement

- **`POST /auth/register`** - Créer un compte
- **`POST /auth/login`** - Se connecter
- **`POST /auth/refresh`** - Rafraîchir le token

## Implémentation dans le code

### API Service (`src/lib/api.ts`)

La méthode `makeRequest` gère automatiquement l'authentification:

```typescript
private async makeRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = false  // ← Paramètre clé
): Promise<T> {
  // Si requireAuth = true
  if (requireAuth) {
    // 1. Récupère le token depuis localStorage
    const accessToken = authService.getAccessToken()
    
    // 2. Ajoute le header Authorization
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  
  // 3. Si erreur 401, rafraîchit automatiquement le token
  if (response.status === 401 && requireAuth) {
    const newAccessToken = await authService.refreshToken()
    // Réessaye la requête
  }
}
```

### Utilisation:

```typescript
// Requête AVEC authentification
await apiService.getAnalysisHistory(userId)  // requireAuth = true

// Requête SANS authentification
await apiService.uploadResumeAndJob(file, job)  // requireAuth = false
```

## Flux complet de l'utilisateur

### Scénario 1: Premier accès à l'historique

```
1. Utilisateur clique sur "History"
   ↓
2. AnalysisHistory.tsx appelle apiService.getAnalysisHistory(userId)
   ↓
3. API service récupère le token depuis localStorage
   ↓
4. Ajoute header: Authorization: Bearer {token}
   ↓
5. Envoie GET /history/analyses/{userId}
   ↓
6. Backend vérifie le token JWT
   ↓
7. Si valide → retourne l'historique
   Si invalide → erreur 401 ou 403
```

### Scénario 2: Token expiré

```
1. Utilisateur clique sur "History"
   ↓
2. Requête avec ancien token
   ↓
3. Backend retourne 401 Unauthorized
   ↓
4. Frontend détecte 401
   ↓
5. Appelle automatiquement /auth/refresh
   ↓
6. Backend valide refresh_token
   ↓
7. Retourne nouveau access_token
   ↓
8. Frontend stocke le nouveau token
   ↓
9. Réessaye la requête originale
   ↓
10. ✅ Succès!
```

### Scénario 3: Session complètement expirée

```
1. Requête avec token expiré
   ↓
2. Backend retourne 401
   ↓
3. Frontend essaye de rafraîchir
   ↓
4. refresh_token aussi expiré
   ↓
5. Backend retourne erreur
   ↓
6. Frontend:
   - Supprime les tokens
   - Déconnecte l'utilisateur
   - Affiche: "Session expired. Please login again."
   - Redirige vers /login
```

## Gestion des erreurs

### Code d'erreur 401 (Unauthorized)
- **Cause**: Token expiré ou invalide
- **Action**: Rafraîchissement automatique du token
- **Si échec**: Déconnexion + redirection vers /login

### Code d'erreur 403 (Forbidden)
- **Cause**: Token manquant ou utilisateur non autorisé
- **Action**: Affichage d'un message d'erreur
- **Message**: "Authentication required. Please login."

### Code d'erreur 500 (Server Error)
- **Cause**: Erreur serveur
- **Action**: Affichage d'un message d'erreur
- **Message**: "Server error. Please try again later."

## Sécurité

### ✅ Bonnes pratiques implémentées:

1. **Tokens stockés dans localStorage**
   - Facile d'accès pour le frontend
   - Persiste entre les sessions
   - ⚠️ Note: Pour plus de sécurité en production, considérer httpOnly cookies

2. **Rafraîchissement automatique**
   - Évite de demander à l'utilisateur de se reconnecter constamment
   - Améliore l'UX

3. **Déconnexion automatique**
   - Si les tokens sont invalides
   - Protection contre les tokens compromis

4. **Headers sécurisés**
   - Format standard: `Authorization: Bearer {token}`
   - Compatible avec tous les backends OAuth2/JWT

### 🔒 Recommandations pour la production:

1. **HTTPS obligatoire**
   - Tous les appels API doivent passer par HTTPS
   - Empêche l'interception des tokens

2. **Expiration courte des access_token**
   - Recommandé: 15-30 minutes
   - Réduit la fenêtre d'exploitation en cas de vol

3. **Expiration longue des refresh_token**
   - Recommandé: 7-30 jours
   - Balance entre sécurité et UX

4. **Content Security Policy (CSP)**
   - Empêche l'injection de scripts malveillants
   - Protège contre XSS

## Testing

### Test manuel:

1. **Se connecter**
   ```
   - Aller sur /login
   - Entrer email et password
   - Vérifier que la connexion fonctionne
   ```

2. **Accéder à l'historique**
   ```
   - Cliquer sur "History"
   - Vérifier que l'historique se charge
   - Vérifier dans DevTools > Network:
     * Header: Authorization: Bearer {token}
     * Status: 200 OK
   ```

3. **Tester le rafraîchissement**
   ```
   - Attendre que le token expire (ou le supprimer manuellement)
   - Essayer d'accéder à l'historique
   - Vérifier que le rafraîchissement automatique fonctionne
   ```

4. **Tester la déconnexion automatique**
   ```
   - Supprimer les deux tokens de localStorage
   - Essayer d'accéder à l'historique
   - Vérifier la redirection vers /login
   ```

### Vérification dans DevTools:

```javascript
// Vérifier les tokens stockés
localStorage.getItem('access_token')
localStorage.getItem('refresh_token')

// Supprimer les tokens manuellement (pour tester)
localStorage.removeItem('access_token')
localStorage.removeItem('refresh_token')
```

## Debugging

### Problème: "403 Forbidden"

**Vérifications:**
1. ✅ L'utilisateur est-il connecté?
   ```javascript
   authService.isAuthenticated()  // doit retourner true
   ```

2. ✅ Le token est-il présent?
   ```javascript
   authService.getAccessToken()  // doit retourner un token
   ```

3. ✅ Le header Authorization est-il envoyé?
   - Ouvrir DevTools > Network
   - Cliquer sur la requête
   - Vérifier: Request Headers > Authorization: Bearer {token}

4. ✅ Le token est-il valide?
   - Decoder le JWT sur [jwt.io](https://jwt.io)
   - Vérifier la date d'expiration (exp)
   - Vérifier le user_id

### Problème: "Session expired" en boucle

**Cause**: Le refresh_token est également expiré

**Solution:**
1. Se déconnecter complètement
2. Se reconnecter
3. Un nouveau refresh_token sera généré

### Problème: Token non envoyé

**Vérifications:**
1. La méthode utilise-t-elle `requireAuth: true`?
2. Le token est-il dans localStorage?
3. Y a-t-il des erreurs dans la console?

## Code examples

### Exemple complet d'une requête authentifiée:

```typescript
// Component
import { apiService } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user } = useAuth()
  
  const loadData = async () => {
    try {
      // Cette requête inclura automatiquement le token JWT
      const data = await apiService.getAnalysisHistory(user.id)
      console.log('Data loaded:', data)
    } catch (error) {
      if (error.message.includes('Session expired')) {
        // L'utilisateur sera redirigé vers /login
        console.log('Please login again')
      } else {
        console.error('Error:', error)
      }
    }
  }
  
  return <button onClick={loadData}>Load History</button>
}
```

### Exemple d'ajout d'un nouvel endpoint protégé:

```typescript
// Dans src/lib/api.ts

async getProtectedData(): Promise<any> {
  return this.makeRequest<any>('/protected/endpoint', {
    method: 'GET',
  }, true)  // ← requireAuth = true pour ajouter le token
}
```

## Changelog

### Version 1.1.0 (Actuelle)
- ✅ Ajout de l'authentification JWT
- ✅ Rafraîchissement automatique des tokens
- ✅ Gestion des erreurs 401/403
- ✅ Redirection automatique en cas d'expiration
- ✅ Support de l'historique des analyses

---

**Questions?** Vérifiez les logs de la console et les requêtes réseau dans DevTools!

