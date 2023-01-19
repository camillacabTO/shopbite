// import express from 'express'
import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './database/db.js';
import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV}, listening on port ${PORT}`
  )
);
