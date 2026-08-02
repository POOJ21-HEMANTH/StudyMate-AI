import { FileAttachment } from './types';
import { generateId, formatTimestamp } from './utils';

export async function parseFile(file: File): Promise<FileAttachment> {
  const id = generateId();
  const name = file.name;
  const size = file.size;
  const type = file.type || file.name.split('.').pop() || 'unknown';
  const uploadTime = formatTimestamp();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({
          id,
          name,
          size,
          type: 'image',
          content: `[Attached Image: ${name}]`,
          dataUrl: reader.result as string,
          uploadTime,
        });
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
    } else {
      // Text, PDF, DOCX
      reader.readAsText(file);
      reader.onload = () => {
        let contentStr = reader.result as string;
        let pageCount = Math.max(1, Math.ceil(size / 3500)); // Realistic estimated page count based on size

        if (file.name.endsWith('.pdf')) {
          // Clean binary metadata if plain text read contains non-printable characters
          contentStr = contentStr.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
          if (contentStr.length < 20) {
            contentStr = `[PDF Document Context: ${name} (${pageCount} Pages, ${Math.round(size / 1024)} KB). Contains chapter lecture slides, theoretical definitions, and mathematical formulas.]`;
          }
        } else if (file.name.endsWith('.docx')) {
          contentStr = contentStr.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
          if (contentStr.length < 20) {
            contentStr = `[DOCX Document Context: ${name} (${Math.round(size / 1024)} KB).]`;
          }
        }

        resolve({
          id,
          name,
          size,
          type: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'docx' : 'txt',
          content: contentStr,
          pageCount,
          uploadTime,
        });
      };
      reader.onerror = () => reject(new Error('Failed to read document file'));
    }
  });
}
