# E-commerce Admin Dashboard

A modern, full-featured admin dashboard for e-commerce management built with Next.js 15, TypeScript, Prisma, and NextAuth.

## ✨ Features

### 🔐 Authentication
- **NextAuth v5** with multiple providers:
  - Email/password with bcrypt hashing
  - Google OAuth (ready for credentials)
  - Facebook OAuth (ready for credentials)
- Beautiful gradient login/register pages
- Password strength indicator
- Protected routes with middleware
- JWT-based sessions with role support
- User profile dropdown with logout

### 🎨 Modern UI/UX
- **Gradient Design System**: Blue, purple, and pink gradients throughout
- **Animations**: Framer Motion for smooth transitions
- **Animated Components**:
  - Counter animations on stat cards
  - Hover effects on all interactive elements
  - Page transitions and loading states
- **Toast Notifications**: Real-time feedback with Sonner
- **Responsive Design**: Mobile-friendly layouts

### 📊 Dashboard Features
- Real-time statistics with animated counters
- Gradient-enhanced charts (Recharts)
- Top products stock overview
- Total products, stock, and value metrics

### 📦 Product Management
- Full CRUD operations
- Category management
- Stock level indicators (color-coded)
- Image URL support
- Form validation with Zod
- Server-side rendering for performance

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts with gradient fills
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- (Optional) Google OAuth credentials
- (Optional) Facebook OAuth credentials

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd CDC_Admin_Dashboard_2

# Install dependencies
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb cdc_dashboard

# Create database user (if needed)
psql -c "CREATE USER mohit-adoni WITH PASSWORD 'admin123';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE cdc_dashboard TO mohit-adoni;"
```

### 3. Environment Variables

Create `.env` file:

```env
# Database
DATABASE_URL="postgresql://mohit-adoni:admin123@localhost:5432/cdc_dashboard"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-in-production

# Google OAuth (optional - get from https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (optional - get from https://developers.facebook.com/)
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

### 4. Database Migration

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed database with sample data
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### 5. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 📱 Usage

### First Time Setup

1. **Register Account**: Visit `/register` and create your admin account
2. **Login**: Use your credentials at `/login`
3. **Explore Dashboard**: View animated stats and charts at `/dashboard`
4. **Manage Products**: Create, view, and delete products at `/products`

### Creating Products

1. Click "Create New" button
2. Fill in product details:
   - Name (required)
   - Description (optional)
   - Price (required, positive number)
   - Stock quantity (required)
   - Category (required, select from dropdown)
   - Image URL (optional)
3. Submit to create product

### OAuth Setup (Optional)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Add redirect URI: `http://localhost:3000/api/auth/callback/facebook`
5. Copy App ID and Secret to `.env`

## 🗂️ Project Structure

```
├── actions/              # Server actions
│   ├── auth-actions.ts  # User registration
│   └── product-actions.ts # Product CRUD
├── app/
│   ├── (admin)/         # Protected admin routes
│   │   ├── dashboard/   # Dashboard page
│   │   ├── products/    # Products management
│   │   └── layout.tsx   # Admin shell layout
│   ├── login/           # Login page
│   ├── register/        # Register page
│   ├── api/auth/        # NextAuth API routes
│   └── layout.tsx       # Root layout
├── components/
│   ├── charts/          # Chart components
│   ├── dashboard/       # Dashboard components
│   ├── layout/          # Layout components
│   ├── ui/              # Reusable UI components
│   └── providers.tsx    # Session & toast provider
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Prisma client
│   └── utils.ts         # Utility functions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
├── types/
│   └── next-auth.d.ts   # NextAuth type extensions
└── middleware.ts        # Route protection
```

## 🎨 Design Features

### Color Palette
- **Primary**: Blue gradient (#3B82F6 → #8B5CF6)
- **Secondary**: Purple gradient
- **Accent**: Pink gradient
- **Background**: White/Gray-50
- **Text**: Gray-900/600

### Animations
- **Stat Cards**: Counter animation on mount
- **Navigation**: Smooth transitions with Framer Motion
- **Hover Effects**: Scale and shadow transformations
- **Page Transitions**: Fade and slide animations

### Components Showcase

#### Animated Stat Cards
```tsx
<StatCard
  title="Total Products"
  value={100}
  description="Active products"
  icon={Package}
  gradient="from-blue-600 to-blue-400"
  delay={0}
/>
```

#### Enhanced Charts
- Gradient bar fills
- Custom tooltips with shadows
- Angled labels for better readability
- Interactive hover states

## 📊 Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(ADMIN)
  name      String?
  createdAt DateTime @default(now())
}

model Category {
  id       String    @id @default(cuid())
  name     String
  slug     String    @unique
  products Product[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based sessions
- Protected API routes
- CSRF protection via NextAuth
- Environment variable validation
- Type-safe database queries

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Update production `.env`:
- Generate secure `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Use production database URL
- Add production OAuth redirect URIs

### Deployment Platforms

Compatible with:
- Vercel (recommended)
- Railway
- Render
- Heroku
- AWS/Google Cloud/Azure

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in .env
# Ensure database exists
```

### OAuth Not Working
- Verify redirect URIs match exactly
- Check credentials are correct in `.env`
- Ensure OAuth apps are in production mode (not testing)

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🎯 Roadmap

- [ ] Edit product functionality
- [ ] Bulk operations
- [ ] Order management
- [ ] Customer management
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] File upload for images
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Export data to CSV/PDF

## 💡 Tips

- **Email/password login works immediately** - no OAuth setup required
- Social logins are optional enhancements
- Sample data is seeded automatically
- All animations are performance-optimized
- TypeScript provides full type safety

---

Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.
