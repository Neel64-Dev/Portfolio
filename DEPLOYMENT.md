# 🚀 Deployment Guide

This guide explains how to deploy your portfolio website to production.

## Frontend Deployment (Netlify/Vercel)

### Option 1: Deploy to Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   - **Via Netlify Dashboard**:
     - Go to [netlify.com](https://netlify.com)
     - Click "Add new site" → "Deploy manually"
     - Drag and drop the `dist` folder
   
   - **Via CLI**:
     ```bash
     netlify deploy --prod --dir=dist
     ```

### Option 2: Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

## Backend Setup (Node.js + Express)

### Contact Form Email Functionality

The terminal's contact form currently displays a demo message. To enable actual email sending:

1. **Create a backend server**:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `Portfolio Contact: ${subject}`,
    html: \`
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> \${name}</p>
      <p><strong>Email:</strong> \${email}</p>
      <p><strong>Subject:</strong> \${subject}</p>
      <p><strong>Message:</strong></p>
      <p>\${message}</p>
    \`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
```

2. **Install dependencies**:
```bash
npm install express nodemailer cors dotenv
```

3. **Create `.env` file**:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECEIVER_EMAIL=your-email@gmail.com
PORT=5000
```

4. **Deploy backend to Render**:
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your repository
   - Set environment variables
   - Deploy

5. **Update frontend to call your API**:

In `src/components/TerminalAdvanced.tsx`, update the email sending logic:

```typescript
// Replace the setTimeout simulation with actual API call
const response = await fetch('YOUR_BACKEND_URL/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contactData)
});

const result = await response.json();
setLines(prev => [...prev, { 
  type: result.success ? 'success' : 'error', 
  text: result.message 
}]);
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECEIVER_EMAIL=your-email@gmail.com
PORT=5000
DATABASE_URL=your-database-url (if using PostgreSQL/MongoDB)
```

## Database Setup (Optional)

### PostgreSQL Setup

1. Create a PostgreSQL database (e.g., on Railway, Supabase, or Render)

2. Install dependencies:
```bash
npm install pg
```

3. Create schema:
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Update backend to save to database:
```javascript
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Save to database
  await pool.query(
    'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)',
    [name, email, subject, message]
  );
  
  // Send email
  // ... email code here
});
```

### MongoDB Setup

1. Create MongoDB Atlas account and cluster

2. Install dependencies:
```bash
npm install mongoose
```

3. Create model:
```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
```

4. Connect and save:
```javascript
mongoose.connect(process.env.MONGODB_URI);

app.post('/api/contact', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  // ... send email
});
```

## Custom Domain Setup

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records at your domain provider

### Vercel
1. Go to Project settings → Domains
2. Add domain and follow DNS instructions

## Performance Optimization

Before deploying:

1. **Optimize images**: Use WebP format and lazy loading
2. **Minify code**: Vite does this automatically in build
3. **Enable caching**: Configure in your hosting platform
4. **Add compression**: Enable gzip/brotli compression

## SEO Setup

Update `index.html` with your actual information:

```html
<title>Your Name - Full Stack Developer Portfolio</title>
<meta name="description" content="Your portfolio description" />
<meta property="og:title" content="Your Name - Portfolio" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://your-site.com/og-image.jpg" />
```

## Monitoring

Set up monitoring and analytics:
- Google Analytics
- Sentry for error tracking
- Uptime monitoring (UptimeRobot, Pingdom)

## Support

For issues or questions:
- Check the [Vite documentation](https://vitejs.dev)
- Check the [React documentation](https://react.dev)
- Review hosting provider docs (Netlify, Vercel, Render)
