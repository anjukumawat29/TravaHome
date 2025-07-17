# 🏠 TravaHome – Travel Stay Listing Web App

[Live Demo 🚀](https://travahome-y8v7.onrender.com)

TravaHome is a full-stack web application inspired by Airbnb that allows users to explore, list, and review vacation stays. Built using the **MVC architecture**,
it features dynamic listing creation, category-based filtering, user authentication, image uploads, and a clean, responsive UI.

---

## ✨ Features

- 🔐 User Registration & Login with session-based authentication
- 🏡 Create, edit, and delete property listings
- 🗂️ Browse listings by categories (Hotels, Villas, Resorts, etc.)
- ⭐ Add and manage reviews for each listing
- 📷 Upload images using **Cloudinary**
- 🎨 Fully responsive UI with **Bootstrap** and **EJS**
- ⚙️ Express middlewares for error handling and route protection
- 🌍 Deployed on **Render** with environment-based configuration

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Bootstrap 5, EJS (Embedded JavaScript)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Passport.js & express-session
- **File Upload:** Multer & Cloudinary
- **Deployment:** Render

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/anjukumawat29/TravaHome.git
cd TravaHome
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in project root with the following:

```
DB_URL=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=…
CLOUDINARY_KEY=…
CLOUDINARY_SECRET=…
SESSION_SECRET=your_session_secret
```

### 4. Run locally

```bash
npm start
```

Visit `http://localhost:3000/` in your browser.

### 5. Deploy

Already live on Render. Just push to main or follow your own deployment flow.

---

## 🧩 Project Structure

```
Controller/      → Route handlers  
Models/          → Mongoose schemas  
Routes/          → Express route definitions  
Views/           → EJS templates (pages/layouts/partials)  
Public/          → Static assets: CSS, client JS, images  
Utils/           → Helper functions (e.g., async error catching)  
app.js           → App configuration and middleware setup  
cloudConfig.js   → Cloudinary configuration  
middleware.js    → Custom Express middleware  
schema.js        → JOI schemas for server-side validation  
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/X`)
3. Commit your changes (`git commit -m 'Add X feature'`)
4. Push (`git push origin feature/X`)
5. Open a Pull Request — **Welcomes newcomers!**

---


