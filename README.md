# TT ShadUni Skill

An AI Agent Skill that turns [tt-shaduni](https://github.com/shetengteng/tt-shaduni) component library and tt-daka-mp project architecture into a queryable knowledge base for AI coding assistants.

## Platforms

| Platform | Entry File | Setup |
|----------|-----------|-------|
| Cursor | `skill/SKILL.md` | Copy `skill/` to `~/.cursor/skills/tt-shaduni/` |
| Codex | `skill/AGENTS.md` | Place in project root |
| Claude Code | `skill/CLAUDE.md` | Place in project root |

## Work Modes

**Query** — Ask about component APIs, theme system, architecture patterns, EMAS cloud service
- Signals: "how to use", "what is", "which props", component names like `tt-button`

**Generate** — Provide module name + fields → AI generates Schema → API → Store → Page → Route
- Signals: "generate", "create", "write", "new module"

**Modify** — Reads existing code first, then makes incremental changes
- Signals: "add a", "change", "modify", "fix"

## Progressive Disclosure

| Layer | Content | When Loaded |
|-------|---------|-------------|
| L0 | `SKILL.md` (~60 lines) | Always (entry point) |
| L1 | 13 knowledge files | On demand by topic |
| L2 | 14 templates + source code | When precise details needed |

## Structure

```
skill/
├── SKILL.md                    # Entry point (Cursor)
├── AGENTS.md                   # Entry point (Codex)
├── CLAUDE.md                   # Entry point (Claude Code)
├── knowledge/
│   ├── 01-overview.md          # Project overview
│   ├── components/             # 6 component category files (63 components)
│   │   ├── basic.md
│   │   ├── layout.md
│   │   ├── navigation.md
│   │   ├── form.md
│   │   ├── display.md
│   │   └── feedback.md
│   ├── 04-theme.md             # CSS variable theme system
│   ├── 05-icons.md             # Remix Icon usage
│   ├── 06-cloud-emas.md        # EMAS Serverless
│   ├── 07-architecture.md      # 10 architecture patterns
│   ├── 08-patterns.md          # Generation workflow
│   └── 09-faq.md               # Common questions
├── templates/                  # 14 real code examples from tt-daka-mp
│   ├── page/                   # list / detail / form
│   ├── api/                    # CRUD (5 files)
│   ├── component/              # Business card component
│   ├── store/                  # Pinia store
│   ├── schema/                 # Collection schema
│   ├── composable/             # usePageFresh
│   ├── utils/                  # Auth utilities
│   └── config/                 # EMAS config
└── scripts/
    └── gen-component-docs.mjs  # Auto-generate component docs
design/                         # Design documents & review notes
```

## Quick Start

```bash
# Clone
git clone https://github.com/shetengteng/tt-shaduni-skill.git

# For Cursor: copy skill directory
cp -r tt-shaduni-skill/skill/ ~/.cursor/skills/tt-shaduni/

# For Codex/Claude Code: copy entry file to project root
cp tt-shaduni-skill/skill/AGENTS.md ./AGENTS.md
```

Then ask your AI assistant:

- "tt-button has which variants?"
- "How does the EMAS cloud service work?"
- "Generate a task management module with fields: title, deadline, priority"

## Tech Stack

- **UI Library**: [tt-shaduni](https://github.com/shetengteng/tt-shaduni) — shadcn/ui style, 63 components
- **Framework**: Vue 3 + UniApp
- **Cloud**: EMAS Serverless
- **Platforms**: H5 / WeChat Mini-program / Alipay Mini-program

## Docs

[https://shetengteng.github.io/tt-shaduni-skill/](https://shetengteng.github.io/tt-shaduni-skill/)

## License

MIT
