/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Response type for document processing API
 */
export interface DocumentSummaryResponse {
  title: string;
  summary: string;
  keyPoints: string[];
  metadata: {
    pages: number;
    wordCount: number;
    processingTime: number;
  };
}
