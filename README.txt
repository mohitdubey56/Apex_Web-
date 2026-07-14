╔══════════════════════════════════════════════════════════════╗
║        APEX COMPUTER INSTITUTE — Website README              ║
║        Deployment Guide & Project Overview                   ║
╚══════════════════════════════════════════════════════════════╝

📁 PROJECT STRUCTURE
═══════════════════
apex-computer-institute/
├── index.html          → Homepage (Hero, Courses, Testimonials...)
├── courses.html        → All 4 course detail pages + FAQ
├── about.html          → Institute story, faculty, values
├── gallery.html        → Filterable photo gallery + lightbox
├── testimonials.html   → Student reviews + video placeholder
├── contact.html        → Enquiry form + map + hours
├── admission.html      → Full admission form + fee table
├── 404.html            → Custom error page
├── favicon.svg         → Browser tab icon
├── css/
│   ├── style.css       → Global vars, navbar, footer, dark mode
│   ├── index.css       → Homepage styles
│   ├── courses.css     → Courses page styles
│   ├── about.css       → About page styles
│   ├── gallery.css     → Gallery + lightbox styles
│   ├── testimonials.css→ Reviews page styles
│   ├── contact.css     → Contact form + map styles
│   ├── admission.css   → Admission form + print styles
│   └── 404.css         → Error page styles
└── js/
    ├── main.js         → Navbar, dark mode, scroll-top, active links
    ├── animations.js   → Preloader, typewriter, counters, scroll reveal
    ├── gallery.js      → Filter tabs, lightbox, keyboard nav
    └── form.js         → Form validation, toast notifications

══════════════════════════════════════════════════════════════
🚀 DEPLOYMENT — NETLIFY (Recommended — Free)
══════════════════════════════════════════════════════════════

OPTION 1: Drag & Drop (Easiest — 60 seconds)
──────────────────────────────────────────────
1. Go to https://netlify.com and sign up (free)
2. On your Netlify dashboard, find "Deploy" section
3. Drag the entire "apex-computer-institute" FOLDER onto the deploy area
4. Netlify auto-deploys and gives you a URL like:
   https://random-name-123.netlify.app
5. Customize domain in Site Settings → Domain Management

OPTION 2: GitHub + Netlify (Recommended for updates)
──────────────────────────────────────────────────────
1. Create a GitHub account at https://github.com (free)
2. Create new repository: "apex-computer-institute"
3. Upload all files (drag & drop works in GitHub)
4. Go to https://netlify.com → "New site from Git"
5. Connect GitHub → Select your repo → Deploy
6. Every time you push to GitHub, site auto-updates!

OPTION 3: GitHub Pages (Free hosting by GitHub)
────────────────────────────────────────────────
1. Create GitHub account at https://github.com
2. Create new repository named: "apex-computer-institute"
3. Upload all files
4. Go to repo Settings → Pages → Source: main branch → /root
5. Site available at: https://yourusername.github.io/apex-computer-institute/

══════════════════════════════════════════════════════════════
🌐 CUSTOM DOMAIN SETUP
══════════════════════════════════════════════════════════════
1. Buy domain at GoDaddy/Namecheap (~₹800/year):
   apexcomputerinstitute.in  or  apexinstitutekaimur.in

2. In your domain registrar, add DNS records:
   Type: A     Name: @    Value: 75.2.60.5  (Netlify IP)
   Type: CNAME Name: www  Value: your-netlify-app.netlify.app

3. In Netlify: Site Settings → Domain → Add custom domain
4. Enable HTTPS (free SSL) — Netlify does this automatically

══════════════════════════════════════════════════════════════
🔧 CUSTOMIZATION GUIDE
══════════════════════════════════════════════════════════════
To change phone number:   Search "+91 98765 43210" → Replace all
To change WhatsApp:       Search "wa.me/919876543210" → Replace all
To change email:          Search "info@apexcomputerinstitute.in"
To change address:        Search "Kaimur District, Bihar"
To change fees:           Edit courses.html fee sections
To change colors:         Edit css/style.css :root variables
To add real images:       Replace Unsplash URLs with actual image paths
To add Google Analytics:  Paste GA4 script before </head> in each page

══════════════════════════════════════════════════════════════
⚡ FEATURES INCLUDED
══════════════════════════════════════════════════════════════
✅ 8 Complete HTML Pages
✅ Dark Mode (saved in browser)
✅ Mobile Responsive (all screen sizes)
✅ Preloader Animation
✅ Typewriter Hero Effect
✅ Animated Stats Counters
✅ Auto-playing Testimonial Slider
✅ Gallery with Filter + Lightbox
✅ Form Validation (contact + admission)
✅ Toast Notifications
✅ Floating WhatsApp Button (pulse animation)
✅ Scroll-to-Top Button
✅ Sticky Navbar with scroll effect
✅ Announcement Marquee
✅ Scroll Reveal Animations
✅ SEO Meta Tags (all pages)
✅ Print-friendly Admission Form
✅ Accessibility (ARIA labels, semantic HTML)
✅ No jQuery, No Bootstrap — Pure HTML/CSS/JS

══════════════════════════════════════════════════════════════
📞 SUPPORT
══════════════════════════════════════════════════════════════
This is sample/demo data. Update all contact details with
real information before going live.

⚠️  IMPORTANT: All data shown is SAMPLE/DEMO only.
    Replace with real institute information before publishing.

Built with ❤️ for Bihar's students | Apex Computer Institute 2024
