---
name: astro-wordpress
description: Expert guide for building Astro static sites powered by WordPress using vanilla scoped CSS. Use when editing Astro components, pages, layouts, WordPress integration, CSS styling, fonts, icons, SEO, or navigation.
---

# Astro WordPress Development

## Rules

- Astro uses `class=` (not `className=`), frontmatter between `---` markers, no React hooks
- API endpoints: Use `.ts` files (e.g., `src/pages/api/submit.ts`) with `export const prerender = false;` at the top
- WordPress content: `set:html={post.content.rendered}`
- Images: import local images; remote images need explicit width/height
- This project uses vanilla scoped CSS, not Tailwind. Add component-local `<style>` blocks and theme tokens from `src/styles/theme.css`
- Clickable elements must use `cursor: pointer`
- Flag security issues; make minimal diffs
- Frontmatter uses TypeScript - always define proper types/interfaces

## Styling

- Use CSS custom properties such as `var(--color-primary)`, `var(--space-md)`, `var(--radius-lg)`, and `var(--shadow-md)`
- Prefer scoped Astro styles inside the component being edited
- Keep global CSS limited to `src/styles/theme.css`, `src/styles/theme_child.css`, `src/styles/base.css`, `src/styles/prose.css`, and `src/styles/global.css`
- Do not add Tailwind dependencies, Tailwind config, `@import "tailwindcss"`, or Tailwind utility classes
- Prefer fluid CSS with `clamp()` and auto-fit grids before adding breakpoints

## Generated Files (DO NOT MODIFY)

These files are auto-generated and may be overwritten. Avoid editing them directly unless the user explicitly asks:
- `.phantomwp/runtime/**` - Managed PhantomWP framework code
- `src/lib/wordpress-config.ts` - WordPress connection config
- `src/lib/wordpress.ts` - Compatibility shim
- `src/lib/navigation.ts` - Navigation utilities
- `src/components/menus/*.astro` - Menu components
- `src/layouts/BaseLayout.astro` - Base HTML shell

## Extension Points

- Add custom data-fetching helpers in `src/lib/functions.ts`
- Create new `.astro` components in `src/components/`
- Use `src/styles/theme_child.css` only for explicit overrides that should live outside Theme Studio

For styling examples, read `.claude/skills/astro-wordpress/tailwind.md`; in CSS projects this file is intentionally replaced with the CSS styling guide.
