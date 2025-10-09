import { Request, Response } from 'express';
import { PdfParseService } from '../services/pdf/PdfParse.service';
import { JwtService } from '../services/jwt.service';

const pdfParseService = new PdfParseService();
const jwtService = new JwtService();

export class PdfTextController {
  async uploadAndExtract(req: Request, res: Response) {
    try {
      // 1️⃣ Verificar token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

      const decoded = jwtService.verifyToken(token);
      if (!decoded) return res.status(403).json({ message: 'Token inválido o expirado' });

      // 2️⃣ Verificar archivo
      if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo PDF' });
      }

      // 3️⃣ Procesar el PDF
      const result = await pdfParseService.extractText(req.file.path);

      // 4️⃣ Devolver texto y datos
      return res.status(200).json({
        message: 'Texto extraído exitosamente',
        data: result,
        usuario: decoded, // opcional: ver qué usuario lo subió
      });

    } catch (error: any) {
      console.error('Error al procesar el PDF:', error);
      return res.status(500).json({
        message: 'Error al procesar el PDF',
        error: error.message,
      });
    }
  }
}
