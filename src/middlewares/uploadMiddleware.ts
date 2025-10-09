import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 📂 Carpeta donde se guardarán los PDFs subidos
const uploadDir = path.join(__dirname, '../../uploads');

// Crear carpeta si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Solo aceptar PDFs
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Solo se permiten archivos PDF'), false);
};

export const upload = multer({ storage, fileFilter });
