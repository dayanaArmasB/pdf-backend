
import { Request, Response } from 'express';
import { PdfParseService } from '../services/pdf/PdfParse.service';
const pdfParseService = new PdfParseService();

/**
 * Controller to handle PDF text extraction.
 * @param req - Express request object
 * @param res - Express response object
 */
export const uploadPdfText = async (req: Request, res: Response) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined;

    if (!file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
 
    const pdfDoc = await pdfParseService.extractText(file.path);
    res.json(pdfDoc);
  } catch (error) {
    console.error('Error procesando PDF con texto:', error);
    res.status(500).json({ error: 'Error procesando el PDF' });
  }
};
