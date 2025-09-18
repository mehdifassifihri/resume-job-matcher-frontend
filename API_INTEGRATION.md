# API Integration Guide

## Overview

L'application a été intégrée avec l'API backend pour l'analyse de CV et la génération de CV adaptés.

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_API_TIMEOUT=30000

# Application Settings
REACT_APP_APP_NAME="Resume Job Matcher"
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_MOCK_DATA=false
```

### Configuration par défaut

Si aucune variable d'environnement n'est définie, l'application utilise les valeurs par défaut :
- **API Base URL**: `http://localhost:8000`
- **Timeout**: `30000ms` (30 secondes)
- **Environment**: `development`

## Endpoints API

### 1. Upload et Analyse de CV

**Endpoint**: `POST /match/upload`

**Body** (FormData):
```javascript
{
  "resume_file": File,      // Fichier CV (PDF, DOCX, TXT)
  "job_file": File,         // Fichier description de poste
  "model": "gpt-4o-mini"    // Modèle IA à utiliser
}
```

**Response**:
```json
{
  "score": 17.67,
  "coverage": {
    "must_have": 16.67,
    "responsibilities": 0.0,
    "seniority_fit": 60.0
  },
  "gaps": {
    "matched_skills": ["typescript"],
    "missing_skills": ["node.js", "apollo server", "graphql"],
    "weak_evidence_for_responsibilities": ["..."]
  },
  "rationale": "Core skills coverage 17%, responsibilities 0%, seniority fit 60%.",
  "tailored_resume_text": "CONTACT INFORMATION\n...",
  "structured_resume": {
    "contact_info": { "name": "...", "email": "...", "phone": "...", "location": "..." },
    "summary": "...",
    "experience": [...],
    "education": [...],
    "skills": { "technical": [...], "soft": [...], "languages": [...] },
    "certifications": [...],
    "projects": [...],
    "achievements": []
  },
  "recommendations": ["Gain experience with Apollo Server..."],
  "flags": ["hallucination_suspected"],
  "meta": { "detected_language": "ca" }
}
```

### 2. Health Check

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Gestion des Erreurs

### Types d'erreurs

1. **Timeout**: L'API prend trop de temps à répondre
2. **Network Error**: Problème de connexion
3. **HTTP Error**: Erreur du serveur (4xx, 5xx)
4. **Validation Error**: Fichiers invalides

### Fallback

En cas d'erreur API, l'application :
1. Affiche un message d'erreur à l'utilisateur
2. Utilise les données mockées pour la démonstration
3. Permet à l'utilisateur de continuer à utiliser l'application

## Fonctionnalités

### 1. Upload de Fichiers

- **Formats supportés**: PDF, DOCX, DOC, TXT
- **Taille maximale**: 10MB par fichier
- **Validation**: Vérification du type et de la taille

### 2. Analyse en Temps Réel

- **Indicateur de progression**: Pendant l'analyse
- **Timeout configurable**: 30 secondes par défaut
- **Gestion des erreurs**: Affichage des erreurs utilisateur

### 3. Résultats Détaillés

- **Score de compatibilité**: Pourcentage de correspondance
- **Analyse des compétences**: Matched/Missing skills
- **Recommandations**: Suggestions d'amélioration
- **Flags**: Alertes sur les incohérences détectées

### 4. Système de Templates

- **Template FAANG Path**: Optimisé pour les entreprises tech
- **Génération automatique**: Basée sur les données structurées
- **Preview en temps réel**: Aperçu du CV généré
- **Téléchargement**: Export HTML du CV

## Architecture

### Services

- **`apiService`**: Service principal pour les appels API
- **`config`**: Configuration centralisée
- **`utils`**: Fonctions utilitaires

### Composants

- **`HeroUpload`**: Upload des fichiers
- **`ResultPanel`**: Affichage des résultats
- **`AnalysisDetails`**: Détails de l'analyse
- **`TemplateSystem`**: Système de templates
- **`CVGenerator`**: Générateur de CV

### Workflow

1. **Upload**: L'utilisateur upload ses fichiers
2. **API Call**: Appel à l'API backend
3. **Processing**: Analyse et génération du CV
4. **Results**: Affichage des résultats
5. **Templates**: Génération de CV avec templates
6. **Export**: Téléchargement du CV final

## Développement

### Mode Mock

Pour utiliser les données mockées au lieu de l'API :

```env
REACT_APP_ENABLE_MOCK_DATA=true
```

### Debug

Les logs d'erreur sont affichés dans la console du navigateur.

### Tests

Pour tester l'intégration API :

1. Démarrer le backend sur `http://localhost:8000`
2. Démarrer le frontend : `npm start`
3. Uploader des fichiers de test
4. Vérifier les appels API dans les DevTools

## Déploiement

### Variables de Production

```env
REACT_APP_API_BASE_URL=https://your-api-domain.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_MOCK_DATA=false
```

### Build

```bash
npm run build
```

Le build inclut toutes les configurations et optimisations pour la production.
