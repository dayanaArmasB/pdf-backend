import fs from 'fs';
// @ts-ignore
import pdfParse from 'pdf-parse';
import { PdfDocument } from '../../models/PdfDocument';
import { IPdfTextExtractor } from './IPdfTextExtractor';

export class PdfParseService implements IPdfTextExtractor {
  async extractText(filePath: string): Promise<PdfDocument> {
    const dataBuffer = await fs.promises.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);

    return {
      text: pdfData.text.trim(),
      info: pdfData.info || {}
    };
  }
}
