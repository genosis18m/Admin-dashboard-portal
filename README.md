# E-commerce Admin Dashboard

A complete server-rendered e-commerce admin dashboard built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL with Prisma ORM (v5.22.0)
- **Styling:** Tailwind CSS + Lucide React icons
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts (Client Components)
- **TypeScript:** Full type safety

## Features

- 📊 **Dashboard** - Overview with stats cards and stock visualization
- 📦 **Product Management** - Full CRUD operations for products
- 🎨 **Modern UI** - Clean Vercel-style aesthetic with shadcn components
- ✅ **Form Validation** - Robust validation using Zod and React Hook Form
- 🔄 **Server Actions** - Next.js 15 server actions for mutations
- 📈 **Data Visualization** - Interactive charts using Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_admin?schema=public"
   ```

3. **Set up the database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Seed the database (optional):**
   
   Create some initial categories to get started:
   ```bash
   npx prisma db seed
   ```
   
   Or use Prisma Studio to add categories manually:
   ```bash
   npx prisma studio
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   
   Navigate to [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

## Project Structure

```
├── app/
│   ├── (admin)/           # Admin route group
│   │   ├── dashboard/     # Dashboard page
│   │   ├── products/      # Product management
│   │   └── layout.tsx     # Admin shell layout
│   ├── api/
│   │   └── categories/    # Categories API endpoint
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── actions/
│   └── product-actions.ts # Server actions for products
├── components/
│   ├── charts/            # Chart components
│   ├── layout/            # Layout components (Sidebar)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── db.ts              # Prisma singleton
│   └── utils.ts           # Utility functions
├── prisma/
│   └── schema.prisma      # Database schema
└── package.json
```

## Pages

### Dashboard (`/admin/dashboard`)
- Total products count
- Total stock across all products
- Total inventory value
- Stock overview chart (top 10 products by stock)

### Products (`/admin/products`)
- List all products with category, price, and stock
- Color-coded stock indicators
- Delete functionality
- Link to create new products

### Create Product (`/admin/products/new`)
- Form with validation:
  - Name (required)
  - Description (optional)
  - Price (required, positive number)
  - Stock (required, non-negative)
  - Category (required, dropdown)
  - Image URL (optional, must be valid URL)

## Database Schema

The application uses the following data models:

- **User** - Admin users with role-based access
- **Category** - Product categories
- **Product** - Products with relations to categories

See `prisma/schema.prisma` for the complete schema.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio database GUI
- `npx prisma migrate dev` - Create and apply migrations

## Notes

- Make sure to create at least one category before creating products
- The form requires a valid category to be selected
- Stock levels are color-coded: Green (>10), Yellow (1-10), Red (0)
- All prices are stored as Decimal with 2 decimal places

## License

MIT
# Admin-dashboard-portal
