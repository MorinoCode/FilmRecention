# 🎬 IMDB Clone API

Ett backendprojekt byggt med **Node.js**, **Express** och **MongoDB**. Projektet simulerar ett IMDB-liknande API där användare kan:

- Registrera sig och logga in
- Bläddra bland filmer
- Skicka recensioner
- Se betyg
- Admins kan hantera filmer, användare och recensioner

---

## 🚀 Funktioner

### 🔐 Autentisering & Roller
- JWT-baserad inloggning
- Två roller: `user` och `admin`
- Endast admin kan registrera/uppdatera/radera filmer

### 👥 Användare
- Registrering, inloggning
- Admin kan uppgradera användare till admin
- Admin kan radera användare

### 🎞️ Filmer
- Hämta alla filmer eller en film med ID
- Betyg via recensioner
- Admin kan skapa, uppdatera och ta bort filmer
- Sök efter filmer baserat på titel eller regissör

### 📝 Recensioner
- Användare kan skicka en recension per film
- Uppdatera egna recensioner
- Admin kan uppdatera och ta bort alla recensioner

---

## 🛠️ Installation

1. **Klona repot**

git clone https://github.com/dittnamn/imdb-clone-api.git
cd imdb-clone-api
Installera beroenden


npm install
Skapa .env-fil

env

MONGO_URL=din_mongodb_connection_string
SECRET_KEY=din_jwt_secret
Starta servern


npm run dev
Servern körs nu på: http://localhost:8000

📚 API-Dokumentation
Den fullständiga dokumentationen finns i:

📄 exampleAnroparPostman.md

Exempel på routes:

Metod	      Endpoint	          Skyddad	Beskrivning
GET	        /users	             ✅	Hämta användare
POST      	/users/register	     ❌	Registrera användare
GET	        /movies            	❌	Hämta alla filmer
POST      	/movies	            ✅ admin	Skapa ny film
POST	    /recention/send/:id/:user	✅	Skicka recension

📦 Tech Stack
Node.js

Express

MongoDB + Mongoose

JWT (jsonwebtoken)

bcrypt

dotenv
