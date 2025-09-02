// import express from 'express'
// import cookieParser from 'cookie-parser';
// import cors from 'cors'
// import dotenv from "dotenv"
// import connetDB from './Utils/db.js';
// import userRoute from './routes/user.route.js'
// dotenv.config({});

// const app=express();


// app.use(cookieParser());

// app.get('/home', (req, res)=>{
//     return res.status(200).json({
//         message:"i am comming from backend",
//         success:true
//     })
// })

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// app.use(cookieParser)
// const corsOption={
//     origin:'http://localhost:5173',
//     credentials:true
// }
// app.use(cors(corsOption));


// //api' s
// /*
// http://localhost:3000/api/v1/user//register
// http://localhost:3000/api/v1/user/login
// http://localhost:3000/api/v1/user/profile
// */
// app.use("/api/v1/user", userRoute);



// const port=process.env.PORT || 8000;





// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// // import path, { dirname, join } from 'path';
// import { fileURLToPath } from 'url';

// // Routes
// import connectDB from './Utils/db.js';
// import userRoute from './routes/user.route.js';
// import companyRoute from './routes/company.route.js';
// import jobRoute from './routes/job.route.js';
// import applicationRoutes from './routes/application.route.js';
// import path from 'path';

// // Load environment variables
// dotenv.config();

// const __dirname=path.resolve();
// // Create express app
// const app = express();
// const PORT = process.env.PORT || 8000;

// // ================== MIDDLEWARE ==================
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // CORS configuration
// // const corsOptions = {
// //   origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
// //   credentials: true,
// // };
// const corsOptions = {
//   origin:'http://localhost:5173', 
//   credentials: true,
// };



// app.use(cors(corsOptions));

// app.get('/home', (req, res) => {
//   res.status(200).json({
//     message: "I am coming from backend",
//     success: true,
//   });
// });


// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get('*', (req, res)=>{
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// })

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ DB connection failed:", err);
//   });











// server.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Import Routes
import connectDB from "./Utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

// Load environment variables
dotenv.config();

// Fix __dirname for ES modules
const __dirname = path.resolve();

// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));



// ================== TEST ROUTE ==================
app.get("/home", (req, res) => {
  res.status(200).json({
    message: "I am coming from backend",
    success: true,
  });
});

// ================== API ROUTES ==================
if (userRoute) app.use("/api/v1/user", userRoute);
if (companyRoute) app.use("/api/v1/company", companyRoute);
if (jobRoute) app.use("/api/v1/job", jobRoute);
if (applicationRoutes) app.use("/api/v1/application", applicationRoutes);

// ================== SERVE REACT FRONTEND ==================
// const frontendPath = path.join(__dirname, "frontend/dist");
// app.use(express.static(frontendPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });


// Serve React frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all route for React SPA
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});






// ================== CONNECT DB & START SERVER ==================
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
