import { PdfDocument } from '../models/PdfDocument';

export interface PdfTextExtractor {
  extractText(filePath: string): Promise<PdfDocument>;
}
