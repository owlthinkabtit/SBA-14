import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from './config/passport.js';
import userRoutes from './routes/userRoutes.js';
import bookmarkRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(passport.initialize());

app.use('/api/users', userRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/', (req, res) => {
  res.send('Innovate Inc. Secure Portal is Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});