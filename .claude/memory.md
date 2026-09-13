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
- [2026-09-13] Confirmé : structure de composants réorganisée en `src/components/atoms/`, `molecules/`, `organisms/` (proposée, pas encore appliquée — en attente de validation sur la migration de l'existant Header/Footer/Section et sur la source de contenu du blog : WordPress via MCP PhantomWP vs content collections Astro locales)

## État actuel
- En cours : toujours au stade scaffold — `theme.css` avec tokens par défaut (violet #6366f1), `index.astro` avec contenu placeholder ("Welcome"), `docs/ai-instructions.md` non renseigné. Composants existants plats dans `src/components/` (BrandLogo, Footer, Header, Section, menus/MainMenu) — pas encore réorganisés en atoms/molecules/organisms
- Bloqué sur : (1) pas d'accès au schéma WordPress réel en local (voir Pièges) ; (2) en attente de validation utilisateur sur la migration des composants existants vers la structure atomique et sur la source de contenu du blog (WP vs content collections locales)
- Prochaine étape : une fois validé — créer les dossiers `atoms/molecules/organisms`, migrer/réécrire les composants existants dedans, puis scaffolder les pages du site vitrine et la section blog

## Pièges & leçons apprises
- [2026-09-12] `AGENTS.md` mentionnait Tailwind V4 alors que `CLAUDE.md` impose du CSS vanilla scopé — contradiction entre les instructions destinées à Codex (`AGENTS.md`) et à Claude Code (`CLAUDE.md`). Corrigé dans `AGENTS.md` (commit `d840873`) pour aligner sur CSS vanilla.
- [2026-09-12] Vérification des skills projet (`.claude/skills/astro-wordpress/`) : `SKILL.md` et `tailwind.md` étaient déjà cohérents (CSS vanilla). Résidu trouvé dans `fonts.md` — section "Using Fonts in Tailwind" avec syntaxe `@theme` et classes utilitaires Tailwind. Corrigé (commit `367c521`) pour utiliser `var(--font-*)` en CSS vanilla à la place.
- [2026-09-13] Le MCP `phantomwp` (`get_wordpress_schema`, `browse_content`, etc.) échoue en local car il cherche `src/lib/wordpress-config.ts` — ce fichier n'existe pas dans ce dépôt. D'après la doc officielle, la connexion WP vit dans un `.env` (`WP_API_URL`, `WP_ACCESS_SECRET`) généré côté IDE + une BDD interne PhantomWP, jamais versionnés dans Git. Le MCP ne fonctionne donc que depuis l'environnement PhantomWP (IDE navigateur/Codespaces/Docker), pas depuis un simple clone local.
- [2026-09-13] Theme Studio (doc officielle) génère par défaut `theme.css` au format Tailwind v4 (`@theme`, classes `bg-primary`...). Ce projet utilise le mode alternatif "CSS vanilla" de PhantomWP (tokens `:root { --color-* }` classiques) — ce n'est pas une anomalie, juste un mode différent du même outil.

## Consignes pour la prochaine session
- Le site devra comporter un dark mode (à prendre en compte dans les tokens `theme.css` et la structure atomique dès leur conception)
- Démarrer en posant les 2 questions encore sans réponse (ne pas coder avant) :
  1. Migration de l'existant : réorganiser Header/Footer/Section/BrandLogo/MainMenu dans `atoms/molecules/organisms` dès maintenant, ou créer la nouvelle arborescence en parallèle sans toucher à l'existant pour l'instant ?
  2. Blog : contenu piloté par WordPress (via MCP `phantomwp`, donc uniquement utilisable depuis l'environnement PhantomWP) ou content collections Astro locales en attendant l'accès WP ?
- Une fois validé : créer `src/components/atoms/`, `molecules/`, `organisms/`, migrer/réécrire les composants existants, puis scaffolder les pages du site vitrine + `src/pages/blog/index.astro` et `[slug].astro`
- Rappel : ne jamais modifier de code sans validation explicite au préalable (règle CLAUDE.md global)

## Notes diverses
- Ce fichier est mis à jour uniquement quand l'utilisateur écrit "mem" dans la conversation
