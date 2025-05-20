# 🧩 React Auction Bay (Frontend)

This is the frontend for the **Auction Bay** web application, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It allows users to register, log in, view auctions, place bids, and manage their listings.

---

## 🚀 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- JWT Authentication
- Custom Hooks & Components

---

## 📁 Project Structure

```
src/
├── assets/              # Static images and logos
├── components/          # Reusable UI components
│   └── common/          # Shared buttons, cards, etc.
├── hooks/               # Custom React hooks
├── layouts/             # Layouts like navigation
├── pages/               # Route pages (Login, Register, etc.)
├── routes/              # App routing config
├── services/            # API calls using Axios
└── main.tsx             # App entry point
```

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open in browser

Go to [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication

This app uses JWT authentication. Protected routes are wrapped in `RequireAuth`. Tokens are stored securely and used for accessing user-specific content like:

- My Auctions
- Bidding
- Won Auctions

---

## 🔄 Reset Password Flow

- User requests a password reset from the `/forgot-pass` page
- An email with a reset token is sent
- The user is redirected to `/reset-password?token=...` to set a new password

> ⚠️ **Important**: In development, email links may open as `https://` by default. Manually replace `https://` with `http://localhost:5173` in the URL to open the page correctly.

---

## 🌐 API Endpoint

This app connects to a NestJS backend running at:

```
http://localhost:3333
```

Make sure this is correctly set in `src/services/api.ts`.

---

## 📜 Available Scripts

```bash
npm run dev       # Run development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🧑‍💻 Developed by

Žiga Štraus
