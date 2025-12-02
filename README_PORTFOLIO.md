# 🎨 Modern 3D Portfolio Website

A stunning, fully responsive portfolio website built with React, TypeScript, Three.js, Framer Motion, and GSAP. Features include an interactive terminal, 3D animations, light/dark theme toggle, and smooth scroll effects.

## ✨ Features

### 🎯 Core Features
- **3D Interactive Hero**: React Three Fiber sphere with mouse parallax and scroll-based scaling
- **Advanced Terminal System**: 
  - GSAP-powered typing animations
  - Working commands (help, about, skills, projects, experience, contact)
  - Interactive contact form inside terminal
  - Startup sequence animation
  - Minimize/maximize functionality
- **3D Tech Icons**: Hover to see icons rotate with 3D effects
- **Theme Toggle**: Smooth transitions between light and dark modes
- **Smooth Animations**: 
  - Framer Motion for UI animations
  - GSAP for terminal effects
  - Scroll-triggered reveals
- **Fully Responsive**: Works beautifully on mobile, tablet, and desktop

### 📱 Sections
1. **Hero**: Animated 3D background with floating object
2. **About**: Introduction with smooth reveal
3. **Skills**: Tech stack with 3D rotating icons
4. **Projects**: Project showcase with hover effects
5. **Experience**: Timeline of work history
6. **Contact**: Social links and contact button
7. **Terminal**: Interactive terminal (desktop only)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - UI animations
- **GSAP** - Terminal animations
- **React Three Fiber** - 3D graphics
- **React Icons** - Official tech logos

### 3D & Animation
- Three.js
- React Three Fiber
- Drei helpers
- GSAP for typing effects

### Tools
- Git
- VS Code
- ESLint

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**

2. **Install dependencies**:
```bash
npm install
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open in browser**:
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## 📝 Customization Guide

### 1. Update Personal Information

**Hero Section** (`src/components/Hero.tsx`):
```typescript
<h1>Your Name</h1>
<p>Your Title</p>
```

**About Section** (`src/components/About.tsx`):
- Update the description text
- Modify the content to match your background

**Contact Section** (`src/components/Contact.tsx`):
```typescript
const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/yourusername' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  // ... update all links
];
```

### 2. Customize Skills

**Edit** `src/components/Skills.tsx`:
```typescript
export const skillCategories = [
  {
    category: 'Your Category',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  },
  // Add more categories
];
```

**Add new tech icons** in `src/components/SkillIcon3D.tsx`:
```typescript
import { SiYourTech } from 'react-icons/si';

const iconMap: Record<string, any> = {
  'Your Tech': SiYourTech,
  // Add more
};
```

### 3. Update Projects

**Edit** `src/components/Projects.tsx`:
```typescript
export const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    technologies: ['React', 'Node.js'],
    tech: ['React', 'Node.js'],
    link: 'https://project-link.com',
    github: 'https://github.com/...',
    demo: 'https://demo-link.com',
  },
  // Add more projects
];
```

### 4. Update Experience

**Edit** `src/components/Experience.tsx`:
```typescript
export const experiences = [
  {
    role: 'Your Role',
    company: 'Company Name',
    period: '2023 - Present',
    description: 'What you did...',
    technologies: ['Tech 1', 'Tech 2'],
  },
  // Add more experiences
];
```

### 5. Customize Terminal Commands

**Edit** `src/components/TerminalAdvanced.tsx`:

Update startup sequence:
```typescript
const startupSequence = [
  { text: 'Your startup message...', delay: 0.5 },
  // Modify messages
];
```

Customize command outputs:
```typescript
const commands = {
  about: \`Your custom about text...\`,
  // Modify other commands
};
```

### 6. Customize Theme Colors

**Edit** `src/index.css`:

```css
:root {
  /* Change primary color (cyan by default) */
  --primary: 180 80% 50%; /* HSL values */
  
  /* Modify other colors */
  --background: 220 20% 8%;
  --foreground: 210 15% 92%;
}

.light {
  /* Light theme colors */
  --primary: 180 70% 40%;
}
```

**Update Tailwind config** `tailwind.config.ts` if needed.

### 7. Customize 3D Object

**Edit** `src/components/FloatingObject.tsx`:

Change shape:
```typescript
// Replace Sphere with Box, Torus, etc.
<Box args={[1, 1, 1]}>
  <MeshDistortMaterial
    color="#your-color"
    distort={0.4}
    speed={2}
  />
</Box>
```

## 🎨 Design System

The portfolio uses a semantic design system with HSL colors:

### Dark Theme
- Background: Dark blue-gray
- Primary: Cyan (#00d9ff)
- Accents: Glowing cyan effects

### Light Theme
- Background: Off-white
- Primary: Darker cyan
- Adjusted shadows and borders

All colors use CSS variables for easy theming.

## 📂 Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Hero section with 3D
│   ├── About.tsx             # About section
│   ├── Skills.tsx            # Skills grid
│   ├── SkillIcon3D.tsx       # 3D skill icons
│   ├── Projects.tsx          # Projects showcase
│   ├── Experience.tsx        # Work timeline
│   ├── Contact.tsx           # Contact section
│   ├── TerminalAdvanced.tsx  # Interactive terminal
│   ├── ThemeToggle.tsx       # Theme switcher
│   ├── Scene3D.tsx           # Three.js scene
│   ├── FloatingObject.tsx    # 3D floating sphere
│   └── ui/                   # Reusable UI components
├── contexts/
│   └── ThemeContext.tsx      # Theme management
├── pages/
│   └── Index.tsx             # Main page
├── index.css                 # Global styles & theme
├── main.tsx                  # App entry point
└── App.tsx                   # Root component
```

## 🐛 Troubleshooting

### Terminal not showing
- Terminal only appears on screens ≥768px (tablet/desktop)
- Check browser console for errors

### 3D not rendering
- Ensure WebGL is supported in your browser
- Check for Three.js console errors
- Try disabling browser extensions

### Icons not showing
- Make sure `react-icons` is installed
- Check that icon names match in `iconMap`

### Theme not switching
- Clear localStorage: `localStorage.clear()`
- Check ThemeProvider is wrapping the app

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Built with:
- [React](https://react.dev)
- [Three.js](https://threejs.org)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📧 Support

For issues or questions, please:
1. Check this README
2. Review the code comments
3. Check browser console for errors
4. See DEPLOYMENT.md for deployment help

---

**Note**: The terminal contact form is currently a demo. To enable actual email sending, follow the backend setup guide in `DEPLOYMENT.md`.
