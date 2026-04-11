# Aziron Landing Page

A modern, responsive landing page built with Next.js 15, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ⚡️ **Next.js 15** with App Router for optimal performance
- 🎨 **Tailwind CSS** for beautiful, responsive design
- 📱 **Mobile-First** responsive design
- 🎯 **TypeScript** for type safety
- 🧩 **Modular Components** for easy maintenance
- ♿️ **Accessible** following best practices
- 🎭 **Modern UI** with gradient effects and animations

## 📦 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
└── components/
    ├── Header.tsx        # Navigation header
    ├── Hero.tsx          # Hero section with CTA
    ├── Features.tsx      # Features showcase
    ├── Benefits.tsx      # Benefits/Why Choose Us
    ├── Testimonials.tsx  # Customer testimonials
    ├── CTA.tsx          # Call-to-action section
    └── Footer.tsx        # Footer with links
```

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page in your browser.

The page auto-updates as you edit the files!

## 🎨 Customization

### Update Content

1. **Hero Section**: Edit `src/components/Hero.tsx` to change the main headline and CTA
2. **Features**: Modify the features array in `src/components/Features.tsx`
3. **Testimonials**: Update testimonials in `src/components/Testimonials.tsx`
4. **Brand Colors**: Adjust Tailwind classes throughout components

### Replace Placeholder Images

The hero section includes a placeholder. Replace it with your actual product screenshots or illustrations.

### Customize Colors

The design uses a blue-purple gradient theme. Update the gradient classes throughout:
- `from-blue-600 to-purple-600` 
- Modify in components as needed

## 📝 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This Next.js app can be deployed on any platform that supports Node.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway
- And more!

## 🎯 Based on Figma Design

This landing page is implemented based on the Aziron Figma design. Customize components to match your exact design specifications.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
