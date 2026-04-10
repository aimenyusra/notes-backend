import express from  'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
   res.send("My backend is working");
});
const PORT = process.env.PORT || 3000;
const startServer = async () => {
   try {
      await connectDB();
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (error) {
      console.log(error);
   }
};
startServer();