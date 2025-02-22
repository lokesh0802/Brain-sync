# Brain-sync Server

A TypeScript-based Node.js server using Express, MongoDB, JWT authentication, and AI integration.

## Technologies Used

- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Google Cloud AI Platform
- Qdrant vector database
- Axios for HTTP requests
- Bcrypt for password hashing
- Dotenv for environment variables

## Prerequisites

- Node.js (>= 14.0.0)
- MongoDB instance
- Google Cloud AI Platform access
- Qdrant instance (for vector database)

## Project Structure

```
server/
├── src/                      # Source code directory
│   ├── db.ts                 # Database connection setup
│   ├── index.ts             # Main application entry point
│   ├── middleware.ts        # Express middleware
│   ├── utils.ts             # Utility functions
│   ├── generate_vector/     # Vector generation utilities
│   │   ├── generateembedding.ts
│   │   ├── insertData.ts
│   │   └── search_invector.ts
│   ├── senddatato_gemini/   # Gemini AI integration
│   │   ├── search.ts
│   │   └── senddatatogemini.ts
│   └── sendvector_tomodel/  # Model integration
│       └── send_data_to_model.ts
├── dist/                    # Compiled JavaScript output
├── docs/                    # Documentation
├── .env                     # Environment variables
├── package.json            # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# MongoDB Connection
CONNECTION_URL="your-mongodb-connection-string"

# Qdrant Vector Database
quadranturl="your-qdrant-cloud-url"
quadranapiKey="your-qdrant-api-key"

# Google AI Platform
GEMINI_API_KEY="your-gemini-api-key"
```

Example values (replace with your own credentials):
```
CONNECTION_URL="mongodb+srv://username:password@cluster0.example.net/database"
QDRANT_API_URL="https://xxx-xxx-xxx.cloud.qdrant.io:6333"
QDRANT_API_KEY="your-qdrant-api-key"
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="any strong"
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file
   - Add required environment variables as shown above

4. Build the project:
```bash
npm run build
```

## Running the Server

### Development Mode

```bash
npm run dev
```
This runs the server using nodemon for automatic reloading during development.

### Production Mode

```bash
npm run build
npm start
```

## Scripts

- `npm start`: Runs the compiled server
- `npm run dev`: Runs the server in development mode with hot reloading
- `npm run build`: Compiles TypeScript to JavaScript
- `npm test`: Runs tests (not configured yet)

## TypeScript Configuration

The project uses TypeScript with the following key configurations:
- Target: ES2016
- Module: CommonJS
- Strict type checking enabled
- ESModuleInterop enabled
- Output directory: ./dist
- Source directory: ./src

## Features

- Express server setup with TypeScript
- MongoDB integration using Mongoose
- JWT-based authentication
- Vector database integration with Qdrant
- Google Cloud AI Platform integration
- API endpoints for data processing and AI operations
- Middleware for request handling and authentication
- Environment-based configuration

## Development

1. Make changes in the `src` directory
2. TypeScript files will be automatically compiled on save in dev mode
3. Use `npm run build` to manually compile
4. Generated JavaScript files are in the `dist` directory

## Dependencies

Key dependencies include:
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcrypt: Password hashing
- @google-cloud/aiplatform: Google AI integration
- @qdrant/js-client-rest: Qdrant client
- typescript: Development dependency
