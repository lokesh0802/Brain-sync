# Brain Sync Backend

Node.js backend service with MongoDB and AI-powered vector search capabilities for the Brain Sync application.

## Features

### AI-Powered Search System
- **Vector Search with Qdrant**
  - Content embedding generation
  - Semantic similarity matching
  - Real-time search capabilities

- **Google Gemini Integration**
  - Advanced content analysis
  - Internet information gathering
  - Context enhancement
  - Related data compilation

### Data Management
- **Content Storage**
  - Multi-type content support (YouTube, Twitter, Projects)
  - MongoDB integration
  - Vector embeddings storage
  - Content metadata handling

## AI Search Implementation

### Vector Search Process
1. **Content Processing**
   - Text extraction from content
   - Vector embedding generation
   - Metadata association
   - Efficient storage in Qdrant

2. **Search Execution**
   - Query vector generation
   - Similarity matching
   - Result ranking
   - Content retrieval

3. **AI Analysis**
   - Gemini AI processing
   - Internet data gathering
   - Context compilation
   - Response formatting

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the server:
```bash
npm start
```

## Project Structure

```
server/
├── src/
│   ├── generate_vector/    # Vector search functionality
│   ├── senddatato_gemini/  # AI integration
│   ├── db.ts              # Database models
│   ├── index.ts           # Main application
│   ├── middleware.ts      # Custom middleware
│   └── utils.ts           # Utility functions
└── package.json           # Dependencies
```


## Technology Stack

- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **MongoDB** - Database
- **Qdrant** - Vector Search
- **Google Gemini** - AI Analysis
- **TypeScript** - Type Safety
- **JWT** - Authentication
- **bcrypt** - Password Hashing

## Search Response Format

### AI Analysis Response
```typescript
{
  searchResults: {
    _id: string,
    title: string,
    description: string,
    type: string,
    link?: string
  },
  analysis: {
    description: string,
    additionalContext: string,
    relatedInfo: string
  }
}
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Input validation
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
