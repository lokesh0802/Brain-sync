# Brain Sync Frontend

A React TypeScript application for managing and organizing content from various sources including YouTube videos, tweets, and project descriptions.

## Features

### Content Management
- **Multiple Content Types**
  - YouTube videos with descriptions
  - Twitter posts with embeds
  - Project descriptions
  - Full support for multimedia content

### AI-Powered Search
- **Vector-Based Search**
  - Content is converted to embeddings for semantic search
  - Similar content detection
  - Context-aware results

- **AI Analysis Panel**
  - Real-time AI insights about searched content
  - Additional contextual information from the internet
  - Summarized relevant details
  - Enhanced understanding of content

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd brain-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
VITE_BACKEND_URL=https://brain-sync-server-production.up.railway.app
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
brain-frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # UI components
│   │   └── Loader/      # Loading states
│   ├── hooks/           # Custom hooks
│   ├── icons/           # SVG icons
│   ├── pages/           # Page components
│   └── config.ts        # Configuration
├── public/             # Static assets
└── package.json        # Dependencies
```

## Technology Stack

- **React** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **Axios** - API Requests

## AI Search Implementation

### Search Process
1. **Query Processing**
   - User enters search query
   - Query is sent to backend for vector conversion
   - Similar content is identified

2. **AI Analysis**
   - Content is analyzed by Google's Gemini AI
   - Additional context is gathered
   - Related information is compiled

3. **Results Display**
   - Main panel shows matching content
   - Side panel displays AI insights
   - Real-time updates as user refines search

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request
