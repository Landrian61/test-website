# Techara Website - Professional Company Website

A modern, responsive website for Techara, a technology company focused on empowering the next generation of tech leaders.

## 🎨 Design Philosophy

This website follows a **professional, clean, and minimal design approach** with:

- **Subtle animations** that enhance user experience without being distracting
- **Professional color palette** using earth tones for a sophisticated appearance  
- **Responsive design** that works seamlessly across all devices
- **Accessibility-first** approach with proper semantic HTML and ARIA labels
- **Simple yet elegant** interactions and hover effects

## 🎨 Color Palette

The website uses a carefully selected earth-tone color palette:

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary (Darkest)** | `#2f3e46` | Primary text, headers, main elements |
| **Secondary** | `#354f52` | Secondary text, subtle elements |
| **Accent** | `#52796f` | Accent elements, links, highlights |
| **Light Accent** | `#84a98c` | Light highlights, hover states |
| **Background (Lightest)** | `#cad2c5` | Page background, light sections |

## 📁 Project Structure

```
HTML-CSS Assignment/
│
├── public/                     # Static assets (images, icons, etc.)
│   ├── Blue Minimal Lion Technology Free Logo.png
│   ├── IG LOGO.jpg
│   ├── Naomiceo.jpg
│   ├── tiktok logo.png
│   ├── whatsapp.png
│   └── [other image files...]
│
├── scripts/                    # JavaScript files
│   └── main.js                # Main JavaScript functionality
│
├── styles/                     # CSS stylesheets
│   └── main.css               # Main stylesheet with all styles
│
├── html/                       # HTML pages
│   ├── index.html             # Homepage
│   ├── about.html             # About us page (to be created)
│   ├── products.html          # Products page (to be created)
│   └── contact.html           # Contact page (to be created)
│
└── README.md                   # This documentation file
```

## ✨ Features

### Design Features
- **Professional Earth-Tone Color Scheme** - Sophisticated and calming
- **Minimal Border Radius** - Subtle rounded corners (4px-8px)
- **Clean Typography** - Inter and Space Grotesk fonts for excellent readability
- **Subtle Shadows** - Professional depth without excessive effects
- **Responsive Grid Layouts** - CSS Grid and Flexbox for modern layouts

### Interactive Features
- **Smooth Scrolling Navigation** - Seamless page navigation
- **Subtle Hover Effects** - Professional card lifts and color transitions
- **Form Validation** - Real-time validation with user-friendly feedback
- **Accessibility Support** - Keyboard navigation and screen reader support
- **Loading States** - Visual feedback during form submissions

### Technical Features
- **Mobile-First Responsive Design** - Optimized for all screen sizes
- **Performance Optimized** - Efficient animations and lazy loading
- **SEO Friendly** - Proper meta tags and semantic HTML structure
- **Cross-Browser Compatible** - Works across modern browsers
- **Accessibility Compliant** - WCAG 2.1 guidelines followed

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript for modifications

### Setup Instructions

1. **Clone or Download** the project files to your local machine

2. **File Structure** - Ensure the following directory structure is maintained:
   ```
   - /html/ contains all HTML files
   - /styles/ contains CSS files  
   - /scripts/ contains JavaScript files
   - /public/ contains images and static assets
   ```

3. **Open the Website** - Navigate to the `/html/` folder and open `index.html` in your web browser

