# 🔗 Link Shortener

A full-stack URL Shortener built with **React, Vite, Tailwind CSS,
Node.js, Express.js, and MongoDB**.

The application allows users to convert long URLs into short, shareable
links and tracks how many times each short link has been clicked.

## 🚀 Live Demo

https://link-shortener-rfftp7l2d-pushpendra1798s-projects.vercel.app/

> The backend is hosted on Render and the frontend is deployed on
> Vercel.

## ✨ Features

-   🔗 Create short URLs
-   ✅ Validate URLs before creating them
-   🎲 Generate unique short codes
-   ↪️ Redirect short URLs to the original URL
-   📊 Track click counts
-   🗑️ Delete short URLs
-   🔢 Maximum 10 links can exist at a time
-   📱 Responsive design for mobile, tablet, and desktop
-   🌐 Production deployment with Vercel and Render
-   🗄️ MongoDB Atlas database integration
-   ⚡ REST API communication using Axios

## 🛠️ Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Axios
-   Lucide React

### Backend

-   Node.js
-   Express.js
-   Mongoose
-   MongoDB
-   CORS
-   Dotenv

### Deployment

-   Vercel --- Frontend
-   Render --- Backend
-   MongoDB Atlas --- Database

## 📁 Project Structure

``` text
Link-Shortener/
├── backend/
│   ├── src/
│   │   ├── app/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

## 🔄 How It Works

``` text
User enters a long URL
        ↓
Frontend sends POST request
        ↓
Express backend validates the URL
        ↓
Unique short code is generated
        ↓
URL is stored in MongoDB
        ↓
Short URL is returned
        ↓
User opens the short URL
        ↓
Backend finds the short code
        ↓
Click count is increased
        ↓
User is redirected to the original URL
```

## 🔌 API Endpoints

Base URL:

``` text
https://link-shortener-vmbw.onrender.com
```

### Create Short URL

``` http
POST /api/url/create
```

Request body:

``` json
{
  "originalUrl": "https://example.com"
}
```

### Get All URLs

``` http
GET /api/url/getAll
```

### Delete Short URL

``` http
DELETE /api/url/:shortCode
```

### Redirect

``` http
GET /:shortCode
```

Example:

``` text
GET /abc123
```

This redirects the user to the original URL associated with `abc123`.

## 🔢 URL Limit

The application currently allows a maximum of **10 URLs** in the
database.

When 10 URLs already exist:

``` text
10 URLs
   ↓
New URL request
   ↓
❌ Request rejected
```

After deleting one:

``` text
10 → Delete 1 → 9
              ↓
       Create new URL ✅
```

The limit is enforced on the **backend**, not only in the frontend.

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

``` env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### Frontend

Create a `.env` file inside the `frontend` directory:

``` env
VITE_API_URL=http://localhost:3000/api/url
```

For production:

``` env
VITE_API_URL=https://link-shortener-vmbw.onrender.com/api/url
```

> Never commit `.env` files or database credentials to GitHub.

## 💻 Run Locally

### 1. Clone the repository

``` bash
git clone https://github.com/Pushpendra1798/Link-Shortener.git
cd Link-Shortener
```

### 2. Install backend dependencies

``` bash
cd backend
npm install
```

Start the backend:

``` bash
npm run dev
```

### 3. Install frontend dependencies

Open another terminal:

``` bash
cd frontend
npm install
```

Start the frontend:

``` bash
npm run dev
```

The frontend will normally run at:

``` text
http://localhost:5173
```

## 🧪 Example

Original URL:

``` text
https://www.example.com/very/long/url
```

Generated short URL:

``` text
https://link-shortener-vmbw.onrender.com/Ab12Cd
```

Opening the short URL redirects the user to the original URL and
increments the click count.

## 🔒 Current Security Considerations

This project currently focuses on the core URL-shortening workflow.

Future improvements could include:

-   User authentication
-   Per-user URL ownership
-   Authorization for deleting URLs
-   API rate limiting
-   Expiration dates for short URLs
-   Custom short codes
-   Analytics dashboard
-   Copy-to-clipboard functionality

## 📚 What I Learned

While building this project, I practiced:

-   REST API development
-   Express.js routing and controllers
-   MongoDB and Mongoose
-   URL validation
-   Unique short-code generation
-   HTTP redirects
-   Click tracking
-   Axios API integration
-   Environment variables
-   CORS configuration
-   Git and GitHub
-   Full-stack deployment
-   Responsive UI development with Tailwind CSS

## 👨‍💻 Author

**Pushpendra**

Built as a full-stack learning and portfolio project.

## 📄 License

This project is open for learning and personal use.
