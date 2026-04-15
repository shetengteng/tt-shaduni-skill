# TT ShadUni Skill

An AI Agent Skill that turns [tt-shaduni](https://github.com/shetengteng/tt-shaduni) component library and tt-daka-mp project architecture into a queryable knowledge base for AI coding assistants.

**Docs**: [https://shetengteng.github.io/tt-shaduni-skill/](https://shetengteng.github.io/tt-shaduni-skill/)

## Installation

### Cursor

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp -r tt-shaduni-skill/skill/ ~/.cursor/skills/tt-shaduni/
```

Restart Cursor — the skill will appear in `available_skills` automatically.

### Codex

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp tt-shaduni-skill/skill/AGENTS.md ./
cp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/
cp -r tt-shaduni-skill/skill/templates/ ./templates/
```

Codex will auto-read `AGENTS.md` and load the knowledge base.

### Claude Code

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp tt-shaduni-skill/skill/CLAUDE.md ./
cp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/
cp -r tt-shaduni-skill/skill/templates/ ./templates/
```

Claude Code will auto-read `CLAUDE.md` and load the knowledge base.

## Work Modes

| Mode | Description | Trigger Signals |
|------|-------------|-----------------|
| **Query** | Ask about component APIs, theme system, architecture, EMAS | "how to use", "what is", "which props", `tt-xxx` |
| **Generate** | Provide module name + fields → AI generates full code | "generate", "create", "write", "new module" |
| **Modify** | Read existing code first, then incremental changes | "add a", "change", "modify", "fix" |

## Interaction Scenarios

### Scenario 1: Component API Query

> **You**: tt-button has which variants? How to use outline style?
>
> **AI**: `tt-button` supports 5 variants: `default` (solid primary), `secondary` (muted gray), `outline` (bordered), `ghost` (transparent), `destructive` (red). Usage: `<tt-button variant="outline">Cancel</tt-button>`

### Scenario 2: Full Module Generation

> **You**: Generate a task management module with fields: title, deadline, priority, assignee
>
> **AI**: Field type inference:
> - `title` → `<tt-input>` text input
> - `deadline` → `<tt-date-picker>` date picker
> - `priority` → `<tt-radio>` radio (high/medium/low)
> - `assignee` → `<tt-picker>` person picker
>
> After confirmation, I'll generate 8 files: Schema, 5 APIs, Store, list/detail/form pages, route config.

### Scenario 3: Incremental Code Changes

> **You**: Add search functionality to the project module
>
> **AI**: Read `pages/project/index.vue` and `stores/project.js`. Plan:
> - Add `<tt-search>` at the top of the list page
> - Add `searchKeyword` state and `filteredList` getter in Store
> - Add `keyword` param to EMAS query in API layer
>
> Only 3 files modified, no impact on other modules.

### Scenario 4: Query Then Generate (Cross-mode)

> **You**: How does tt-calendar work? Build me a schedule management page.
>
> **AI**: `tt-calendar` key props: `mode` (single/range), `formatter` (custom date rendering), `showBottom` (bottom confirm bar).
>
> Now generating schedule module using `<tt-calendar mode="single">` + `formatter` to mark dates with events...

### Scenario 5: Architecture Pattern

> **You**: How to connect EMAS database? What's the API return format?
>
> **AI**: EMAS is initialized via `setupEmas(sdk)` — SDK must be explicitly passed. Database operations go through `emas.js` entry: `const db = emas.database()`. Unified API return format: `{ success: true, data: [...] }` or `{ success: false, error: "msg" }`

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
```

## Tech Stack

- **UI Library**: [tt-shaduni](https://github.com/shetengteng/tt-shaduni) — shadcn/ui style, 63 components
- **Framework**: Vue 3 + UniApp
- **Cloud**: EMAS Serverless
- **Platforms**: H5 / WeChat Mini-program / Alipay Mini-program

## License

MIT
