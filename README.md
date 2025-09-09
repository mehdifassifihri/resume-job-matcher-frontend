# AI Resume & Job Matcher

Une interface web premium et moderne pour adapter automatiquement votre CV aux offres d'emploi grâce à l'IA.

## 🚀 Fonctionnalités

- **Upload de fichiers** : Support pour CV (PDF/DOCX) et descriptions de poste
- **Analyse IA** : Scoring d'adéquation et identification des compétences requises
- **CV adapté** : Génération automatique d'un CV optimisé pour le poste
- **Recommandations** : Suggestions d'amélioration personnalisées
- **Suggestions d'emploi** : Offres d'emploi correspondant à votre profil
- **Interface moderne** : Design premium avec animations fluides

## 🛠️ Technologies utilisées

- **React 19** avec TypeScript
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **Radix UI** pour les composants accessibles
- **Lucide React** pour les icônes
- **shadcn/ui** pour les composants UI

## 🎨 Design System

### Palette de couleurs
- **Primary** : `#7C3AED` (violet)
- **Accent** : `#06B6D4` (cyan)
- **Neutral** : `#0B1020`, `#111827`, `#0F172A`
- **Success** : `#22C55E`
- **Warning** : `#F59E0B`
- **Danger** : `#EF4444`

### Typographie
- **Police** : Inter (sans-serif)
- **Responsive** : Mobile-first avec breakpoints Tailwind

## 📁 Structure du projet

```
src/
├── components/
│   ├── ui/           # Composants UI de base (shadcn/ui)
│   ├── Header.tsx    # En-tête avec navigation
│   ├── HeroUpload.tsx # Section principale avec upload
│   ├── HowItWorks.tsx # Explication du processus
│   ├── ResultPanel.tsx # Affichage des résultats
│   ├── JobSuggestions.tsx # Suggestions d'emploi
│   └── Footer.tsx    # Pied de page
├── lib/
│   ├── utils.ts      # Fonctions utilitaires
│   └── mock.ts       # Données mock
├── pages/
│   └── App.tsx       # Composant principal
└── App.tsx           # Point d'entrée
```

## 🚀 Installation et démarrage

1. **Cloner le projet**
```bash
git clone <repository-url>
cd resume-jobmatcher
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🎯 Utilisation

1. **Upload des fichiers** : Glissez-déposez votre CV et l'offre d'emploi
2. **Analyse** : Cliquez sur "Adapter le CV" pour lancer l'analyse IA
3. **Résultats** : Consultez votre score d'adéquation et les recommandations
4. **CV adapté** : Téléchargez ou copiez le CV optimisé
5. **Suggestions** : Découvrez des offres d'emploi correspondantes

## 🔧 Configuration

### Tailwind CSS
Le fichier `tailwind.config.js` contient la configuration personnalisée avec :
- Palette de couleurs personnalisée
- Animations CSS personnalisées
- Police Inter configurée

### Composants UI
Tous les composants UI sont basés sur shadcn/ui et personnalisés avec :
- Styles cohérents avec le design system
- Support complet de l'accessibilité
- Animations Framer Motion intégrées

## 📱 Responsive Design

L'application est entièrement responsive avec :
- **Mobile-first** : Optimisé pour les petits écrans
- **Breakpoints** : sm, md, lg, xl
- **Navigation** : Adaptée selon la taille d'écran
- **Grilles** : Flexibles et adaptatives

## ♿ Accessibilité

- **ARIA labels** : Tous les éléments interactifs sont labellisés
- **Focus states** : Indicateurs visuels pour la navigation clavier
- **Contrastes** : Respect des standards WCAG AA+
- **Navigation clavier** : Support complet du clavier

## 🎨 Animations

- **Framer Motion** : Animations fluides et performantes
- **Micro-interactions** : Feedback visuel sur les interactions
- **Transitions** : Apparitions progressives des sections
- **Hover effects** : Effets au survol des éléments

## 🔮 Fonctionnalités futures

- [ ] Mode sombre/clair
- [ ] Export PDF avancé
- [ ] Historique des analyses
- [ ] Intégration API réelle
- [ ] Support multilingue
- [ ] Dashboard utilisateur

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

---

**Développé avec ❤️ pour optimiser votre recherche d'emploi**
