
# 🎬 IMDB API Dokumentation

## 🌍 Bas-URL
```
http://localhost:8000
```

## 🔐 Autentisering
- Bearer JWT krävs för skyddade endpoints

---

## 👤 /users - Användare

### GET `http://localhost:8000/users`
- Kräver JWT-token
- Admin ser all data, användare ser begränsad data

### POST `http://localhost:8000/users/register`
- Skapar ett nytt konto
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### POST `http://localhost:8000/users/login`
- Loggar in användare
```json
{
  "email" OR "username": "string",
  "password": "string"
}
```

### DELETE `http://localhost:8000/users/delete-user/:userId`
- Endast för admin

### POST `http://localhost:8000/users/make-admin/:userId`
- Gör användare till admin (kräver admin)

---

## 🎥 http://localhost:8000/movies - Filmer

### GET `http://localhost:8000/movies`
- Returnerar alla filmer

### GET `http://localhost:8000/movies/:id`
- Returnerar en film

### GET `http://localhost:8000/movies/rating`
- Returnerar filmer med användarbetyg

### GET `http://localhost:8000/movies/search-movie?title=&director=`
- Kräver admin
- Sök efter filmer

### POST `http://localhost:8000/movies`
- Skapa ny film (admin)
```json
{
  "title": "string",
  "director": "string",
  "releaseYear": "number",
  "genre": "string",
  "IMDB_rating": "number"
}
```

### PUT `http://localhost:8000/movies/:id`
- Uppdatera film (admin)

### DELETE `http://localhost:8000/movies`
- Ta bort film (admin)
```json
{ "title": "string" }
```

### GET `http://localhost:8000/movies/:id/recentions`
- Hämtar alla recensioner för en film

---

## 📝 http://localhost:8000/recention - Recensioner

### GET `http://localhost:8000/recention`
- Hämtar alla recensioner

### GET `http://localhost:8000/recention/single?recId=`
- Hämtar en recension

### POST `http://localhost:8000/recention/send/:id/:userId`
- Skapa recension
```json
{ "rating": number, "comment": "text" }
```

### PUT `http://localhost:8000/recention/update/:recId/:userId`
- Uppdatera egen recension

### PUT `http://localhost:8000/recention/admin-update/:recId`
- Admin uppdaterar recension

### DELETE `http://localhost:8000/recention/delete/:recId`
- Radera recension

---

## 📌 Noteringar
- Alla endpoints returnerar JSON
- JWT-token krävs i headers där det anges:
```
Authorization: Bearer <token>
```
