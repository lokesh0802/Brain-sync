# Brain-sync

Brain-sync is a full-stack application that combines vector embeddings with AI to provide intelligent content management and search capabilities.

## Features

- **Smart Content Management**: Add and organize your content efficiently
- **Vector-based Search**: Utilizes vector embeddings for semantic search functionality
- **AI Integration**: Leverages Google's Gemini AI for enhanced content processing
- **Interactive Dashboard**: Modern React-based user interface
- **Real-time Updates**: Immediate content synchronization

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Custom UI components
- React Hooks for state management

### Backend
- Node.js/TypeScript server
- Vector database integration
- Google Gemini AI integration
- Environment-based configuration

## Project Structure

```
├── brain-frontend/          # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── icons/         # SVG icons as components
│   │   └── pages/         # Application pages/routes
│   
└── server/                 # Backend server
    └── src/
        ├── generate_vector/    # Vector embedding generation
        ├── senddatato_gemini/  # Gemini AI integration
        └── sendvector_tomodel/ # Model interaction logic
```

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd brain-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with required configurations

4. Start the server:
```bash
npm run dev
```

## Usage

1. Access the dashboard at the provided localhost URL after starting both servers
2. Use the sidebar to navigate between different sections
3. Add content using the Add Content interface
4. Search through your content using the semantic search functionality
5. Manage and organize your content through the interactive dashboard

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Tech Features

- Vector embeddings for semantic search
- Real-time content synchronization
- Mobile-responsive design
- TypeScript for type safety
- Component-based architecture
- Custom hooks for state management
- Modular backend architecture
- Environment-based configuration
- AI-powered content processing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

For more detailed information about specific components or features, please check the individual README files in the frontend and backend directories.
