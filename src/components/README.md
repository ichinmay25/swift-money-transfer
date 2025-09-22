# Components Organization

This folder contains all reusable React components organized by their purpose:

## 📁 Folder Structure

```
components/
├── main/           # Landing page & general website components
├── app/            # Swift Money Transfer app-specific components
├── index.js        # Central export file for easy imports
└── README.md       # This file
```

## 🎯 Organization Guidelines

### `main/` - Landing Page & General Components
Use for components that are part of the **marketing website**:
- Landing page sections
- General navigation, headers, footers
- Marketing content
- Public-facing components

### `app/` - Application Components
Use for components that are part of the **Swift Money Transfer application**:
- Money transfer functionality
- User dashboards
- Transaction management
- Financial calculations
- Protected/authenticated features

## 📝 Best Practices

1. **Naming Convention**: Use PascalCase for component files
   - ✅ `TransferForm.js`
   - ❌ `transferForm.js`

2. **Component Structure**: Each component should have its own folder if it needs additional files
   ```
   TransferForm/
   ├── TransferForm.js
   ├── TransferForm.module.css
   └── index.js
   ```

3. **Exports**: Update `components/index.js` when adding new components for easier imports

4. **Props & Documentation**: Document component props and usage examples

## 🔄 Import Examples

```javascript
// Individual imports
import TransferForm from './components/app/TransferForm';
import Hero from './components/main/Hero';

// Using index.js (when components are exported there)
import { TransferForm, Hero } from './components';
```

This structure keeps your codebase organized and makes it easy to find components based on their purpose!
