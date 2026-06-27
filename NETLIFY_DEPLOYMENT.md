# Guide de Déploiement sur Netlify

## Problème identifié

L'erreur **400** lors de l'inscription à la masterclass est causée par l'absence de configuration de la variable d'environnement `DATABASE_URL` sur Netlify. 

Votre projet utilise Prisma pour accéder à une base de données MySQL, mais Netlify ne sait pas où se connecter.

## Solution : Configurer les variables d'environnement sur Netlify

### Étape 1 : Accédez à votre site Netlify

1. Allez sur https://app.netlify.com
2. Sélectionnez votre site (siteflow-a-z ou similaire)
3. Cliquez sur **Site settings** (Paramètres du site)

### Étape 2 : Configurer les variables d'environnement

1. Dans le menu de gauche, cliquez sur **Build & deploy**
2. Cliquez sur **Environment** (Environnement)
3. Cliquez sur **Edit variables** (Modifier les variables)
4. Ajoutez une nouvelle variable :
   - **Key** : `DATABASE_URL`
   - **Value** : `(Collez ici l'URL de votre base de données)`
5. Cliquez sur **Save** (Enregistrer)

### Étape 3 : Redéployer votre site

1. Allez dans l'onglet **Deploys** (Déploiements)
2. Cliquez sur **Trigger deploy** → **Deploy site** (Déclencher un déploiement)
3. Attendez que le déploiement soit terminé (status = Published)

### Étape 4 : Testez l'inscription

1. Allez sur votre site
2. Remplissez le formulaire d'inscription à la masterclass
3. Cliquez sur "S'inscrire"
4. Vous devriez recevoir une confirmation sans erreur 400

## Vérification du déploiement

Si vous recevez toujours une erreur :

1. Ouvrez les **DevTools** (F12) de votre navigateur
2. Allez dans l'onglet **Network** (Réseau)
3. Soumettez le formulaire
4. Cherchez la requête `/api/register`
5. Cliquez dessus et regardez la réponse (Response tab)

La réponse devrait montrer :
- ✅ **Status 201** : Inscription réussie
- ❌ **Status 400** : Erreur de validation (champs manquants)
- ❌ **Status 503** : Erreur de connexion à la base de données (vérifiez DATABASE_URL)

## Alternative : Utiliser une base de données serverless

Si vous rencontrez toujours des problèmes de connexion, vous pouvez migrer vers une base de données serverless compatible avec Netlify :

### Option 1 : PlanetScale (MySQL compatible)
- Créez un compte sur https://planetscale.com
- Créez une nouvelle base de données
- Copiez l'URL de connexion
- Remplacez `DATABASE_URL` par cette nouvelle URL

### Option 2 : TiDB Cloud (MySQL compatible)
- Créez un compte sur https://tidbcloud.com
- Créez un nouveau cluster
- Copiez l'URL de connexion
- Remplacez `DATABASE_URL` par cette nouvelle URL

## Dépannage

### Erreur : "Erreur de connexion à la base de données"
- Vérifiez que `DATABASE_URL` est correctement configurée sur Netlify
- Vérifiez que votre base de données MySQL est accessible de l'extérieur
- Vérifiez que les identifiants sont corrects

### Erreur : "Tous les champs sont requis"
- Vérifiez que le formulaire envoie bien tous les champs : firstName, lastName, email, whatsApp
- Ouvrez les DevTools et vérifiez le payload envoyé

### Le formulaire fonctionne en local mais pas sur Netlify
- Vérifiez que les variables d'environnement sont configurées sur Netlify
- Redéployez après avoir ajouté les variables
- Attendez quelques minutes que les changements prennent effet

## Architecture du projet

Le projet utilise :
- **Frontend** : React + TypeScript + Vite
- **Backend** : Netlify Functions (Node.js)
- **Base de données** : MySQL (via Prisma)
- **ORM** : Prisma Client

Les fonctions Netlify se trouvent dans le dossier `netlify/functions/` :
- `register.ts` : Gère l'inscription à la masterclass
- `registrations.ts` : Récupère la liste des inscrits (admin panel)

## Fichiers importants

- `netlify.toml` : Configuration de Netlify (redirects, build, functions)
- `prisma/schema.prisma` : Schéma de la base de données
- `netlify/functions/register.ts` : Fonction d'inscription
- `.env.example` : Template des variables d'environnement
