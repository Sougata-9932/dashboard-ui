# AI Agent Dashboard

A modern, fully interactive dashboard for managing AI agents, document processing workflows, and real-time collaboration. Built with React, TypeScript, Vite, and Tailwind CSS.

![Dashboard Preview](file:///C:/Users/WELCOME/.gemini/antigravity/brain/730a813f-734f-4e0d-a7e0-9fd817415d2c/main_dashboard_view_1765882758971.png)

## 🌟 Features

### Core Functionality
- **📁 File Upload System** - Drag & drop file upload with support for PDF, DOC, DOCX, TXT, CSV, and XLSX formats
- **🤖 AI Agent Selection** - Choose from 4 specialized AI agents with real-time processing states
- **💬 Interactive Chat** - Send messages and receive AI responses with typing indicators
- **📊 Progress Tracking** - Animated progress counter with visual status updates
- **⚡ Workflow Automation** - Auto-cycling process flow visualization

### Navigation & Views
- **🏠 Home Dashboard** - Main control center with upload, agents, and status widgets
- **🔍 Search** - Full-text search with filtering across documents, agents, and insights
- **📚 Layers** - Workflow pipeline management with 3 pre-configured processing flows
- **👤 Profile** - User profile with statistics and activity overview
- **💼 Workspace** - Collaborative environment with graph visualization and chat

### UI/UX Features
- **Responsive Design** - Optimized for all screen sizes
- **Smooth Animations** - Custom CSS animations and transitions
- **Interactive Feedback** - Hover states, loading spinners, and visual indicators
- **Keyboard Navigation** - Enter to send messages, search functionality
- **Profile Dropdown** - Quick access to settings and profile options

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge
- **Development**: ESLint, TypeScript ESLint

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🚀 Usage

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Key Interactions

#### File Upload
1. Navigate to Home dashboard
2. Click or drag files into the upload zone
3. View uploaded file details
4. Click "Remove File" to clear

#### Agent Selection
1. Choose from 4 specialized agents
2. Click "Start Processing" to initiate workflow
3. Observe processing animation

#### Chat Interface
1. Switch to "Processing Workspace" view
2. Type message in chat input
3. Press Enter or click send button
4. View AI responses with typing indicators

#### Search
1. Click Search icon in sidebar, or
2. Type query in header search bar
3. Press Enter to filter results
4. View documents, agents, and insights

#### Navigation
- **Home**: Click home icon or logo
- **Search**: Click search icon or use header search
- **Layers**: View workflow pipelines
- **Profile**: Access user profile and stats

## 📁 Project Structure

```
dashboard-ui/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Main layout wrapper
│   │   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   │   └── Header.tsx          # Top header with search
│   │   ├── dashboard/
│   │   │   ├── UploadZone.tsx      # File upload component
│   │   │   ├── ProcessFlow.tsx     # Workflow visualization
│   │   │   ├── AgentSelector.tsx   # Agent selection panel
│   │   │   └── StatusCard.tsx      # Progress indicator
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx   # Chat messaging UI
│   │   │   └── GraphView.tsx       # Network graph
│   │   └── views/
│   │       ├── SearchView.tsx      # Search results page
│   │       ├── ProfileView.tsx     # User profile page
│   │       └── LayersView.tsx      # Workflow management
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts              # Vite types
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js             # Tailwind config
├── vite.config.ts                 # Vite config
└── README.md                      # Documentation
```

## 🎨 Component Documentation

### Layout Components

#### `Layout.tsx`
Main layout wrapper that contains sidebar and content area.
- **Props**: `children`, `activeView`, `onNavigate`
- **Features**: Responsive flex layout, sidebar integration

#### `Sidebar.tsx`
Vertical navigation bar with icon buttons.
- **Props**: `active`, `onNavigate`
- **Features**: 4 nav items, 2 bottom actions, active state indicator

#### `Header.tsx`
Top header with search and profile menu.
- **Props**: `onSearch`
- **Features**: Search bar with Enter key submit, profile dropdown menu

### Dashboard Components

#### `UploadZone.tsx`
File upload area with drag & drop.
- **State**: `isDragging`, `uploadedFile`
- **Features**: Drag events, file validation, remove functionality

#### `AgentSelector.tsx`
Agent selection panel with 4 options.
- **State**: `selected`, `isProcessing`
- **Features**: Visual selection, processing animation, descriptions

#### `StatusCard.tsx`
Circular progress indicator.
- **State**: `progress` (animated 0→60%)
- **Features**: SVG circle animation, status text

#### `ProcessFlow.tsx`
Auto-cycling workflow visualization.
- **State**: `activeStep`
- **Features**: 3 steps with emojis, 2-second interval, smooth transitions

### Chat Components

#### `ChatInterface.tsx`
Interactive chat messaging UI.
- **State**: `messages`, `inputValue`, `isTyping`
- **Features**: Send/receive messages, auto-scroll, typing indicators

#### `GraphView.tsx`
Network graph visualization.
- **Features**: Node positioning, connecting lines, labels

### View Components

#### `SearchView.tsx`
Search results page with filtering.
- **Props**: `searchQuery`
- **Features**: Filter by query, categorized results, hover states

#### `ProfileView.tsx`
User profile with stats.
- **Features**: Avatar, cover image, contact info, activity metrics

#### `LayersView.tsx`
Workflow pipeline management.
- **State**: `activeWorkflow`
- **Features**: 3 workflows, step breakdown, run/configure actions

## 🎯 Features Deep Dive

### File Upload System
- Accepts multiple file formats (PDF, DOC, DOCX, TXT, CSV, XLSX)
- Drag & drop with visual feedback
- Displays file metadata (name, size, type)
- Remove and re-upload capability

### AI Agent Types
1. **General Purpose Agent** - Versatile AI for general tasks
2. **Data Analysis Agent** - Specialized in data insights  
3. **Document Parser** - Extract structured data
4. **Summary Generator** - Create concise summaries

### Workflow Pipelines
1. **Document Processing** - Upload → Parse → Analyze → Summarize → Export
2. **Data Analysis** - Ingest → Clean → Analyze → Visualize
3. **Multi-Agent Collaboration** - Assign → Process → Review → Merge → Validate → Export

## 🔧 Configuration

### Tailwind CSS v4
The project uses Tailwind CSS v4 with the new `@import` syntax:

```css
@import "tailwindcss";

@theme {
  --color-slate-50: #f8fafc;
  /* ... color definitions */
}
```

### Vite Configuration
Includes the `@tailwindcss/vite` plugin:

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 📝 Best Practices

### Code Organization
- Component-based architecture
- Separation of concerns (layout, dashboard, chat, views)
- TypeScript for type safety
- Props interface definitions

### State Management
- React hooks (useState, useEffect, useCallback)
- Local component state
- Prop drilling for simple data flow

### Styling
- Tailwind utility classes
- Custom CSS animations
- Responsive design patterns
- Consistent color palette (slate theme)

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real file processing
- [ ] Persistent storage
- [ ] User authentication
- [ ] Multiple user profiles
- [ ] Advanced workflow builder
- [ ] Real-time collaboration
- [ ] Export functionality
- [ ] Dark mode toggle
- [ ] Mobile app version

## 🐛 Troubleshooting

### Common Issues

**Build errors with Tailwind**
- Ensure `@tailwindcss/vite` is installed
- Check `vite.config.ts` includes the plugin
- Verify `@import "tailwindcss"` in CSS

**TypeScript errors**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration
- Use type-only imports for types

**Dev server not starting**
- Check if port 5173 is available
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Restart VS Code/terminal

## 📄 License

This project is available for use under standard licensing terms.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
