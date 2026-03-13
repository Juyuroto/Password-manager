# Lockbox

Un gestionnaire de mots de passe moderne, sécurisé et auto-hébergé. Alternative open-source à Keeper, construit avec Go, React, PostgreSQL et Docker.

---

## Fonctionnalités

- **Authentification JWT** — connexion sécurisée avec token
- **Chiffrement AES-256-GCM** — chaque mot de passe est chiffré avant d'être stocké
- **Générateur de mots de passe** — longueur et complexité personnalisables
- **Copie en un clic** — dans le presse-papier sans afficher le mot de passe
- **Organisation par dossiers** — pour classer tes entrées
- **Indicateur de force** — analyse la robustesse de chaque mot de passe
- **Entièrement dockerisé** — un seul `docker-compose up` pour tout lancer

---

## Stack technique

| Couche | Technologie |
|--------|------------|
| Backend | Go + Chi |
| Frontend | React + CSS pur |
| Base de données | PostgreSQL |
| Chiffrement | AES-256-GCM |
| Auth | JWT + bcrypt |
| Déploiement | Docker + Docker Compose |

---

## Structure du projetrepository

```
lockbox/
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── internal/
│   │   ├── auth/
│   │   ├── crypto/
│   │   ├── handlers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── repository/
│   ├── migrations/
│   ├── Dockerfile
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx/
│   │   └── main.jsx/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

L'application sera disponible sur :
- Frontend → http://localhost:3000
- Backend API → http://localhost:8080
- PostgreSQL → localhost:5432

---

## Sécurité

- Les mots de passe maîtres sont hachés avec **bcrypt**
- Les mots de passe stockés sont chiffrés avec **AES-256-GCM**
- Les tokens JWT expirent après **24h**
- Les variables sensibles passent par des **variables d'environnement**
- Le `.env` est dans le `.gitignore`