import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('Api is running..'));
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, (req, res) =>
  console.log(`Server started at port ${port}`.yellow.underline)
);
