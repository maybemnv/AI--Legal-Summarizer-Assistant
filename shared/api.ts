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
  summary: string; // Markdown formatted summary from Gemini
  sources: SourceReference[];
}

/**
 * Source reference from RAG retrieval
 */
export interface SourceReference {
  page: string | number;
  text: string;
  relevance_rank?: number;
}
