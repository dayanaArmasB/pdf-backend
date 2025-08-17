
import { Request, Response } from 'express';
import fs from 'fs';
// @ts-ignore
import pdfParse from 'pdf-parse';

export const uploadPdfText = async (req: Request, res: Response) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined;

    if (!file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const filePath = file.path;
    const dataBuffer = await fs.promises.readFile(filePath);

    // Procesar el PDF para extraer texto
    const pdfData = await pdfParse(dataBuffer);

    // Eliminar el archivo temporal
    await fs.promises.unlink(filePath).catch(() => {});

    // Devolver el texto
    res.json({
      type: 'text-pdf',
      text: pdfData.text.trim(),
      info: pdfData.info || {}
    });
  } catch (error) {
    console.error('Error procesando PDF con texto:', error);
    res.status(500).json({ error: 'Error procesando el PDF' });
  }
};
