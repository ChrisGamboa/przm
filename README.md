# PRZM - Tow Truck Management System

A modern tow truck management system built with RedwoodSDK, featuring real-time job tracking, payment processing, and digital signatures. This is a take-home project for a startup interview.

## 🚛 Features

- **Job Management**: Complete tow job lifecycle from dispatch to completion
- **Real-time Tracking**: Live job status updates and progress tracking
- **Payment Processing**: Integrated payment handling with digital signatures
- **Mobile-First Design**: Responsive UI optimized for mobile devices
- **Digital Signatures**: Customer and impound lot signature capture
- **Photo Documentation**: Vehicle photo capture and storage
- **Location Services**: GPS coordinates and address management

## 🛠️ Tech Stack

### Core Technologies
- **RedwoodSDK** (0.3.8) - Full-stack framework for Cloudflare Workers
- **React** (19.1.2) - UI library with Server Components
- **TypeScript** (5.8.3) - Type-safe development
- **Vite** (6.2.6) - Build tool and dev server

### Database & Storage
- **Prisma** (6.8.2) - Database ORM with D1 adapter
- **Cloudflare D1** - SQLite database
- **Cloudflare Durable Objects** - Session management

### UI & Styling
- **Tailwind CSS** (4.1.13) - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Shadcn/ui** - Pre-built component library


### Development & Testing
- **Storybook** (9.1.5) - Component development and testing
- **Vitest** (3.2.4) - Unit and integration testing
- **Playwright** (1.55.0) - End-to-end testing

### Deployment
- **Cloudflare Workers** - Serverless deployment
- **Wrangler** (4.20.5) - Cloudflare Workers CLI

## 🚀 Getting Started

### Prerequisites

- Node.js 22.19.0 (use `nvm use 22.19.0`)
- npm or pnpm
- Cloudflare account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd przm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:setup
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Follow the .env.example file (database_url not needed for local)**
   ```bash
   WEBAUTHN_RP_ID=localhost
   AUTH_SECRET_KEY=your-development-secret-key
   DATABASE_URL=your-db-url
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   # Optional: Enable Turnstile bot protection
   # TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
   ```


Note: Trying to save you time here. I did a hacky DB setup script because otherwise you would need to run `npm run dev` and then, find your path to your local D1 path, add it to environment variables, run the migrations, etc etc due to Cloudflare/Wrangler initial set up.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run database migrations
npm run migrate:dev

# Seed database
npm run seed

# Run tests
npm run test

# Start Storybook
npm run storybook

# Type checking
npm run types
```

## 📱 Application Structure

### Core Pages
- **Home** (`/`) - Landing page
- **Job Queue** (`/job-queue`) - Main job management interface
- **Job Details** (`/jobs/:id`) - Individual job details and management

### Key Components
- **JobQueueScreen** - Main job listing and management
- **JobCard** - Individual job display component
- **JobDetailsScreen** - Detailed job view and editing
- **PaymentForm** - Payment processing interface
- **SignatureCanvas** - Digital signature capture

### Database Models
- **User** - Tower company users
- **TowJob** - Complete job information including:
  - Customer and vehicle details
  - Location and timing information
  - Payment and signature data
  - Status tracking and assignments

## 🔧 Configuration

### Wrangler Configuration
The project uses Cloudflare Workers with the following bindings:
- **D1 Database**: `przm-grim-coyote` for data persistence
- **Durable Objects**: Session management

### Database Schema
The application uses a comprehensive schema supporting:
- User management
- Job lifecycle management with status tracking
- Payment processing with multiple methods
- Digital signature storage
- Location and vehicle information

## 🚀 Deployment

### Local Development
```bash
# Ensure you're using the correct Node version
nvm use 22.19.0

# Start the development server
npm run dev
```

### Production Deployment
```bash
# Build and deploy to Cloudflare Workers
npm run release
```

### Database Setup
1. Create a D1 database in Cloudflare dashboard
2. Update `wrangler.jsonc` with your database ID
3. Run migrations: `npm run migrate:prd`

## 📚 Additional Resources

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 👨‍💻 Author

**Christian Gamboa** - Take-home project for startup interview

---

*Built with ❤️ using RedwoodSDK and modern web technologies*