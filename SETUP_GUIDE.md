# Quick Setup Guide

## EmailJS Setup (5-10 minutes)

1. **Create Account**

   - Go to: https://www.emailjs.com/
   - Sign up with email/Google/GitHub
2. **Connect Email Service**

   - In dashboard, click "Add Service"
   - Choose Gmail/Outlook/Other SMTP
   - Authorize the connection
   - Copy your **Service ID** (e.g., `service_xxx`)
3. **Create Email Template**

   - Click "Email Templates"
   - Create new template
   - Name: `contact_form` (or your choice)
   - HTML content:

   ```html
   <p>Name: {{from_name}}</p>
   <p>Email: {{from_email}}</p>
   <p>Message:</p>
   <p>{{message}}</p>
   ```

   - Copy your **Template ID** (e.g., `template_xxx`)
4. **Get Credentials**

   - Click "Account" in top menu
   - Copy your **Public Key** (e.g., `abc123xyz...`)
5. **Update Your Code**

   - Open `scripts/main.js `
   - Find these lines:

   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
   ```

   - Replace with your actual credentials:

   ```javascript
   emailjs.init("abc123xyz...");
   emailjs.sendForm('service_abc123', 'template_xyz789', this)
   ```
6. **Test**

   - Load your portfolio in browser
   - Fill out contact form
   - Submit message
   - Check your email for delivery

---

## GA4 Setup (5 minutes)

1. **Create GA4 Property**

   - Go to: https://analytics.google.com/
   - Sign in with Google
   - Click "Create property"
   - Fill in your website info
   - Platform: Web
   - Website URL: your domain
   - Accept terms
2. **Get Measurement ID**

   - Go to "Data Streams"
   - Select your web stream
   - Copy **Measurement ID** (G-XXXXXXXXXX)
3. **Update Your Code**

   - Open `index.html`
   - Find these lines in `<head>`:

   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     gtag('config', 'G-XXXXXXXXXX', {page_path: window.location.pathname});
   </script>
   ```

   - Replace `G-XXXXXXXXXX` with your actual ID (2 places)
4. **Verify Setup**

   - Go to GA4 dashboard
   - Click "Realize in Real Time"
   - Load your website
   - You should see "1 Active Now"
   - Within 24-48 hours, historical data appears

---

## Testing Checklist

- [X] Dark mode toggle works
- [X] Dark mode persists after reload
- [ ] Contact form sends email
- [X] Toast notification shows after submit
- [X] Form prevents double submission
- [ ] GA4 tracks page views (check Real Time)
- [ ] GA4 tracks dark mode toggle
- [ ] GA4 tracks CV download
- [ ] GA4 tracks social links
- [ ] JSON-LD is valid (test at https://search.google.com/test/rich-results)

---

## Frequently Asked Questions

**Q: How long does GA4 take to show data?**
A: Real-time data shows immediately, but historical reports take 24-48 hours to populate.

**Q: What if I don't want to use EmailJS?**
A: Alternative options:

- Formspree (https://formspree.io/) - easier setup
- Basin (https://usebasin.com/)
- Netlify Forms (if hosted on Netlify)

**Q: Will the dark mode work offline?**
A: Yes! Local storage persists the preference even without internet.

**Q: Can I customize dark mode colors?**
A: Yes! Edit CSS variables in `styles/main.css` under the `html.dark-mode` section.

**Q: Is EmailJS free?**
A: Yes! Free tier includes up to 200 emails/month. Paid plans available for higher volume.

---

## Security Tips

1. Never share your EmailJS Service ID, Template ID, or Public Key in git repos
2. Consider moving to environment variables for production
3. Monitor GA4 for spam traffic patterns
4. Test form validation on both client and server sides

---

**Need Help?**

- Check browser console (F12) for error messages
- EmailJS docs: https://www.emailjs.com/docs/
- GA4 help: https://support.google.com/analytics
