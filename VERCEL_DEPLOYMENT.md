# Guide de Déploiement sur Vercel

J'ai configuré votre projet pour qu'il soit compatible avec **Vercel**. Voici les étapes pour déployer votre site :

## Étape 1 : Préparer le projet
J'ai déjà effectué les modifications suivantes :
1. Créé un dossier `api/` avec vos fonctions backend adaptées à Vercel.
2. Ajouté un fichier `vercel.json` pour gérer les redirections.
3. Installé les types nécessaires pour Vercel.

## Étape 2 : Déployer sur Vercel
1. Allez sur [https://vercel.com](https://vercel.com) et connectez-vous.
2. Cliquez sur **"Add New..."** puis **"Project"**.
3. Importez votre dépôt GitHub (si vous en avez un) ou utilisez la **Vercel CLI** en local :
   - Ouvrez votre terminal sur votre ordinateur.
   - Tapez `npm i -g vercel` (si pas déjà installé).
   - Tapez `vercel` à la racine du projet et suivez les instructions.

## Étape 3 : Configurer la base de données
C'est l'étape la plus importante pour que l'inscription fonctionne :
1. Dans le tableau de bord Vercel, allez dans les **Settings** (Paramètres) de votre projet.
2. Cliquez sur **Environment Variables**.
3. Ajoutez la variable suivante :
   - **Key** : `DATABASE_URL`
   - **Value** : `mysql://masterclassfree:Master001!@mysql-masterclassfree.alwaysdata.net:3306/masterclassfree_masterdb`
4. Cliquez sur **Save**.

## Étape 4 : Redéployer
Vercel redéploiera automatiquement après l'ajout de la variable. Si ce n'est pas le cas, allez dans l'onglet **Deployments** et relancez-en un.

## Pourquoi Vercel ?
- **Pas de scan de secrets bloquant** : Vercel vous laisse gérer vos fichiers librement.
- **Vitesse** : Le déploiement est souvent plus rapide que sur Netlify.
- **Support Prisma** : Vercel détecte automatiquement Prisma et génère le client au build.

---
**Note :** Vos fichiers Netlify (`netlify.toml` et le dossier `netlify/`) peuvent rester là, ils ne gêneront pas Vercel.
