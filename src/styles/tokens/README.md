# Design Tokens

This folder contains all design tokens for the Swift Money Transfer application organized in a scalable token system.

## 📁 Token Structure

```
tokens/
├── primitives.css      # Raw color values (primitives)
├── semantic.css        # Semantic color tokens with light/dark modes
├── usage-examples.md   # Detailed usage examples and best practices
├── index.css          # Central import for all tokens
└── README.md          # This file
```

## 🎨 Color System

### Primitive Colors
These are the foundational color values that shouldn't be used directly in components. Instead, use semantic tokens that reference these primitives.

#### Concord (Neutral/Gray Scale)
- `--concord-00` to `--concord-950` - Complete neutral color palette
- **Base**: `--concord-500-(base)` - Primary neutral tone

#### Fuchsia Blue (Brand Purple)  
- `--fuchsia-blue-50` to `--fuchsia-blue-950` - Brand purple palette
- **Base**: `--fuchsia-blue-500-(base)` - Primary brand color

#### Indigo (Secondary Blue)
- `--indigo-50` to `--indigo-950` - Secondary blue palette  
- **Base**: `--indigo-400-(base)` - Primary indigo tone

## 🎨 Semantic Tokens (NEW!)

### Border Tokens
- `--border-00`, `--border-01`, `--border-03` - Progressive border strengths
- `--border-disabled` - Disabled element borders  
- `--border-primary` - Brand colored borders

### Surface Tokens
- `--surface-00`, `--surface-01`, `--surface-03` - Background hierarchy
- `--surface-disabled` - Disabled element backgrounds
- `--surface-primary-01`, `--surface-primary-02` - Brand backgrounds

### Text Tokens  
- `--text-title`, `--text-subtitle`, `--text-body`, `--text-caption` - Text hierarchy
- `--text-primary` - Brand colored text
- `--text-invert` - Text on dark backgrounds
- `--text-disabled` - Disabled text

### Action Tokens
- `--action-surface-default`, `--action-surface-hover`, `--action-surface-selected` - Interactive states

## 💡 Light Mode Focus

🎯 **Simplified approach** - Light mode only for now
🎨 **Clean and consistent** - Single set of semantic tokens
🚀 **Future-ready** - Easy to add dark mode support later if needed

## 📝 Usage Guidelines

### ✅ Recommended Pattern
```css
.my-component {
  color: var(--text-body);                 /* Use semantic tokens */
  background: var(--surface-01);
  border: 1px solid var(--border-01);
}
```

### ❌ Avoid
```css
.my-component {
  color: var(--concord-600);              /* Don't use primitives directly */
  background: #f8f8f8;                    /* Don't use raw hex values */
}
```

## 🚀 How to Use

### Import in your CSS:
```css
@import '../styles/tokens/index.css';
```

### Using tokens:
```css
.my-component {
  background-color: var(--fuchsia-blue-500-(base));
  color: var(--concord-00);
}
```

## 🔄 Future Expansion

Plan for additional token files:
- `semantic.css` - Semantic color assignments
- `spacing.css` - Spacing and sizing tokens  
- `typography.css` - Typography tokens
- `components.css` - Component-specific tokens

This token system provides a scalable foundation for maintaining consistent design across your application!
