# Mémoire de projet — phantomwp-max
*Dernière mise à jour : 2026-09-12*

## Contexte général
- Objectif : site Astro généré à partir de contenu WordPress via PhantomWP
- Stack / outils : Astro, CSS scoped vanilla (pas de Tailwind), design tokens dans `src/styles/theme.css`, MCP server PhantomWP (`.phantomwp/mcp/server.mjs`)
- Contraintes notables : ne jamais utiliser Tailwind ; toujours utiliser les tokens CSS (`var(--color-*)`, etc.) ; suivre les conventions décrites dans `CLAUDE.md`

## Décisions & conventions
- [2026-09-12] Mise en place de ce fichier `.claude/memory.md` comme historique des actions du projet, mis à jour sur demande explicite via le mot-clé "mem"
- [2026-09-12] `.claude/memory.md` versionné dans git (pas dans `.gitignore`) : choix explicite pour partager l'historique via GitHub, plutôt que de le garder local

## État actuel
- En cours : projet au stade scaffold initial — pas de contenu WordPress migré, `src/data/` vide, `src/config/*.json` aux valeurs par défaut (menu custom désactivé, aucun formulaire configuré), `docs/ai-instructions.md` non renseigné
- Bloqué sur : rien
- Prochaine étape : attendre les prochaines demandes de travail (probablement config du menu, des formulaires, ou premier contenu WordPress)

## Pièges & leçons apprises
- [2026-09-12] `AGENTS.md` mentionnait Tailwind V4 alors que `CLAUDE.md` impose du CSS vanilla scopé — contradiction entre les instructions destinées à Codex (`AGENTS.md`) et à Claude Code (`CLAUDE.md`). Corrigé dans `AGENTS.md` (commit `d840873`) pour aligner sur CSS vanilla. Vérifier que les skills projet (`.claude/skills/astro-wordpress/SKILL.md`) ne contiennent pas la même incohérence si un problème de style apparaît plus tard.

## Notes diverses
- Ce fichier est mis à jour uniquement quand l'utilisateur écrit "mem" dans la conversation
