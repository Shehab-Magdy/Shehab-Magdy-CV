# Static Site Generator Migration Plan

## Why Migrate?

Current structure: Single HTML file with embedded data
- ✅ Works, but not scalable
- ❌ Hard to maintain portfolio items
- ❌ Manual updates needed for new projects
- ❌ No build optimization pipeline

Ideal structure: Static site generator
- ✅ Markdown-driven portfolio
- ✅ Template reusability
- ✅ Automated optimizations
- ✅ Version-controlled content
- ✅ Easy CI/CD integration

---

## Recommended Path: Eleventy

Eleventy (11ty) offers the best balance of flexibility and ease for this use case.

### Why Eleventy?
- Simple learning curve
- No forced conventions
- Great at static site generation
- Excellent performance
- Easy to understand templating

### Migration Steps

#### Step 1: Project Setup

```bash
mkdir shehab-portfolio-11ty
cd shehab-portfolio-11ty
npm init -y
npm install --save-dev @11ty/eleventy
```

#### Step 2: Create Directory Structure

```
shehab-portfolio-11ty/
├── .eleventy.js          # Config file
├── package.json
├── src/
│   ├── _data/
│   │   ├── site.js       # Site metadata
│   │   ├── projects.js   # Portfolio data
│   │   ├── skills.js
│   │   └── testimonials.js
│   ├── _includes/
│   │   ├── base.njk      # Main layout
│   │   ├── navbar.njk
│   │   ├── footer.njk
│   │   └── project-card.njk
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── index.njk         # Home page
│   ├── portfolio.njk     # Portfolio page
│   └── about.njk
├── _output/ (generated)
└── README.md
```

#### Step 3: Create `.eleventy.js` Config

```javascript
module.exports = function(eleventyConfig) {
  // Pass-through copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  
  // Add filters if needed
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });
  
  // Return config object
  return {
    dir: {
      input: "src",
      output: "_output",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
  };
};
```

#### Step 4: Create Data Files

**src/_data/site.js**:
```javascript
module.exports = {
  title: "Shehab Magdy El-Adl",
  description: "Senior QA Engineer & Software Developer",
  url: "https://shehabmagdy.com",
  email: "shehab.magdy.eladl@outlook.com",
  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shehabmagdy84/" },
    { name: "GitHub", url: "https://github.com/Shehab-Magdy" },
    { name: "HackerRank", url: "https://www.hackerrank.com/profile/cegres1" }
  ]
};
```

**src/_data/projects.js**:
```javascript
module.exports = [
  {
    id: "playwright-automation",
    title: "E2E Test Automation Framework",
    description: "Built comprehensive Playwright automation suite",
    stack: ["Playwright", "TypeScript", "Node.js"],
    role: "Lead Developer",
    result: "Reduced manual testing time by 50%",
    date: "2024",
    featured: true
  },
  {
    id: "gem-ticketing",
    title: "Ticketing System for GEM Museum",
    description: "QA leadership for high-scale ticketing platform",
    stack: ["React", "Node.js", "PostgreSQL"],
    role: "QA Lead",
    result: "Handled 10k+ concurrent users with zero downtime",
    date: "2023",
    featured: true
  }
  // ... more projects
];
```

**src/_data/skills.js**:
```javascript
module.exports = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap"]
  },
  {
    category: "Testing",
    skills: ["Selenium", "Playwright", "Jest", "TestNG", "PyTest"]
  },
  {
    category: "Languages",
    skills: ["Python", "Java", "C#", "JavaScript"]
  }
  // ... more categories
];
```

#### Step 5: Create Templates

**src/_includes/base.njk**:
```nunjucks
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} - {{ site.title }}</title>
  <meta name="description" content="{{ description or site.description }}">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  {% include "navbar.njk" %}
  
  <main>
    {{ content | safe }}
  </main>
  
  {% include "footer.njk" %}
  
  <script src="/assets/js/main.js" defer></script>
</body>
</html>
```

**src/_includes/project-card.njk**:
```nunjucks
<div class="project-card" data-category="{{ category }}">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text"><strong>Tech Stack:</strong> {{ stack | join(", ") }}</p>
      <p class="card-text"><strong>Role:</strong> {{ role }}</p>
      <p class="card-text"><strong>Result:</strong> {{ result }}</p>
      <a href="#" class="btn btn-primary">View Case Study</a>
    </div>
  </div>
</div>
```

#### Step 6: Create Home Page

**src/index.njk**:
```nunjucks
---
layout: base.njk
title: Home
---

<section id="about">
  <h1>{{ site.title }}</h1>
  <p>{{ site.description }}</p>
</section>

<section id="portfolio">
  <h2>Portfolio</h2>
  <div class="projects">
    {% for project in projects %}
      {% include "project-card.njk" %}
    {% endfor %}
  </div>
</section>
```

#### Step 7: Build and Deploy

```bash
# Development
npx eleventy --serve

# Production build
npx eleventy

# Deploy _output directory to hosting
```

---

## Benefits After Migration

✅ **Easy Updates**: Edit `src/_data/` JSON/JS files  
✅ **Automatic Optimization**: Image compression, minification  
✅ **Version Control**: All content in git  
✅ **Build Pipeline**: npm scripts for CI/CD  
✅ **Better SEO**: Structured data in templates  
✅ **Performance**: Static HTML generation  
✅ **Scalability**: Easy to add blog, new sections  

---

## Deployment Options

### Option 1: Netlify (Recommended)
```bash
# Connect GitHub repo
# Netlify auto-builds and deploys on push
# Free SSL, fast CDN, continuous deployment
```

### Option 2: GitHub Pages
```bash
# Configure package.json build script
# Push to gh-pages branch
# Free hosting at yourusername.github.io
```

### Option 3: Vercel
```bash
# Similar to Netlify
# Great performance
# Free tier available
```

---

## Content Strategy

After migration, maintain:
- Portfolio items in `_data/projects.js`
- Blog posts in `src/blog/` (markdown files)
- Skills in `_data/skills.js`
- Testimonials in `_data/testimonials.js`

New post example:

**src/blog/2024-my-first-post.md**:
```markdown
---
title: "My Experience with Playwright"
date: 2024-03-26
featured: true
---

Blog content in Markdown...
```

---

## Timeline

- **Week 1**: Setup Eleventy project structure
- **Week 2**: Convert existing HTML to templates
- **Week 3**: Migrate data to JSON/JS files
- **Week 4**: Setup CI/CD and deploy
- **Week 5**: Add blog functionality
- **Week 6**: Optimize performance

**Total effort**: ~40-50 hours spread over 6 weeks

---

## Resources

- **Eleventy Docs**: https://www.11ty.dev/
- **Nunjucks Templating**: https://mozilla.github.io/nunjucks/
- **Netlify Deployment**: https://www.netlify.com/
- **GitHub Pages**: https://pages.github.com/

---

**Next Step**: Start with this migration plan after current enhancements are stable!
