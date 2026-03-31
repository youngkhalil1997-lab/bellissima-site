# Bellissima Smart Laundry

## Structure
- `site/index.html` : page client
- `site/style.css` : styles (assure-toi que le fichier est en UTF-8 si le navigateur n’affiche rien)
- `server/index.js` : backend Express + SQLite
- `server/package.json` : dépendances

## Mise en place (Windows)
1. Ouvre un terminal dans `c:\bellissima-site\server`
2. `npm install`
3. `npm start`
4. Ouvre `http://localhost:3000` dans ton navigateur

## API disponibles
- `GET /api/user?phone=` : récupère utilisateur
- `POST /signup-loyalty` : {name,phone,email} -> crée fidélité
- `POST /orders` : {machine,action=create|reserve}
- `POST /kiosk/confirm-cash` : {reference}

## Notes
- Dans `site/index.html`, le script propose un prompt téléphone de test.
- Le paiement carte est simulé (`Session de paiement créée`), la validation en vrai nécessite intégration Stripe/Mollie.
- L’option réserve est accessible uniquement quand l’utilisateur a `is_loyalty=1`.
