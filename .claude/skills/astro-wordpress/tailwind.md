# CSS Styling Guide

## Theme Tokens (theme.css)

Design tokens are defined as CSS custom properties in `:root`:

```css
:root {
    --color-primary: #3b82f6;
    --color-surface: #ffffff;
    --color-content: #1f2937;
    /* ... etc */
}
```

## Using Tokens in CSS

```css
.my-component {
    background-color: var(--color-surface);
    color: var(--color-content);
    border: 1px solid var(--color-outline);
}

.my-component:hover {
    border-color: var(--color-primary);
}
```

## Semi-transparent Colors

Use color-mix for opacity:
```css
.overlay {
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}
```

## Component Styles

Prefer scoped Astro styles for new components:
```astro
<section class="hero">
  <h1>Title</h1>
</section>

<style>
  .hero {
    background: var(--color-surface);
    color: var(--color-content);
  }
</style>
```

## Responsive Sizing

```css
.title {
    font-size: clamp(var(--text-3xl), 5vw, var(--text-4xl));
}

.grid {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
```

Prefer `clamp()` and auto-fit grids before adding breakpoint rules. If a breakpoint is necessary, keep it local to the component.

## Customizing Theme

Edit `src/styles/theme.css` when changing the project's Theme Studio tokens:
```css
:root {
    --color-primary: #e11d48;
}
```

Use `src/styles/theme_child.css` only when the user explicitly wants a local override that does not need to appear in Theme Studio.
