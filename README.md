AI-Powered PCOS Detection App
An intelligent, dual-mode diagnostic platform for detecting Polycystic Ovary Syndrome (PCOS) using:
> Ultrasound scan images (Deep Learning)
> Clinical data inputs (Machine Learning)

Live App : https://pcos-detection-app.vercel.app/

Built with a MERN stack (MongoDB, Express, React, Node.js) and integrated with Flask ML microservices.

Features:
Secure Authentication with JWT
Medical Form Submission stored in MongoDB
AI-based Prediction
Deep learning (image-based)
ML models (clinical input)
User Dashboard to track past submissions & results
Cloud-hosted, modular, and scalable


Tech Stack :
Frontend:
React.js
Axios for HTTP requests
Form validation & routing

Backend (Node.js):
Express.js (REST API)
MongoDB + Mongoose
Multer for image upload
JWT for authentication

ML Microservices (Flask):
Clinical API  – CatBoost model
Scan API  – CNN model
Flask-CORS for frontend-backend communication

Hosting:
Frontend: Vercel
Node.js Backend: Render
Flask APIs: Render
MongoDB: MongoDB Atlas (Cloud NoSQL)

