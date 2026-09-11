# Expense Tracker

A full-stack personal finance and expense tracking application built with **React (Vite)**, **Node.js (Express)**, and **MongoDB**.

## Features

- **User Authentication**: Secure signup and login with JWT and bcrypt.
- **Transaction Management**: Add, view, edit, and delete income and expense records.
- **Visual Analytics**: Interactive category-wise and monthly spending breakdowns with Chart.js.
- **Receipt & Bill Scanner**: OCR bill scanning powered by Tesseract.js.
- **Data Export**: Export your financial statements to PDF and Excel (XLSX).

## Project Structure

```
Expense-Tracker/
├── client/         # Frontend React + Vite application (deployed on Vercel)
│   ├── src/        # React components, pages, context, and styles
│   ├── vercel.json # Vercel SPA routing configuration
│   └── package.json
├── server/         # Backend Node.js + Express API (deployed on Render)
│   ├── config/     # MongoDB database connection
│   ├── controllers/# Business logic
│   ├── middleware/ # JWT authentication middleware
│   ├── models/     # Mongoose data models
│   ├── routes/     # Express API routes
│   └── server.js
└── DEPLOYMENT.md   # Step-by-step guide to deploy on Render and Vercel
```

## Deployment

Refer to [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying:
- Backend to **Render**
- Frontend to **Vercel**
- Database to **MongoDB Atlas**
