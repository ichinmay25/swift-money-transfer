# Satoshi Font Setup

## How to Add Your Satoshi Font Files

1. **Add your Satoshi font files** to this folder (`src/assets/fonts/`)
   - Recommended formats: `.woff2` and `.woff` for best browser support
   - Expected file names: `Satoshi-Regular.woff2`, `Satoshi-Bold.woff2`, etc.

2. **Update the fonts.css file** in this folder:
   - Uncomment the `@font-face` declarations
   - Verify the file names match your actual Satoshi font files
   - Add more `@font-face` declarations for other Satoshi weights if you have them

3. **That's it!** Satoshi will automatically apply to all text in the project.

## Expected Satoshi Font Files Structure
```
fonts/
├── Satoshi-Regular.woff2
├── Satoshi-Medium.woff2
├── Satoshi-Bold.woff2
├── Satoshi-Black.woff2
├── fonts.css
└── README.md
```

## Configured Font Weights
- 400 (Regular)
- 500 (Medium)
- 700 (Bold)  
- 900 (Black)

## Font Fallback Chain
If Satoshi doesn't load, the text will fallback to:
- Inter (similar modern geometric sans-serif)
- System fonts (Apple, Windows, etc.)
- Helvetica Neue
- Arial
- Generic sans-serif

This ensures your text always displays beautifully, even while Satoshi is loading.
