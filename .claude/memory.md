# Mémoire de projet — phantomwp-max
*Dernière mise à jour : 2026-09-13*

## Contexte général
- Objectif : site Astro généré à partir de contenu WordPress via PhantomWP
- Stack / outils : Astro, CSS scoped vanilla (pas de Tailwind), design tokens dans `src/styles/theme.css`, MCP server PhantomWP (`.phantomwp/mcp/server.mjs`)
- Contraintes notables : ne jamais utiliser Tailwind ; toujours utiliser les tokens CSS (`var(--color-*)`, etc.) ; suivre les conventions décrites dans `CLAUDE.md`
- Système complet organisé via l'IDE PhantomWP dans le navigateur (Codespaces/Docker/Fly.io), lié à ce dépôt GitHub. Doc officielle : https://phantomwp.com/docs/getting-started/introduction

## Décisions & conventions
- [2026-09-12] Mise en place de ce fichier `.claude/memory.md` comme historique des actions du projet, mis à jour sur demande explicite via le mot-clé "mem"
- [2026-09-12] `.claude/memory.md` versionné dans git (pas dans `.gitignore`) : choix explicite pour partager l'historique via GitHub, plutôt que de le garder local

## État actuel
- En cours : toujours au stade scaffold — `theme.css` avec tokens par défaut (violet #6366f1), `index.astro` avec contenu placeholder ("Welcome"), `docs/ai-instructions.md` non renseigné
- Bloqué sur : pas d'accès au schéma WordPress réel en local (voir Pièges) — travail webdesign en cours à partir du code existant uniquement
- Prochaine étape : personnaliser palette/typo dans `theme.css` et/ou construire la structure de la page d'accueil (hero + sections) avec contenu provisoire

## Pièges & leçons apprises
- [2026-09-12] `AGENTS.md` mentionnait Tailwind V4 alors que `CLAUDE.md` impose du CSS vanilla scopé — contradiction entre les instructions destinées à Codex (`AGENTS.md`) et à Claude Code (`CLAUDE.md`). Corrigé dans `AGENTS.md` (commit `d840873`) pour aligner sur CSS vanilla.
- [2026-09-12] Vérification des skills projet (`.claude/skills/astro-wordpress/`) : `SKILL.md` et `tailwind.md` étaient déjà cohérents (CSS vanilla). Résidu trouvé dans `fonts.md` — section "Using Fonts in Tailwind" avec syntaxe `@theme` et classes utilitaires Tailwind. Corrigé (commit `367c521`) pour utiliser `var(--font-*)` en CSS vanilla à la place.
- [2026-09-13] Le MCP `phantomwp` (`get_wordpress_schema`, `browse_content`, etc.) échoue en local car il cherche `src/lib/wordpress-config.ts` — ce fichier n'existe pas dans ce dépôt. D'après la doc officielle, la connexion WP vit dans un `.env` (`WP_API_URL`, `WP_ACCESS_SECRET`) généré côté IDE + une BDD interne PhantomWP, jamais versionnés dans Git. Le MCP ne fonctionne donc que depuis l'environnement PhantomWP (IDE navigateur/Codespaces/Docker), pas depuis un simple clone local.
- [2026-09-13] Theme Studio (doc officielle) génère par défaut `theme.css` au format Tailwind v4 (`@theme`, classes `bg-primary`...). Ce projet utilise le mode alternatif "CSS vanilla" de PhantomWP (tokens `:root { --color-* }` classiques) — ce n'est pas une anomalie, juste un mode différent du même outil.

## Notes diverses
- Ce fichier est mis à jour uniquement quand l'utilisateur écrit "mem" dans la conversation
