# 💰 Paymentee

<div align="center">
  <img src="public/paymentee.gif" alt="Paymentee Logo" width="120" height="120" style="border-radius: 20px">
  <h3>Splitting expenses made simple</h3>
  <p>Track shared expenses and settle debts effortlessly</p>
  
  <div>
    <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma" alt="Prisma">
    <img src="https://img.shields.io/badge/TailwindCSS-4.0+-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  </div>
</div>

---
**Paymentee** is a secure and scalable **expense-sharing platform** designed to eliminate the friction of splitting bills among friends, roommates, and travel groups.

Built with a focus on **data privacy**, **real-time state management**, and **clean architecture**, it provides dynamic settlement calculations and role-based group management within a containerized micro-architecture.

---

# Architecture & Core Features

Our system design is driven by real user needs, mapping product requirements directly to technical implementations.

---

## Authentication & Security

- Implemented **NextAuth.js** with **Google OAuth providers**
- Sessions securely stored in **PostgreSQL** using **Prisma Adapter**
- Sensitive routes protected using **Next.js App Router Middleware**
- Ensures **zero unauthorized access** to group data

---

## Group Management & Asynchronous Invitations

- Highly relational database schema
- Secure **time-sensitive invite tokens**
- Email invitations sent via **Nodemailer**
- Beautiful email templates built using **React Email**

---

## Dynamic Expense Splitting
Database structure:
```
Users → Groups → Expenses → ExpenseSplits
```

Features:

- Equal split
- Percentage split
- Exact amount split
- Strict payload validation using **Zod**
- Floating-point rounding errors prevented during DB writes

---

## Real-Time Debt Settlements

- Custom **graph-based settlement algorithm**
- Minimizes total transactions required for settlement

Example:

```
personA owes personB $10
personB owes personC $10

Simplified to

personA owes personC $10
```

- Displayed on a **responsive Tailwind dashboard**

---

# Tech Stack

| Category | Technologies |
|--------|-------------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS, Radix UI, GSAP |
| **Backend** | Next.js API Routes (Node.js Runtime) |
| **Database** | PostgreSQL 15, Prisma ORM |
| **Authentication** | NextAuth.js, Google OAuth |
| **Infrastructure & DevOps** | Docker, Docker Compose, AWS EC2, Multi-stage Docker Builds |

# Local Development Setup

Paymentee uses **Docker** to ensure a consistent development environment.

---

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js **18+**

---

### Clone Repository

```bash
git clone https://github.com/mohith0407/paymentee.git
cd paymentee
npm install
```

---

### Environment Variables

Create a `.env` file in the root directory(use cp .env.example .env)

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=paymentee_dev

DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/paymentee_dev"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development_secret"

GOOGLE_CLIENT_ID="your_dev_google_id"
GOOGLE_CLIENT_SECRET="your_dev_google_secret"
```

---

###  Start Local Database

```bash
docker compose -f docker-compose.dev.yml up -d
```

---

### Setup Database Schema

```bash
npx prisma generate
npx prisma db push
```

---

### Run Application

```bash
npm run dev
visit: http://localhost:3000
```

---

# Production Deployment

Paymentee is built for **scalable containerized deployment**.

The application uses a **multi-stage Dockerfile** to produce a minimal standalone Node.js server.

Deploy on an **AWS EC2 instance**:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

This builds and runs:

- Next.js Application
- PostgreSQL Database

inside a **secure Docker network**.

---

# Project Goals

- Clean Architecture
- Scalable Backend
- Secure Authentication
- Accurate Financial Calculations
- Excellent User Experience

