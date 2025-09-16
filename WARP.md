# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
LegalDocs AI is a full-stack legal document summarization application that uses AI/ML to extract and summarize complex legal PDFs. The application consists of a FastAPI backend with RAG (Retrieval-Augmented Generation) capabilities and a React frontend with authentication.

## Architecture

### Backend (FastAPI + LangChain RAG)
- **Main Entry**: `backend/main.py` - FastAPI application with CORS and router setup
- **Authentication**: JWT-based auth system in `backend/auth.py`
- **Core Logic**: `backend/model_pipeline.py` - Gemini-based RAG pipeline for PDF processing
- **API Routes**: `backend/summarizer.py` - PDF upload and summarization endpoints
- **Models**: `backend/models.py` - Database models and schemas

The backend uses Google Gemini for embeddings and LLM processing, with FAISS for vector storage and LangChain for the RAG pipeline.

### Frontend (React + TypeScript)
- **Entry Point**: `client/App.tsx` - React Router setup with protected routes
- **Pages**: Located in `client/pages/` including Dashboard, SignIn, Features, etc.
- **UI Components**: Pre-built Radix UI components in `components/ui/`
- **Styling**: TailwindCSS with custom theming in `client/global.css`

### Key Integrations
- **Authentication Flow**: JWT tokens for API protection
- **PDF Processing**: PyPDF → Text Splitting → Embeddings → FAISS → Gemini LLM
- **Deployment**: Netlify (frontend) + Render (backend) with API proxy configuration

## Development Commands

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Format code
npm run format.fix

# Run tests
npm test
```

### Backend Development
```bash
# Setup Python environment
cd backend
python -m venv venv
venv\Scripts\activate    # On Windows

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server with hot reload
uvicorn main:app --reload

# Run backend tests
python test_rag.py
```

### Full Stack Development
- Frontend runs on `http://localhost:5173` (Vite dev server)
- Backend runs on `http://127.0.0.1:8000` (FastAPI server)
- API calls are proxied via Netlify configuration in production

## Environment Configuration

### Backend Environment Variables
Required in `.env` file in backend directory:
- `GEMINI_API_KEY` - Google Gemini API key
- `GOOGLE_APPLICATION_CREDENTIALS` - Path to GCP service account JSON
- `GCP_PROJECT_ID` - Google Cloud Project ID
- `GEMINI_ENDPOINT_ID` - Gemini endpoint identifier

### Production Deployment
- **Frontend**: Netlify deployment configured via `netlify.toml`
  - Build command: `npm run build:client`
  - Publish directory: `client/dist/spa`
  - API proxy: Routes `/api/*` to Render backend
- **Backend**: Render deployment with `backend/render.yaml` configuration

## Code Patterns

### Frontend Patterns
- React Router 6 with SPA mode for client-side routing
- Protected routes using `ProtectedRoute` wrapper component
- TanStack Query for API state management
- Radix UI components with TailwindCSS styling
- TypeScript throughout with strict typing

### Backend Patterns
- FastAPI with automatic OpenAPI documentation
- Router-based organization for API endpoints
- JWT authentication with dependency injection
- Error handling with proper HTTP status codes
- RAG pipeline: PDF → Chunking → Embeddings → Vector Search → LLM

### Authentication Flow
1. User signs in via `/api/signin` endpoint
2. JWT token returned and stored client-side
3. Protected routes require `Authorization: Bearer <token>` header
4. Backend validates JWT on protected endpoints using `get_current_user` dependency

## Testing

### Backend Testing
- Unit tests for RAG pipeline in `backend/test_rag.py`
- Test PDF processing and summarization functionality
- Mock external API calls for isolated testing

### Frontend Testing
- Vitest configured for component testing
- Test utilities available for UI component testing

## Deployment Architecture

### Production Flow
1. Frontend deployed to Netlify (static SPA)
2. Backend deployed to Render (containerized FastAPI)
3. API calls proxied from Netlify to Render backend
4. Google Cloud integration for Gemini AI services

### Local Development Flow
1. Run backend with `uvicorn main:app --reload`
2. Run frontend with `npm run dev`
3. Frontend makes direct API calls to localhost:8000
4. CORS configured for local development on port 8080

## Key Dependencies

### Backend (Python)
- `fastapi` + `uvicorn` - Web framework and ASGI server
- `langchain` + `langchain-community` - RAG framework
- `transformers` + `sentence-transformers` - ML models
- `faiss-cpu` - Vector database for embeddings
- `pypdf` - PDF text extraction
- `sqlalchemy` + `passlib` - Database and authentication

### Frontend (Node.js)
- `react` + `react-dom` - UI framework
- `react-router-dom` - Client-side routing
- `@tanstack/react-query` - Server state management
- `@radix-ui/*` - UI component primitives
- `tailwindcss` - Utility-first CSS framework
- `vite` - Build tool and dev server