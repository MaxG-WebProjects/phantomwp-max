# Project Instructions for Claude

This is an Astro site generated from WordPress content by PhantomWP.

## CSS Architecture: Scoped CSS

This project uses vanilla CSS with Astro component-scoped styles and design tokens.

### Key Principles
- Prefer component-local `<style>` blocks for component styles. Use global CSS only for tokens, base primitives, prose/CMS content, and genuinely shared styles.
- Theme tokens are CSS custom properties in `src/styles/theme.css` (`:root` block)
- Theme Studio reads and writes `src/styles/theme.css`; edit that file for normal token changes
- Use `src/styles/theme_child.css` only for explicit overrides that should live outside Theme Studio
- Use `var(--color-primary)`, `var(--color-surface)`, etc. for all color references
- Class names should be simple, human-readable, and component-scoped
- No Tailwind utilities - all styling is done through CSS
- `src/styles/base.css` provides the CSS reset and utility classes (.hidden, .container, etc.)
- `src/styles/prose.css` provides typography styles for blog/content pages

### Changing Styles
1. Edit the component's local `<style>` block, or its existing CSS file if the template generated one
2. Use standard CSS selectors scoped to that component
3. Use `var(--color-*)` tokens for colors
4. Prefer `clamp()` and auto-fit grids for responsive sizing; add media queries only when layout truly needs a separate rule

### Adding New Components
1. Create the `.astro` file in `src/components/`
2. Add a `<style>` block in that component
3. Use theme variables with `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`, and `var(--font-*)`

### File Structure
- `src/styles/theme.css` - Design tokens (:root CSS custom properties)
- `src/styles/theme_child.css` - Optional escape-hatch overrides not managed by Theme Studio
- `src/styles/global.css` - Import hub for theme, base, and prose CSS
- `src/styles/base.css` - CSS reset and utility classes
- `src/styles/prose.css` - Typography/prose styles
- Component styles live in each component's local `<style>` block

### Important
- Do NOT add Tailwind. This project uses vanilla scoped CSS.
- Always use CSS custom properties for colors and spacing tokens.
- Keep responsive CSS simple. Reach for a local media query only when fluid sizing cannot express the layout.

## Discovering WordPress Data

A local PhantomWP MCP server at `.phantomwp/mcp/server.mjs` (registered in `.mcp.json` as `phantomwp`) provides `get_wordpress_schema`, `fetch_wp_sample`, and `browse_content` to MCP clients such as Claude Code. Prefer those tools over hand-written WordPress REST exploration. If the server is not registered in your client, run: `claude mcp add phantomwp -- node .phantomwp/mcp/server.mjs`.
