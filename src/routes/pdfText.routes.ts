import { Router } from 'express';
import { PdfTextController } from '../controllers/pdfText.controller';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();
const pdfTextController = new PdfTextController();

// POST /api/pdf/upload  ← protegida con token Bearer
router.post('/upload', upload.single('file'), (req, res) =>
  pdfTextController.uploadAndExtract(req, res)
);

export default router;

