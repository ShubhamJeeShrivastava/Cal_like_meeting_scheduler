<<<<<<< HEAD
# Cal by Shubham

A high-performance, professional scheduling platform built for modern workflows. **Cal by Shubham** enables individuals and organizations to manage their availability, coordinate meetings, and streamline their booking process with a premium, focused user experience.

![Brand Logo](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge&logo=vercel&color=000)
![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%20%7C%20TypeScript%20%7C%20Drizzle%20%7C%20Neon-blue?style=for-the-badge)

## ✨ Overview

Cal by Shubham is a full-stack scheduling solution designed to eliminate the back-and-forth of meeting coordination. It provides a sleek, dark-themed dashboard for managing "Event Types" (recurring meeting profiles with specific durations and descriptions) and a robust availability engine that ensures your guests only book times when you are actually free.

### Key Features

- **🎯 Event Management**: Create, edit, and disable multiple event types (e.g., "15-min Intro," "Product Discovery," "Technical Interview").
- **📅 Dynamic Availability**: Set granular weekly schedules. Define global availability or customize specific slots for each day.
- **🔒 Secure Public Profiles**: A beautiful, branded public landing page where guests can view your services and book time instantly.
- **⚡ Real-time Conflict Resolution**: Built-in logic to ensure overlapping bookings are impossible.
- **📧 Booking Notifications**: Automated feedback loop for both host and guest upon successful scheduling.
- **🌑 Premium Aesthetic**: A carefully crafted "Dark Mode" interface inspired by high-end SaaS tools, utilizing glassmorphism and smooth micro-animations.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety.
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon](https://neon.tech/)).
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) for high-performance database queries.
- **Authentication**: [Clerk](https://clerk.com/) for secure user management and social identity.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom design system.
- **Icons**: [Lucide React](https://lucide.dev/).
- **Validation**: [Zod](https://zod.dev/) for robust schema validation.

---

## 🛠️ Project Structure

```text
├── app/                  # Next.js App Router (Public & Private routes)
├── components/           # Reusable UI components & Complex Forms
├── drizzle/              # Database schema definitions and migrations
├── lib/                  # Utilities, formatters, and shared logic
├── public/               # Static assets (Logos, SVG marks)
├── schema/               # Zod validation schemas
├── server/               # Server Actions (Business logic & DB interactions)
└── package.json          # Dependency management
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18.x or higher
- A Neon PostgreSQL database instance
- A Clerk account for authentication

### 2. Installation
```bash
git clone https://github.com/ShubhamJeeShrivastava/Cal_like_meeting_scheduler.git
cd cal-by-shubham
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
DATABASE_URL=your_postgres_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 4. Database Setup
```bash
npm run db:push    # Push schema to Neon
npm run db:studio  # Open Drizzle Studio to inspect data
```

### 5. Running the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## 🎨 Design Philosophy

Cal by Shubham is built on the principle of **Visual Excellence**. Unlike generic scheduling tools, it utilizes:
- **Curated HSL Palettes**: Deep charcoal backgrounds (`#0f0f10`) contrasted with sharp white typography.
- **Interaction Feedback**: Meaningful hover states and loading transitions using `framer-motion` and Tailwind animations.
- **Minimalist Layout**: Reducing cognitive load for guests during the booking process.

## 🤝 Contribution

Contributions are welcome! If you have suggestions for new features or infrastructure improvements, please open an issue or submit a pull request.

---

**Built with ❤️ by [Shubham Jee Shrivastava](https://github.com/ShubhamJeeShrivastava)**

*This project was developed as a production-grade demonstration of full-stack engineering capabilities using modern web technologies.*
=======
# 📅 Build and Deploy a Calendly Clone

This project-based course walks you through building a full-stack Calendly clone from scratch using **Next.js 15**, **Clerk** for authentication, **Tailwind CSS**, and a modern tech stack. 

You’ll learn how to:
- Create and manage event types
- Implement user availability and scheduling
- Handle full-stack logic using server actions
- Deploy your app to the web using **Vercel**

Perfect for developers looking to sharpen their full-stack skills with real-world functionality.
>>>>>>> 2e0718d628fae4b83897728854c04c1ac00b2043
