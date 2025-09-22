# Token Usage Examples

## 🎨 Semantic Token Categories

### Border Tokens
```css
.card {
  border: 1px solid var(--border-01);           /* Subtle border */
  border-bottom: 2px solid var(--border-03);    /* Stronger border */
}

.input:focus {
  border-color: var(--border-primary);          /* Brand border */
}

.input:disabled {
  border-color: var(--border-disabled);         /* Disabled state */
}
```

### Surface Tokens
```css
.page-background {
  background-color: var(--surface-00);          /* Page background */
}

.card {
  background-color: var(--surface-01);          /* Card background */
}

.section {
  background-color: var(--surface-03);          /* Section background */
}

.primary-button {
  background-color: var(--surface-primary-01);  /* Brand background */
}

.secondary-button {
  background-color: var(--surface-primary-02);  /* Secondary brand */
}
```

### Text Tokens
```css
.title {
  color: var(--text-title);                     /* Main titles */
}

.subtitle {
  color: var(--text-subtitle);                  /* Section subtitles */
}

.body-text {
  color: var(--text-body);                      /* Body text */
}

.caption {
  color: var(--text-caption);                   /* Small text */
}

.brand-text {
  color: var(--text-primary);                   /* Brand colored text */
}

.button-text {
  color: var(--text-invert);                    /* Text on dark backgrounds */
}

.disabled-text {
  color: var(--text-disabled);                  /* Disabled text */
}
```

### Action Tokens
```css
.button {
  background-color: var(--action-surface-default);
}

.button:hover {
  background-color: var(--action-surface-hover);
}

.button:active,
.button.selected {
  background-color: var(--action-surface-selected);
}
```

## 💡 Light Mode Only

The semantic tokens are currently configured for light mode only, providing:
- **Consistent experience** across all devices
- **Simplified maintenance** with single token values
- **Clean, professional appearance**

Dark mode support can be easily added in the future if needed.

## 🎯 Best Practices

### ✅ DO
```css
.my-component {
  color: var(--text-body);                      /* Use semantic tokens */
  background: var(--surface-01);
  border: 1px solid var(--border-01);
}
```

### ❌ DON'T
```css
.my-component {
  color: var(--concord-600);                    /* Don't use primitives directly */
  background: #f8f8f8;                         /* Don't use raw hex values */
}
```

This approach ensures your components maintain visual consistency and professional appearance across your application!
