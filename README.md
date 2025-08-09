# Buildora

**An AI-Powered Code Generation Platform**

Buildora is a modern web application that allows users to generate full-stack applications through natural language prompts. It uses AI agents to create complete Next.js projects with realistic functionality, running in isolated sandboxed environments.

## 🚀 Features

- **AI-Powered Code Generation**: Transform natural language descriptions into complete, functional web applications
- **Real-time Code Preview**: View generated applications instantly with live preview and code inspection
- **Sandboxed Development Environment**: Secure, isolated environments powered by E2B for safe code execution
- **Interactive Chat Interface**: Conversational interface for refining and iterating on generated code
- **File Explorer**: Browse and examine generated code with syntax highlighting
- **Project Management**: Organize multiple projects with persistent storage
- **Responsive Design**: Modern UI built with Tailwind CSS and Shadcn/UI components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 with React 19
- **Styling**: Tailwind CSS 4.0 with Shadcn/UI components
- **State Management**: TanStack Query (React Query) for server state
- **Type Safety**: TypeScript throughout the application
- **Icons**: Lucide React icons

### Backend
- **API**: tRPC for type-safe API calls
- **Database**: PostgreSQL with Prisma ORM
- **Background Jobs**: Inngest for reliable background processing
- **AI Integration**: OpenAI GPT-4 with Agent Kit for code generation
- **Sandboxing**: E2B Code Interpreter for secure code execution

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js configuration
- **Build Tool**: Next.js with Turbopack for fast development

## 📋 Prerequisites

- Node.js 22 or higher
- PostgreSQL database
- pnpm package manager
- OpenAI API key
- E2B API key
- Inngest account (for background jobs)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/buildora.git
   cd buildora
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/buildora"
   
   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"
   
   # E2B (Code Interpreter)
   E2B_API_KEY="your-e2b-api-key"


4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate deploy
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

```
buildora/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── sandbox-templates/      # E2B sandbox configurations
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/UI components
│   │   ├── code-view/    # Code syntax highlighting
│   │   └── file-explorer.tsx
│   ├── hooks/            # Custom React hooks
│   ├── inngest/          # Background job functions
│   ├── lib/              # Utility functions and configurations
│   ├── modules/          # Feature-specific modules
│   │   ├── messages/     # Chat message handling
│   │   └── projects/     # Project management
│   ├── trpc/             # tRPC configuration and routers
│   └── types.ts          # TypeScript type definitions
├── components.json        # Shadcn/UI configuration
└── next.config.ts        # Next.js configuration
```

## 🔄 How It Works

1. **Project Creation**: Users input a natural language description of their desired application
2. **AI Processing**: The prompt is sent to an AI agent powered by GPT-4
3. **Code Generation**: The AI agent generates complete Next.js applications using provided tools:
   - `terminal`: Execute commands in the sandbox
   - `createOrUpdateFiles`: Create and modify files
   - `readFiles`: Read existing files
4. **Sandbox Execution**: Generated code runs in a secure E2B sandbox environment
5. **Real-time Preview**: Users can preview the live application and browse the generated code
6. **Iteration**: Users can continue the conversation to refine and enhance their applications

## 🎯 Key Features Explained

### AI Agent System
- Uses Inngest Agent Kit with OpenAI GPT-4
- Sophisticated prompt engineering for high-quality code generation
- Built-in safety measures and error handling
- Automatic dependency management and project structure

### Sandboxed Execution
- E2B Code Interpreter provides isolated environments
- Pre-configured with Next.js 15.3.3 and Shadcn/UI
- Real-time code execution and preview
- Secure file system operations

### Database Schema
- **Projects**: Store user projects with metadata
- **Messages**: Chat history with role-based messaging
- **Fragments**: Generated code snippets with sandbox URLs
- Proper relationships and cascading deletes

## 🚀 Deployment

### Environment Setup
1. Set up a PostgreSQL database
2. Configure environment variables for production
3. Set up Inngest for background job processing
4. Deploy to your preferred platform (Vercel, Railway, etc.)

### Database Migration
```bash
npx prisma migrate deploy
```

### Build for Production
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use Shadcn/UI components for consistent styling
- Implement proper error handling
- Write meaningful commit messages
- Ensure responsive design across devices

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful, accessible components
- [E2B](https://e2b.dev/) for secure code execution environments
- [Inngest](https://inngest.com/) for reliable background job processing
- [tRPC](https://trpc.io/) for type-safe API development
- [Prisma](https://prisma.io/) for modern database toolkit

---

**Built with ❤️ using Next.js, TypeScript, and AI**


## Developer Commands
### Docker Template Build:
e2b template build --name buildora-9417679910 --cmd "/compile_page.sh"

### Prisma Client Generate:
pnpm dlx prisma generate

pnpm dlx prisma migrate dev

### Inngest Server
pnpm dlx inngest-cli@latest dev
