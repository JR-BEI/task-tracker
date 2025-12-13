# Design Tokens

This file defines the design system tokens used throughout the Task Tracker application.

## Color Palette

### Primary Colors
```css
--primary-blue: #007bff
--primary-blue-hover: #0056b3
--primary-blue-dark: #004085
```

### Text Colors
```css
--text-primary: #213547
--text-secondary: #666
--text-muted: #999
--text-heading: #333
--text-link: #646cff
--text-link-hover: #535bf2
```

### UI Colors
```css
--background-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
--card-background: #ffffff
--border-color: #e0e0e0
--hover-border: #a0aec0
--focus-ring: -webkit-focus-ring-color
```

### Status Button Colors
```css
--btn-bg: #f7fafc
--btn-bg-hover: #edf2f7
--btn-border: #cbd5e0
--btn-text: #4a5568
--btn-text-hover: #2d3748
--btn-active-bg: #007bff
--btn-active-text: #ffffff
```

### Status-Specific Colors
```css
--status-todo: #ffc107  /* Yellow badge */
--status-doing: #17a2b8  /* Blue badge */
--status-done: #28a745   /* Green badge */
```

## Spacing Scale

```css
--spacing-xs: 0.375rem   /* 6px - minimal spacing */
--spacing-sm: 0.5rem     /* 8px - small gaps */
--spacing-md: 0.75rem    /* 12px - default gaps */
--spacing-lg: 1rem       /* 16px - card padding */
--spacing-xl: 2rem       /* 32px - page padding */
```

## Typography

### Font Families
```css
--font-family-base: system-ui, Avenir, Helvetica, Arial, sans-serif
```

### Font Sizes
```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px - small text, descriptions */
--font-size-base: 1rem     /* 16px - body text */
--font-size-lg: 1.25rem    /* 20px */
--font-size-xl: 1.5rem     /* 24px */
--font-size-2xl: 2rem      /* 32px */
--font-size-3xl: 3.2em     /* h1 headings */
```

### Font Weights
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
```

### Line Heights
```css
--line-height-tight: 1.1
--line-height-normal: 1.4
--line-height-relaxed: 1.5
```

## Border Radius

```css
--radius-sm: 4px   /* buttons, small elements */
--radius-md: 8px   /* cards, inputs */
--radius-lg: 12px  /* modals */
--radius-full: 9999px  /* pills, badges */
```

## Shadows

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08)
--shadow-md: 0 8px 16px rgba(0, 0, 0, 0.15)
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.3)
--shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.15)  /* card hover */
```

## Transitions

```css
--transition-fast: 0.15s ease
--transition-base: 0.2s ease
--transition-slow: 0.25s ease
--transition-all: all 0.2s ease
```

## Z-Index Scale

```css
--z-base: 0
--z-dropdown: 100
--z-modal: 1000
--z-toast: 2000
--z-tooltip: 3000
```

## Breakpoints

```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

## Usage Examples

### Applying Colors
```css
.my-component {
  color: var(--text-primary);
  background: var(--card-background);
  border: 1px solid var(--border-color);
}
```

### Applying Spacing
```css
.my-component {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-sm);
}
```

### Applying Shadows
```css
.my-card {
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
}

.my-card:hover {
  box-shadow: var(--shadow-hover);
}
```
