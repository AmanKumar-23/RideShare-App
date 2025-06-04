<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->



# 🚗 RideShare - Carpooling Platform

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

RideShare is a modern carpooling platform connecting drivers with empty seats to passengers looking for rides. 🌍  
It helps reduce travel costs, traffic congestion, and carbon emissions by promoting shared transportation.

---

## 📋 Project Overview

- 🔗 Connect drivers and passengers
- ♻️ Promote eco-friendly shared transportation
- 💸 Lower travel expenses for everyone

---

## 🏗️ Project Structure

### 🖥️ Frontend (`/carpool-app`)

A [Next.js](https://nextjs.org) web application that provides the user interface.

- **Framework**: Next.js (App Router)
- **UI**: TailwindCSS + shadcn/ui
- **State Management**: React Query
- **Features**:
  - 🔍 Ride search with filters (location, date, seats)
  - 🔐 User authentication (login/register)
  - 📱 Fully responsive design
  - 📄 Interactive ride listings

### 🛠️ Backend (`/backend`)

A [Node.js](https://nodejs.org)/[Express](https://expressjs.com) API server that handles the core logic.

- **Framework**: Express
- **Database**: MongoDB (via Mongodb Compass)
- **Authentication**: JWT (jsonwebtoken)
- **API Routes**:
  - `/api/auth` - User Authentication
  - `/api/rides` - Ride Management
  - `/api/user` - User Profile Management

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

---

### ⚙️ Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd carpool-app

2. Install dependencies:
   ```bash
   npm install

3. Create a .env.local file with:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api

4. Run the development server:
   ```bash
   npm run dev

5. Visit http://localhost:3000 to view the app.


### ⚙️ Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file with:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5001

4. Start the backend server:
    ```bash
    npm run dev
    
*** The backend API will be available at http://localhost:5001/api.

## ✨ Features

### 🧑‍🤝‍🧑 For Passengers
- Search rides by location, date, and seats
- View driver and ride details
- Book available seats

### 🚗 For Drivers
- Create and publish ride offers
- Manage available seats
- Set pricing and route information

---

## 🛠️ Current Implementation Status

| Feature | Status |
| :--- | :--- |
| User Authentication | ✅ Completed |
| Ride Search | ✅ Completed |
| Ride Listing Display | ✅ Completed |
| Seat Filtering | ✅ Completed |
| Booking System | ⚠️ Partially Implemented |
| User Profiles | ⚠️ Partially Implemented |
| Payment Integration | 🔜 Planned |
| Messaging System | 🔜 Planned |

---

## 📦 Deployment

### 🌐 Frontend
- Easiest deployment via [Vercel](https://vercel.com/).

### 🖥️ Backend
Backend can be deployed to:
- Heroku
- AWS
- DigitalOcean
- Railway

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – Interactive Next.js tutorial.

