import { PdfDocument } from '../../models/PdfDocument';

export interface IPdfTextExtractor {
  extractText(filePath: string): Promise<PdfDocument>;
}
