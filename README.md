# Orchestrator Search Service

## Architecture
- **API Layer**: Express controllers
- **Application Layer**: IndexService, SearchService
- **Repository**: In-memory task storage
- **Worker**: Async task processing
- **External Service**: MockSearchEngine

## API Endpoints
- `POST /index/start` - Start indexing a source (idempotent)
- `GET /index/:taskId` - Get task status
- `POST /index/:taskId/cancel` - Cancel a task
- `POST /index/reindex` - Reindex a source
- `GET /search?q=query` - Search documents

## Features
- Async background task processing
- Idempotent indexing
- Cancel and reindex tasks
- Error handling and logging
- Minimal test coverage

## How to run
```bash
npm install
npm start
npm test