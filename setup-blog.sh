#!/bin/bash

echo "🚀 Blog System Setup Script"
echo "============================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "📝 Please create .env.local with the following variables:"
    echo ""
    echo "DATABASE_URL=\"mongodb+srv://username:password@cluster.mongodb.net/vandana_blog?retryWrites=true&w=majority\""
    echo "NEXTAUTH_SECRET=\"your-random-secret-key\""
    echo "NEXTAUTH_URL=\"http://localhost:3000\""
    echo "ADMIN_PASSWORD=\"your-secure-password\""
    echo ""
    exit 1
fi

echo "✅ .env.local found"
echo ""

# Initialize Prisma
echo "📦 Setting up Prisma..."
bunx prisma migrate dev --name init

echo ""
echo "✅ Database migration complete!"
echo ""

# Open Prisma Studio to create categories
echo "🎨 Opening Prisma Studio to create initial categories..."
echo "   (You can manually add categories in the Category table)"
echo ""
echo "Press Ctrl+C when done adding categories."
echo ""

bunx prisma studio

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the dev server: bun dev"
echo "2. Visit http://localhost:3000/blog for the public blog page"
echo "3. Visit http://localhost:3000/admin/blogs for the admin dashboard"
echo ""
