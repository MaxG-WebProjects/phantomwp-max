# Spec : Architecture du projet phantomwp-max

*Statut : en revue — Phase 1 (Specify) de spec-driven-development*
*Créée : 2026-09-13*

## Objectif

Poser une architecture frontend solide et durable pour ce site vitrine Astro généré depuis WordPress via PhantomWP, avant toute production de webdesign concret. Le site est un one-pager/site vitrine pro (freelance web & marketing digital) avec 2 pages réelles à ce jour (`accueil`, `a-propos`).

**Succès** = un futur contributeur (humain ou agent IA) peut ajouter une page, un composant ou un îlot interactif sans deviner les conventions, sans casser l'intégration WordPress/PhantomWP existante, et en respectant l'accessibilité par défaut.

## Tech Stack

- **Framework** : Astro 6 (sortie statique / SSG, pas d'adapter SSR pour l'instant)
- **UI interactive** : React 19 via `@astrojs/react`, en îlots ciblés uniquement
- **Animation** : `motion` (Framer Motion v12), déjà en dépendance
- **Icônes** : `@lucide/astro`
- **Contenu** : WordPress headless (`headless.maxgremez.com`) via PhantomWP Connect (REST API + secret `X-PhantomWP-Secret`)
- **CSS** : vanilla scoped, tokens CSS custom properties (`src/styles/theme.css`) — **Tailwind interdit**
- **Typage** : TypeScript strict, `@astrojs/check` pour le typecheck
- **Formatage** : Prettier + `prettier-plugin-astro`

## Commands

```bash
# Développement
npm run dev              # astro dev --host

# Build (inclut la synchro média WordPress)
npm run build            # node scripts/sync-media.mjs && astro build

# Prévisualisation du build
npm run preview          # astro preview

# Vérification de types (à lancer avant tout commit)
npx astro check

# Formatage
npx prettier --write .
```

Pas de script `lint` ni `test` pour l'instant (voir Boundaries et Roadmap).

## Project Structure

```
src/
  components/
    *.astro              → Composants Astro statiques (Header, Footer, Section, BrandLogo...)
    menus/*.astro         → GÉNÉRÉ par l'IDE (Menu Builder) — ne pas modifier à la main
    react/*.tsx           → Îlots React interactifs UNIQUEMENT (nouveau dossier dédié)
  layouts/
    BaseLayout.astro      → GÉNÉRÉ — ne pas modifier
  lib/
    functions.ts          → Utilitaires custom (point d'extension officiel, jamais écrasé par PhantomWP)
    navigation.ts          → GÉNÉRÉ — ne pas modifier
    wordpress-config.ts   → GÉNÉRÉ — ne pas modifier (config connexion WP, sans secret)
    wordpress.ts           → GÉNÉRÉ — shim de ré-export, ne pas modifier
  styles/
    theme.css             → Tokens de design (géré par Theme Studio dans l'IDE)
    theme_child.css       → Overrides manuels explicites, hors Theme Studio
    base.css / prose.css / global.css → Reset, utilitaires, typographie CMS
  pages/
    *.astro               → Une route par fichier (ex. index.astro → accueil)
  config/
    menus.json             → GÉNÉRÉ par le Menu Builder
.phantomwp/
  runtime/                → GÉNÉRÉ, committé (nécessaire au build de prod) — ne jamais modifier
  ide/                    → Ignoré par git (outillage dev/codespace)
specs/
  architecture.md          → Ce document
docs/
  ai-instructions.md       → Préférences IA (convention PhantomWP, distincte de specs/)
```

## Code Style

**Composants Astro** (`.astro`) :
```astro
---
import type { SomeType } from '@/lib/functions';

interface Props {
    title: string;
    variant?: 'default' | 'compact';
}

const { title, variant = 'default' } = Astro.props;
---

<section class={`card card--${variant}`}>
    <h2>{title}</h2>
    <slot />
</section>

<style>
    .card {
        padding: var(--space-lg);
        border-radius: var(--radius-lg);
        background: var(--color-surface);
    }
</style>
```

**Îlots React** (`.tsx`, dans `src/components/react/`) :
```tsx
interface ContactFormProps {
    submitLabel?: string;
}

export default function ContactForm({ submitLabel = 'Envoyer' }: ContactFormProps) {
    // état local uniquement — pas de state management global
    // styles : classes ciblant les tokens CSS globaux, pas de CSS-in-JS
    return (
        <form className="contact-form">
            <button type="submit">{submitLabel}</button>
        </form>
    );
}
```

