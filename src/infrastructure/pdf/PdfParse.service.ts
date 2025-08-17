import fs from 'fs';
// @ts-ignore
import pdfParse from 'pdf-parse';
import { PdfTextExtractor } from '../../services/PdfTextExtractor';
import { PdfDocument } from '../../models/PdfDocument';

export class PdfParseService implements PdfTextExtractor {
  async extractText(filePath: string): Promise<PdfDocument> {
    const dataBuffer = await fs.promises.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);

    return {
      text: pdfData.text.trim(),
      info: pdfData.info || {}
    };
  }
}