4. **Development Server** (Optional) - For local development, you can use:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve .
   
   # Using PHP (if installed)  
   php -S localhost:8000
   ```

## 📱 Responsive Breakpoints

The website is designed with the following responsive breakpoints:

- **Desktop**: `> 1200px` - Full layout with all features visible
- **Tablet**: `768px - 1200px` - Adjusted layouts for medium screens  
- **Mobile Large**: `481px - 768px` - Mobile-optimized layouts
- **Mobile**: `≤ 480px` - Compact mobile experience

## 🎯 Browser Support

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅  
- **Safari** 14+ ✅
- **Edge** 90+ ✅
- **Opera** 76+ ✅

## 📄 Pages Overview

### 1. Homepage (`index.html`)
- **Hero Section** - Welcome message with company introduction
- **Vision Statement** - Company's mission and goals
- **CEO Profile** - Detailed information about the founder
- **Journey Section** - Company's story and achievements  
- **Team Preview** - Showcase of key team members

### 2. About Us (`about.html`) - *To be created*
- Detailed company information
- Full team profiles
- Company history and milestones
- Mission, Vision, and Values

### 3. Products (`products.html`) - *To be created*  
- Service offerings
- Product showcase
- Client testimonials
- Case studies

### 4. Contact (`contact.html`) - *To be created*
- Contact form with validation
- Company location and contact details
- Office hours and availability
- Social media links

## 🎨 Customization Guide

### Changing Colors
Edit the CSS custom properties in `/styles/main.css`:

```css
:root {
  --primary-color: #2f3e46;        /* Change primary color */
  --secondary-color: #354f52;      /* Change secondary color */
  --accent-color: #52796f;         /* Change accent color */
  --light-accent: #84a98c;         /* Change light accent */
  --background-color: #cad2c5;     /* Change background */
}
```

### Modifying Typography
Update font imports and variables:

```css
@import url('your-google-fonts-url');

:root {
  --font-primary: 'Your Primary Font', sans-serif;
  --font-heading: 'Your Heading Font', sans-serif;
}
```

### Adjusting Spacing
Modify the spacing system:

```css
:root {
  --spacing-xs: 0.5rem;    /* Adjust small spacing */
  --spacing-sm: 1rem;      /* Adjust medium spacing */
  --spacing-md: 1.5rem;    /* Adjust large spacing */
  /* ... continue for other spacing values */
}
```

## 🔧 Development Notes

### CSS Architecture
- **CSS Custom Properties** for consistent theming
- **Mobile-First** responsive design approach
- **BEM-like** naming conventions for clarity
- **Semantic HTML5** elements for better structure
- **Flexbox and Grid** for modern layouts

### JavaScript Architecture  
- **Vanilla JavaScript** - No external dependencies
- **Event-driven** programming model
- **Performance optimized** with throttling and debouncing
- **Accessibility focused** with keyboard navigation support
- **Error handling** for robust user experience

### Performance Considerations
- **Minimal animations** to reduce CPU usage
- **Efficient selectors** for faster CSS rendering
- **Optimized images** for faster loading
- **Lazy loading** for better initial page load
- **Compressed assets** when possible

## 🧪 Testing Checklist

Before deploying, ensure:

- [ ] All pages load correctly
- [ ] Navigation works on all pages  
- [ ] Forms validate properly
- [ ] Images display correctly
- [ ] Responsive design works on mobile/tablet
- [ ] Accessibility features function properly
- [ ] Cross-browser compatibility verified
- [ ] Performance is acceptable on slower connections

## 🎓 Learning Resources

This project demonstrates:

### HTML Concepts
- Semantic HTML5 elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- Proper heading hierarchy (h1-h6)
- Form elements and validation
- Accessibility attributes (ARIA labels, roles)
- Meta tags for SEO

### CSS Concepts  
- CSS Custom Properties (CSS Variables)
- Flexbox and CSS Grid layouts
- Responsive design with media queries
- CSS animations and transitions
- Modern CSS features (backdrop-filter, clamp())

### JavaScript Concepts
- DOM manipulation and event handling
- Form validation and user feedback
- Intersection Observer API for scroll animations  
- Performance optimization techniques
- Error handling and debugging

## 📞 Support

For questions or issues with this project:

1. **Documentation** - Check this README file first
2. **Code Comments** - Review the detailed comments in the code files  
3. **Browser DevTools** - Use developer tools to debug issues
4. **Online Resources** - Refer to MDN Web Docs for HTML/CSS/JS reference

## 📝 License

This project is created for educational purposes. Feel free to use and modify for learning and non-commercial projects.

---

**Built with ❤️ for learning and professional development**

*Last updated: January 2025*