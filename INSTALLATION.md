# Installation de l'API Tiko

## Prérequis

- npm
- Git
- Node.js Version minimum 18

## Instructions

### Étape 1: Cloner le répertoire

```bash
git clone projet
```

### Étape 3: Créer un fichier d'environnement local

1. Créer un fichier `.env` à partir de fichier `.env.exemple`

2. Ajouter les valeurs

### Étape 4: Créer la base de données

```bash
docker-compose -f docker-compose.local.yaml up -d
```

### Étape 5: Installer les dépendances

```bash
npm i
```

### Étape 6: Récupérer les migrations de la base de données

```bash
npx prisma migrate dev
```

### Étape 7: Démarrer l'application

```bash
npm run dev
```
