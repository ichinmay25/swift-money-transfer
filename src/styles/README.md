# Styles Organization

This folder contains all CSS files organized by their purpose:

## 📁 Folder Structure

```
styles/
├── pages/              # Page-specific styles
│   ├── landing.css     # Landing page styles
│   └── prototype.css   # Prototype page styles
├── components/         # Component-specific styles
│   └── nav.css         # Navigation component styles
├── index.js           # Central export file (optional)
└── README.md          # This file
```

## 🎯 Organization Guidelines

### `pages/` - Page-Specific Styles
CSS files that are specific to individual pages:
- **landing.css** - Styles for the landing page layout, buttons, and responsive design
- **prototype.css** - Styles for the prototype page layout and content areas

### `components/` - Component-Specific Styles
CSS files for reusable components:
- **nav.css** - Navigation component styles including avatar, branding, and responsive design

### Global Styles
Global styles remain in the root `src/index.css`:
- CSS resets and base styles
- Typography system (headings, body text, labels)
- Button styles (shared across all pages)
- Global font application

## 📝 Best Practices

1. **Import styles directly in components:**
   ```javascript
   import '../styles/pages/landing.css';
   ```

2. **Use semantic class names:**
   - ✅ `.landing-container`, `.prototype-content`
   - ❌ `.red-text`, `.big-button`

3. **Keep page-specific styles in page files:**
   - Landing page layout → `landing.css`
   - Prototype page layout → `prototype.css`

4. **Keep component-specific styles in component files:**
   - Navigation styles → `nav.css`
   - Future: Button component → `button.css`

5. **Global vs. Specific:**
   - **Global:** Typography, resets, shared utilities → `index.css`
   - **Specific:** Page layouts, component styling → separate files

## 🔄 Import Examples

```javascript
// In a page component
import '../styles/pages/landing.css';

// In a component
import '../../styles/components/nav.css';

// Global styles (already imported in src/index.js)
// import './index.css';
```

This structure makes it easy to maintain and locate styles, improves code organization, and enables better CSS tree-shaking in the build process!
