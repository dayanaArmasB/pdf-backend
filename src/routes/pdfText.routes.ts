import { Router } from 'express';
import multer from 'multer';
import { uploadPdfText } from '../controllers/pdfText.controller';

const router = Router();
const upload = multer({ dest: 'src/uploads/' });

// POST /api/pdf/text
router.post('/upload', upload.single('file'), uploadPdfText);

export default router;

