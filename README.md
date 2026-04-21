<h1 align="center">Sync</h1>

<p align="center">
  Full-stack music streaming & social listening app
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-blue" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black" />
</p>

---

## Demo

Watch a quick walkthrough of the app:  
[Add your video link here]

---

## Overview

Sync is a full-stack music streaming and social listening app built with React, TypeScript, Express, MongoDB, Clerk, Cloudinary, and Socket.IO.

Users can browse music, play songs across multiple views, chat in real time, and see who’s online or actively listening.

---

## Highlights

- Full-stack architecture with React (Vite) frontend and Express + MongoDB backend
- Authentication with Clerk (Google OAuth + email/password)
- Protected admin dashboard for managing songs and albums
- Cloudinary integration for audio and artwork uploads
- Real-time chat and live presence powered by Socket.IO
- Shared playback state across homepage, albums, and collections using Zustand

---

## Tech Stack

| Layer        | Tools                                                        |
| ------------ | ------------------------------------------------------------ |
| Frontend     | React, TypeScript, Vite, Tailwind CSS, Zustand, React Router |
| Backend      | Node.js, Express, Mongoose, Socket.IO                        |
| Auth & Media | Clerk, Cloudinary                                            |
| Database     | MongoDB                                                      |

---

## Core Features

- Browse featured, made-for-you, trending, and album-based music collections
- Play songs directly from cards or list views
- Real-time chat between users
- Live presence (online, offline, listening status)
- Admin dashboard for uploading and managing songs and albums
- Cloud-based media storage with Cloudinary
- Application stats for admin insights

---

## Routes

### Frontend

- `/`
- `/sign-in`
- `/sign-up`
- `/chat`
- `/albums/:albumId`
- `/admin`

### Backend

- `/api/auth`
- `/api/users`
- `/api/songs`
- `/api/albums`
- `/api/stats`
- `/api/admin`

---

## Local Setup

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

### 2. Environment variables

Create `backend/.env` with:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
CLIENT_ORIGIN=http://localhost:5173
PORT=3000
```

Create `frontend/.env` with:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

---

### 3. Run the app

```bash
# backend
cd backend && npm run dev

# frontend
cd frontend && npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## Seed Data

```bash
# songs only
cd backend
npm run seed:songs
```

```bash
# albums + songs
cd backend
npm run seed:albums
```

---

## What This Project Demonstrates

- Full-stack architecture and API design
- Authentication and protected routes using Clerk
- Real-time systems with Socket.IO
- File uploads and media handling with Cloudinary
- Global state management with Zustand
- Debugging across frontend, backend, and integration layers

---

## Notes

This is a demo environment. Data may be reset periodically.
