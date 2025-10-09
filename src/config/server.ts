import express from 'express';
import cors from 'cors';
import pdfTextRoutes from '../routes/pdfText.routes';
import connectDB from './db';
import authRoutes from '../routes/auth.routes';
//import pdfOcrRoutes from '../routes/pdfOcr.routes';

export const createServer = () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  connectDB();

  // Rutas
  app.use('/api/pdf/text', pdfTextRoutes);
  //app.use('/api/pdf/ocr', pdfOcrRoutes);
  app.use('/api/auth', authRoutes);



  return app;
};
