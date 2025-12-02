# Terminal Email Setup Guide

## Quick Setup (5 minutes)

Your terminal email functionality is ready, but you need to add your API key to make it work.

### Option 1: Web3Forms (Recommended - FREE & Easy)

1. **Get Your API Key:**
   - Visit: https://web3forms.com/
   - Enter your email: `prajapatineel122002@gmail.com`
   - Click "Get Access Key"
   - Copy the access key they send to your email

2. **Add the Key to Your Code:**
   - Open: `src/components/TerminalAdvanced.tsx`
   - Find line ~222: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
   - Replace with your actual key: `access_key: 'your-actual-key-here'`

3. **Test It:**
   - Run your dev server
   - Open terminal in your portfolio
   - Type `contact`
   - Fill in the details
   - Email will be sent to `prajapatineel122002@gmail.com`

### Option 2: Formspree (Alternative)

1. **Create Account:**
   - Visit: https://formspree.io/
   - Sign up with your email
   - Create a new form
   - Copy the form endpoint (looks like: `https://formspree.io/f/xxxxxxxx`)

2. **Update Code:**
   ```tsx
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       name: data.name,
       email: data.email,
       subject: data.subject,
       message: data.message,
       _replyto: data.email,
     }),
   });

   if (response.ok) {
     // success
   }
   ```

### Debugging

If emails aren't sending:

1. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for "Email Response:" or "Email Error:" logs

2. **Common Issues:**
   - ❌ Invalid API key → Get a new one
   - ❌ CORS error → Use Web3Forms (has CORS enabled)
   - ❌ Network error → Check internet connection
   - ❌ Rate limit → Wait a few minutes

3. **Test the API Directly:**
   ```bash
   curl -X POST https://api.web3forms.com/submit \
     -H "Content-Type: application/json" \
     -d '{
       "access_key": "YOUR_KEY",
       "name": "Test",
       "email": "test@example.com",
       "message": "Test message"
     }'
   ```

### Current Configuration

- **Service:** Web3Forms
- **Endpoint:** https://api.web3forms.com/submit
- **Your Email:** prajapatineel122002@gmail.com
- **Features:**
  - ✅ Free forever
  - ✅ No signup required
  - ✅ 250 emails/month free tier
  - ✅ CORS enabled
  - ✅ Instant delivery

### Next Steps

1. Get your Web3Forms access key
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in the code
3. Test the contact form
4. You're done! 🎉

---

**Need Help?**
- Web3Forms Docs: https://docs.web3forms.com/
- Formspree Docs: https://help.formspree.io/
