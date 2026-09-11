# Deployment Guide: Expense Tracker

This guide details the complete process for deploying the **Expense Tracker** application:
- **Backend API**: Hosted on [Render](https://render.com)
- **Frontend SPA**: Hosted on [Vercel](https://vercel.com)
- **Database**: Hosted on [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Architecture Overview

```
 [User Browser]
       │
       ▼
 [Vercel Frontend] (React + Vite SPA)
   https://expense-tracker-ten-silk-25.vercel.app
       │
       │ REST API Calls (VITE_API_URL)
       ▼
 [Render Backend] (Node.js + Express)
   https://expense-tracker-api-jvzj.onrender.com/api
       │
       ▼
 [MongoDB Atlas] (Cloud Database)
```

---

## Step 1: Push Local Updates to GitHub

Make sure your repository has the latest configurations (including `vercel.json` and CORS settings):

```bash
git add .
git commit -m "Configure deployment settings for Render and Vercel"
git push origin main
```

---

## Step 2: Deploy Backend to Render

If you already have the backend running on Render (e.g., `https://expense-tracker-api-jvzj.onrender.com`), pushing your code to the `main` branch will automatically trigger a redeploy!

If you need to set up a new Render service:

1. **Sign in / Sign up**: Go to [dashboard.render.com](https://dashboard.render.com).
2. **Create New Web Service**:
   - Click **New +** > **Web Service**.
   - Select **Build and deploy from a Git repository**.
   - Connect your GitHub account and choose `Sahithyaraavi/Expense-Tracker`.
3. **Configure the Service Settings**:
   | Setting | Value |
   | :--- | :--- |
   | **Name** | `expense-tracker-api` (or your preferred name) |
   | **Region** | Closest to you (e.g., Singapore, Frankfurt, Oregon) |
   | **Branch** | `main` |
   | **Root Directory** | `server` *(Important: Do not leave blank!)* |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |
4. **Add Environment Variables**:
   Under **Environment Variables**, click **Add Environment Variable**:
   | Key | Value |
   | :--- | :--- |
   | `MONGO_URI` | `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority` |
   | `JWT_SECRET` | A strong random string (e.g., `mySuperSecureJwtSecret_2026!`) |
   | `NODE_ENV` | `production` |
   | `CLIENT_URL` | *(Optional)* Your Vercel frontend URL (e.g. `https://expense-tracker-ten-silk-25.vercel.app`) |
5. **Deploy**:
   - Click **Deploy Web Service**.
   - Wait 2–3 minutes for the build to finish.
   - Once the status is **Live**, copy your Render URL:
     `https://<your-app-name>.onrender.com`
   - Test it by visiting `https://<your-app-name>.onrender.com/` in your browser. You should see:
     `Expense Tracker API Running`

> [!NOTE]
> **Render Free Tier Cold Starts**: Render's free tier spins down after 15 minutes of inactivity. The first request after sleep may take ~30–50 seconds to respond while the container boots up.

---

## Step 3: Deploy Frontend to Vercel

If your Vercel project is already linked to the GitHub repo, pushing the new `client/vercel.json` will automatically fix direct page navigation and route refresh errors (404 Not Found).

If you are setting up a fresh deployment on Vercel:

1. **Sign in**: Go to [vercel.com](https://vercel.com).
2. **Add New Project**:
   - Click **Add New...** > **Project**.
   - Select **Import** next to your GitHub repository `Sahithyaraavi/Expense-Tracker`.
3. **Configure Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** and select `client` *(Important!)*
   - **Build and Output Settings**:
     - Build Command: `npm run build` (default)
     - Output Directory: `dist` (default)
     - Install Command: `npm install` (default)
4. **Configure Environment Variables**:
   Expand the **Environment Variables** section and add:
   | Key | Value |
   | :--- | :--- |
   | `VITE_API_URL` | `https://<your-render-app>.onrender.com/api` (e.g., `https://expense-tracker-api-jvzj.onrender.com/api`) |

   > [!IMPORTANT]
   > Make sure to append `/api` at the end of your Render URL!

5. **Deploy**:
   - Click **Deploy**.
   - In ~1 minute, Vercel will build and assign your live URL (e.g. `https://expense-tracker-ten-silk-25.vercel.app`).

---

## Step 4: Verify Your Public Application

1. **Open your Vercel URL**:
   Visit `https://<your-app>.vercel.app/`
2. **Test Direct Routing & Refresh**:
   - Navigate to `/login` or `/dashboard`.
   - Press **F5 (Refresh)** in your browser.
   - The page should refresh smoothly without returning `404: NOT_FOUND` thanks to `client/vercel.json`.
3. **Test Backend Integration**:
   - Click **Register** to create a test user account.
   - Log in with the credentials.
   - Add a transaction and confirm it appears in the list and charts.

---

## Troubleshooting Common Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **404 Not Found on Page Refresh** | Missing SPA rewrite on Vercel | Verify `client/vercel.json` exists with rewrite rule to `/index.html`. |
| **CORS error in Browser Console** | Backend blocked request origin | Verify `server/server.js` has dynamic origin check allowing `.vercel.app` domains or set `CLIENT_URL` in Render. |
| **Network Error / Failed to Fetch** | Backend sleeping or wrong URL | Check if Render service is active (allow 30s for cold start) and verify `VITE_API_URL` points to `https://.../api`. |
| **MongoDB Connection Error** | IP Whitelist or credentials | In MongoDB Atlas, go to **Network Access** > Add IP Address > **Allow Access from Anywhere (0.0.0.0/0)**. |
