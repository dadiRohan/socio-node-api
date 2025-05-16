const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/profiles', userRoutes);

app.use('/api/posts', postRoutes);

app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
