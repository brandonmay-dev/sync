# Sync

Sync is a full-stack music streaming and social listening app built with React, TypeScript, Express, MongoDB, Clerk, Cloudinary, and Socket.IO. Users can browse music, play songs across multiple views, chat in real time, and see when other listeners are online or actively playing a track.

## Highlights

- React and TypeScript frontend powered by Vite
- Express and MongoDB backend with Mongoose models
- Clerk-hosted sign-in and sign-up flows
- Protected admin dashboard for song and album management
- Cloudinary-backed audio and artwork uploads
- Real-time chat and presence with Socket.IO
- Shared playback state across homepage, album, and collection views

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router |
| Backend | Node.js, Express 5, Mongoose, Socket.IO |
| Auth and Media | Clerk, Cloudinary |
| Data | MongoDB |

## Main Features

- Browse featured, made-for-you, trending, and album-based music collections
- Click song cards and list rows directly to play or pause tracks
- Sign in or sign up through Clerk
- See friend presence with online, offline, and listening-now status
- Open a chat directly from the right-side profile rail
- Send and receive live messages
- Manage songs and albums from an admin dashboard
- View admin stats for songs, albums, users, and artists

## Routes

Frontend:

- `/`
- `/sign-in`
- `/sign-up`
- `/chat`
- `/made-for-you`
- `/trending`
- `/albums/:albumId`
- `/admin`

Backend:

- `/api/auth`
- `/api/users`
- `/api/songs`
- `/api/albums`
- `/api/stats`
- `/api/admin`

## Local Setup

### Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Create environment files

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

### Run the app

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Local URLs:

- frontend: `http://localhost:5173`
- backend: `http://localhost:3000`

## Seed Data

Seed songs only:

```bash
cd backend
npm run seed:songs
```

Seed albums and songs:

```bash
cd backend
npm run seed:albums
```

## Why This Project Is Strong

This project demonstrates end-to-end full-stack work across frontend UI, API design, auth, admin tooling, file uploads, real-time systems, and state management. It is especially useful as a portfolio project because it shows product thinking and cross-layer debugging, not just isolated components.
