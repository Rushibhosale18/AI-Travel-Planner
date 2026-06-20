const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-travel-planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.log('MongoDB Connection Error: ', err));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'AI Travel Planner API is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
