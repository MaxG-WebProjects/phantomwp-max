# Mémoire de projet — phantomwp-max
*Dernière mise à jour : 2026-09-13*

## Vision produit
- Site vitrine (pas une app) avec plusieurs pages (plus de 2) + un espace blog avec articles
- Design system organisé en atomic design : atomes → molécules → organismes, tous consommant les mêmes tokens (`theme.css`) et les organismes réutilisant les mêmes composants (pas de duplication page par page)

## Contexte général
- Objectif : site Astro généré à partir de contenu WordPress via PhantomWP
- Stack / outils : Astro, CSS scoped vanilla (pas de Tailwind), design tokens dans `src/styles/theme.css`, MCP server PhantomWP (`.phantomwp/mcp/server.mjs`)
- Contraintes notables : ne jamais utiliser Tailwind ; toujours utiliser les tokens CSS (`var(--color-*)`, etc.) ; suivre les conventions décrites dans `CLAUDE.md`
- Système complet organisé via l'IDE PhantomWP dans le navigateur (Codespaces/Docker/Fly.io), lié à ce dépôt GitHub. Doc officielle : https://phantomwp.com/docs/getting-started/introduction

## Décisions & conventions
- [2026-09-12] Mise en place de ce fichier `.claude/memory.md` comme historique des actions du projet, mis à jour sur demande explicite via le mot-clé "mem"
- [2026-09-12] `.claude/memory.md` versionné dans git (pas dans `.gitignore`) : choix explicite pour partager l'historique via GitHub, plutôt que de le garder local
- [2026-09-13] Confirmé : structure de composants réorganisée en `src/components/atoms/`, `molecules/`, `organisms`
- [2026-10-03] **Workflow PhantomWP + Local validé** :
  - **PhantomWP (IDE navigateur)** : gère le contenu WordPress via MCP `mcp__phantomwp__*`, commit automatique → GitHub
  - **Local (Claude Code)** : récupère les changements de GitHub, développe le webdesign (CSS vanilla, composants visuels, layout)
  - **Composants Astro** : structure agnostique (acceptent `post: WordPressPost`, fonctionnent avec placeholders en local)
  - **Séparation claire** : contenu = PhantomWP, design = local
  - `.env.local` gitignored (contient token MCP, jamais commité)

## État actuel
- En cours : structure blog implémentée avec types TypeScript + 3 composants (atoms/molecules/pages) + 2 pages blog (`/blog/index.astro`, `/blog/[slug].astro`)
- Composants créés :
  - `src/types/wordpress.ts` — types pour posts, pages, media, authors, terms
  - `src/components/atoms/PostMeta.astro` — affiche auteur, date, catégorie
  - `src/components/molecules/BlogPostCard.astro` — carte post avec image vedette
  - `src/pages/blog/index.astro` — liste posts (placeholders en local)
  - `src/pages/blog/[slug].astro` — détail post (placeholder)
- Design : CSS vanilla scoped, tokens `var(--color-*)`, responsive mobile-first, dark mode ready
- Workflow validé : PhantomWP (MCP) + local (placeholders) — voir Décisions
- Composants existants (Header, Footer, Section, BrandLogo, MainMenu) — pas encore migrés en atoms/molecules/organisms (à faire avec vraies données)
- Prochaine étape : créer pages site vitrine (accueil, services, à propos, contact) avec structure atomique

## Intégration WordPress/MCP

### Structure WordPress disponible
**Post types** : posts (Articles), pages, media (fichiers)
**Taxonomies** : categories, post_tag (étiquettes)
**Schéma complet** : voir résultat `get_wordpress_schema()` (source "live", 2026-10-03)

### Outils MCP disponibles en PhantomWP
- `mcp__phantomwp__get_wordpress_schema()` — structure complète du site WP
- `mcp__phantomwp__browse_content(restBase, perPage, page, search)` — liste posts/pages/media
- `mcp__phantomwp__fetch_wp_sample(restBase, id?)` — détail d'un post avec tous ses champs
- Autres : `wp_create_posts`, `wp_register_post_type`, `wp_register_field_group`, etc. (écriture, actuellement `writesEnabled: false`)

### Comment utiliser en PhantomWP
Le MCP n'est accessible que via Claude Code/IDE PhantomWP (connecté via `.env.local` token).
En local, c'est impossible (API MCP HTTP), donc on utilise des placeholders.

### Types TypeScript disponibles
- `WordPressPost` — structure complète d'un article
- `WordPressAuthor` — auteur avec avatar
- `WordPressMedia` — média/image avec source_url
- `WordPressTerm` — catégorie/tag
- `WordPressPage` — page (avec parent optionnel)

Tous les types incluent `_embedded` (données embeddées : auteur, media, termes).

## Pièges & leçons apprises
- [2026-09-12] `AGENTS.md` mentionnait Tailwind V4 alors que `CLAUDE.md` impose du CSS vanilla scopé — contradiction entre les instructions destinées à Codex (`AGENTS.md`) et à Claude Code (`CLAUDE.md`). Corrigé dans `AGENTS.md` (commit `d840873`) pour aligner sur CSS vanilla.
- [2026-09-12] Vérification des skills projet (`.claude/skills/astro-wordpress/`) : `SKILL.md` et `tailwind.md` étaient déjà cohérents (CSS vanilla). Résidu trouvé dans `fonts.md` — section "Using Fonts in Tailwind" avec syntaxe `@theme` et classes utilitaires Tailwind. Corrigé (commit `367c521`) pour utiliser `var(--font-*)` en CSS vanilla à la place.
- [2026-09-13] Le MCP `phantomwp` (`get_wordpress_schema`, `browse_content`, etc.) échoue en local car il cherche `src/lib/wordpress-config.ts` — ce fichier n'existe pas dans ce dépôt. D'après la doc officielle, la connexion WP vit dans un `.env` (`WP_API_URL`, `WP_ACCESS_SECRET`) généré côté IDE + une BDD interne PhantomWP, jamais versionnés dans Git. Le MCP ne fonctionne donc que depuis l'environnement PhantomWP (IDE navigateur/Codespaces/Docker), pas depuis un simple clone local.
- [2026-09-13] Theme Studio (doc officielle) génère par défaut `theme.css` au format Tailwind v4 (`@theme`, classes `bg-primary`...). Ce projet utilise le mode alternatif "CSS vanilla" de PhantomWP (tokens `:root { --color-* }` classiques) — ce n'est pas une anomalie, juste un mode différent du même outil.

## Prochaines étapes pour la prochaine session
1. **Vérifier le design blog** — ouvrir `/blog/index.astro` et `/blog/[slug].astro` en dev local, tester responsive et dark mode
2. **Créer les pages du site vitrine** (structure atomique) : accueil, services, à propos, contact
3. **Migrer l'existant** : Header/Footer/Section/BrandLogo/MainMenu → atomic design (atoms/molecules/organisms)
4. **Valider dark mode** : vérifier les tokens CSS `var(--color-*-dark)` existent, tester tous les composants en dark
5. **Test PhantomWP** : une fois en PhantomWP, connecter vraies données via MCP (remplacer placeholders)

**Rappel** : ne jamais modifier du code sans validation explicite au préalable (règle CLAUDE.md global)

## Notes diverses
- Ce fichier est mis à jour uniquement quand l'utilisateur écrit "mem" dans la conversation
