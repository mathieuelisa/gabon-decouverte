# Gabon Decouverte

First, run the development server:

```bash
pnpm install
pnpm lefthook install
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## Convention de nommage des branches

Pour assurer une bonne organisation et une lecture claire de l’historique Git, chaque branche doit suivre une convention de <u>nommage standardisée en francais.</u>

Cette convention permet d’identifier rapidement **le type de travail effectué** (nouvelle fonctionnalité, correction, mise à jour technique, etc.) et de garder un dépôt propre et cohérent.

Voici un exemple :

- `feature/ajout-nouvelle-fonctionnalité` pour une nouvelle fonctionnalité
- `fix/erreur-formulaire-reservation` pour une correction de bug
- `style/update-landing-page` pour un ajustement de design

## Convention de nommage des commits

Chaque commit doit commencer par un préfixe indiquant le type de modification, suivi d’une description claire et concise de l’action effectuée.

La convention de <u>nommage standardisée doit être en francais.</u>

Voici un exemple :

- `feature: ajout d'une nouvelle fonctionnalité` pour une nouvelle fonctionnalité
- `fix: fix d'un bug` pour une correction de bug
- `style: update de la landing page` pour un ajustement de design de la landing page

## Convention de description des PR

Chaque pull request doit comporter une description en français, rédigés de manière claire et concise.

La convention de <u>nommage standardisée doit être en francais.</u>

Voici un exemple :

Description générale

Mise à jour du README et ajout des couleurs et points de rupture (breakpoints) personnalisés afin d’améliorer la cohérence visuelle et la maintenabilité du projet.