**Conventions communes** :
- `PascalCase` pour les composants (`.astro` et `.tsx`), `camelCase` pour fonctions/variables
- Toujours typer les `Props`/interfaces explicitement (pas de `any`)
- Un îlot React est hydraté avec la directive la plus restrictive possible (`client:visible` par défaut, `client:load` seulement si l'interaction doit être immédiate)
- Toute valeur de couleur/espacement/rayon passe par `var(--*)` de `theme.css` — jamais de valeur en dur
- Éléments cliquables : `cursor: pointer` explicite (règle déjà en vigueur)
- Attributs a11y natifs (`aria-*`, `role`, labels) obligatoires sur tout élément interactif, y compris dans les îlots React

## Testing Strategy

**Maintenant** : `npx astro check` (typecheck) avant chaque commit + vérification manuelle en navigateur (golden path + responsive + dark/light si applicable).

**Plus tard (roadmap, pas dans le périmètre immédiat)** : introduction de Vitest pour tester `src/lib/functions.ts` et la logique des îlots React, quand leur nombre/complexité le justifiera. Pas de Playwright/e2e prévu tant que le site reste un site vitrine simple.

## Accessibilité (transverse, non négociable)

- Cible : **WCAG 2.1 niveau AA** + conformité **RGAA** (sans certification formelle requise)
- Navigation clavier complète sur tout élément interactif (Astro et React)
- Contraste des couleurs vérifié à chaque évolution de `theme.css`
- `aria-label`/`aria-current`/etc. sur les menus et éléments de navigation
- Respect de `prefers-reduced-motion` pour toute animation `motion`/CSS

## Règles d'usage : Astro vs îlot React

| Cas | Choix |
|---|---|
| Contenu statique, mise en page, sections | Composant Astro (`.astro`) |
| Interaction nécessitant du state client (formulaire, accordéon animé, filtre) | Îlot React (`.tsx` dans `src/components/react/`) |
| Animation simple d'apparition au scroll | CSS (`@media (prefers-reduced-motion)` + transitions) ou Astro + `motion` en script si besoin de séquencement complexe |
| Menu de navigation | Généré par l'IDE (`src/components/menus/`) — ne pas remplacer par du React |

Par défaut, privilégier Astro. Un îlot React doit se justifier par un besoin réel d'interactivité côté client — pas par préférence stylistique.

## Intégration du contenu WordPress réel

- Page **Accueil** (`slug: accueil`) → `src/pages/index.astro`, contenu réel déjà rédigé (positionnement freelance web/marketing)
- Page **A propos** (`slug: a-propos`) → nouvelle route `src/pages/a-propos.astro` à créer, contenu WP à récupérer via `fetch_wp_sample` le moment venu
- Post `hello-world` : contenu de démo WordPress, à ignorer (pas de section blog prévue pour l'instant sauf demande contraire)
- Pas de champs ACF/SCF personnalisés actuellement → pas de typage de champs custom nécessaire dans `functions.ts` pour l'instant
- Récupération du contenu au build via le client PhantomWP (`@phantomwp/wordpress`), jamais d'appel direct à l'API WP depuis les composants

## Boundaries

**Toujours faire :**
- Lancer `npx astro check` avant tout commit
- Utiliser les tokens `var(--*)` de `theme.css`, jamais de valeur CSS en dur
- Respecter les conventions de nommage (PascalCase composants, camelCase fonctions)
- Ajouter les attributs a11y sur tout nouvel élément interactif
- Vérifier le rendu réel en navigateur pour tout changement de layout/design

**Demander d'abord :**
- Ajouter une dépendance (React, animation, utilitaire...)
- Ajouter un adapter de déploiement (Vercel/Cloudflare) — décision non tranchée à ce jour
- Introduire ESLint ou Vitest (prévu en roadmap, mais à activer explicitement)
- Modifier `theme.css` de façon structurelle (hors ajustement de valeur de token)
- Toute action touchant le contenu WordPress en écriture (le MCP a `writesEnabled: false` actuellement)

**Ne jamais faire :**
- Modifier les fichiers générés : `.phantomwp/runtime/**`, `src/lib/wordpress-config.ts`, `src/lib/wordpress.ts`, `src/lib/navigation.ts`, `src/components/menus/*.astro`, `src/layouts/BaseLayout.astro`
- Ajouter Tailwind, shadcn/ui, ou toute dépendance CSS-in-JS/utility-first
- Committer `.env` ou tout secret
- Supprimer des vérifications (typecheck, a11y) sans validation explicite

## Success Criteria

- [ ] Cette spec est validée par l'utilisateur
- [ ] Un nouveau composant Astro et un nouvel îlot React de test peuvent être créés en suivant ces conventions sans ambiguïté
- [ ] `npx astro check` passe sans erreur sur le projet actuel
- [ ] La page `a-propos` peut être créée en suivant la règle d'intégration WordPress décrite ci-dessus

## Open Questions

1. Cible de déploiement définitive (statique générique / Vercel / Cloudflare Workers) — à trancher avant la mise en production
2. Faut-il une section blog exploitant le post type `post`, ou le site reste-t-il un one-pager + à-propos ?
3. Palette de couleurs et typographie définitives — traité en phase design (hors spec d'architecture), avec Hallmark et les sources externes citées (threeui.com, interfere.com, designmd.app, bagui.pro, getdesign.md)
