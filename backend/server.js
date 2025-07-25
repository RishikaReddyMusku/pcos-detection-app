const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Middleware
app.use(cors({
  origin: 'https://pcos-detection-app.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());






// Route files
const scanRoutes = require('./routes/scanRoutes');
const clinicalRoutes = require('./routes/clinicalRoutes');
const symptomsRoutes = require('./routes/symptomsRoutes');
const authRoutes = require('./routes/auth');
const medicalRoutes = require('./routes/medicalRoutes');


// Register Routes
app.use('/symptoms', require('./routes/symptomsRoutes'));
app.use('/scan', require('./routes/scanRoutes'));
app.use('/clinical', require('./routes/clinicalRoutes'));
app.use('/api/auth', require('./routes/auth')); // registration/login
app.use('/api/auth', authRoutes);
app.use('/api/form', medicalRoutes);

app.use('/uploads/scans', express.static(path.join(__dirname, 'uploads/scans')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
