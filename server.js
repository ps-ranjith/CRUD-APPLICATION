const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(express.json());

// Build connection string
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
