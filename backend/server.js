import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import bookRoutes from './routes/bookRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();
const app = express();

app.use(express.json());

app.use('/api/books', bookRoutes);
app.get('/', (req, res) => res.send('Api is running..'));

const port = process.env.PORT;
app.listen(port, (req, res) =>
  console.log(`Server started at port ${port}`.yellow.underline)
);
