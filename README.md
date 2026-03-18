# Wordloom

**An end-to-end blog platform with AI in its ink and elegance in every line!**

Wordloom is a full-stack blogging platform that combines seamless content management with the power of AI. Featuring **dual user interfaces** (Reader + Admin), advanced **post/comment CRUD**, **category filtering**, and **AI-powered tone optimization**, Wordloom makes both writing and reading blogs a delightful experience.

---

## Features

- ✍️ **AI-Powered Writing Flow**  
  - Draft posts in **TinyMCE** rich-text editor.  
  - Optimize tone (formal, witty, casual, etc.) with **Gemini AI**.  

- 🖥️ **Dual Frontends**  
  - **Reader** → browse, like, comment, and share posts.  
  - **Admin** → create, edit, and manage blogs.  

- 🔐 **Authentication & Security**  
  - **JWT** for secure sessions.  
  - **Google OAuth2** login.  

- 📂 **File & Media Support**  
  - Upload blog thumbnails via **Cloudinary**.  
  - Organized storage & retrieval.  

- 📑 **Core Blogging Features**  
  - Post & comment **CRUD operations**.  
  - Category-based filtering.  
  - Like, share, and comment interactions.  

---

## 🛠️ Tech Stack

**Frontend (Reader & Admin)**  
- React 19 + Vite  
- TailwindCSS 4 + Motion  
- React Router, Hot Toasts  
- TinyMCE for rich text editing  

**Backend**  
- Node.js + Express  
- PostgreSQL + Prisma ORM  
- Passport.js (JWT + Google OAuth2)  
- Multer for file uploads  
- Cloudinary for media storage  
- EJS (for auth-related views)  

**AI Integration**  
- Google Gemini (`@google/generative-ai`) for tone optimization  

---

## 📂 Project Structure

```bash
wordloom/
├── backend/          # Node.js + Express + Prisma API
├── frontend-reader/  # Public-facing reader app
├── frontend-admin/   # Admin dashboard for writers

```

---

## ⚙️ Setup & Installation

**1️⃣ Clone the Repository**

```bash
git clone https://github.com/yourusername/wordloom.git
cd wordloom
```

**2️⃣ Backend Setup**

```bash
cd backend
npm install
```
- Create a .env file with:

  ```bash
  DATABASE_URL="postgresql://user:password@localhost:5432/wordloom"
  JWT_SECRET="yoursecret"
  CLOUDINARY_CLOUD_NAME="yourcloudname"
  CLOUDINARY_API_KEY="yourapikey"
  CLOUDINARY_API_SECRET="yourapisecret"
  GOOGLE_CLIENT_ID="yourclientid"
  GOOGLE_CLIENT_SECRET="yourclientsecret"
  GOOGLE_CALLBACK_URL="http://localhost:<your_backend_port>/api/auth/google/callback"
  FRONTEND_URL_USER="http://localhost:<your_reader_port>"
  FRONTEND_URL_ADMIN="http://localhost:<your_admin_port>"
  API_KEY="<your_gemini_api_key>"
  ```

- Run Prisma migrations:
  
  ```bash
  npx prisma migrate dev
  ```

- Start backend:

  ```bash
  npm start
  ```

**3️⃣ Frontend (Reader)**

```bash
cd frontend-reader
npm install
npm run dev
```

**4️⃣ Frontend (Admin)**

```bash
cd frontend-admin
npm install
npm run dev
```

---

## 🚀 Usage

1. Sign up / log in (Google OAuth or local).
2. Readers can like, share, and comment.
3. Writers can head to Admin dashboard → create a blog post in TinyMCE.
4. Use AI Optimize → adjust tone (formal, witty, casual, etc.).
5. Publish and view on the Reader app.

---

## 🔮 Future Enhancements

- More advanced Analytics dashboard for writers.
- Tags & advanced search.
- Dark mode support for both frontends.
- More AI features (SEO suggestions, summary generation).

---

## 📜 License

This project is licensed under the MIT License – feel free to use, learn, and build upon it.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a PR.

---
 
 ## 🌐 Connect

Built with ❤️ by Amritesh.

