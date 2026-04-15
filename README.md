# TT ShadUni Skill

An AI Agent Skill that turns the [tt-shaduni](https://github.com/shetengteng/tt-shaduni) component library and tt-daka-mp project architecture into a queryable knowledge base for AI coding assistants on Cursor, Codex, and Claude Code.

[中文文档](./README.zh-CN.md) | **Documentation**: [https://shetengteng.github.io/tt-shaduni-skill/](https://shetengteng.github.io/tt-shaduni-skill/)

---

## Installation

### Cursor

Clone this repository to your local machine, then copy the `skill/` directory into Cursor's Skills folder. After restarting Cursor, the skill will automatically appear in the available skills list.

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp -r tt-shaduni-skill/skill/ ~/.cursor/skills/tt-shaduni/
```

### Codex

Clone the repository, then copy the entry file `AGENTS.md` along with the `knowledge/` and `templates/` directories into your project root. Codex will automatically read `AGENTS.md` on startup and load the knowledge base.

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp tt-shaduni-skill/skill/AGENTS.md ./
cp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/
cp -r tt-shaduni-skill/skill/templates/ ./templates/
```

### Claude Code

Clone the repository, then copy the entry file `CLAUDE.md` along with the `knowledge/` and `templates/` directories into your project root. Claude Code will automatically read `CLAUDE.md` on startup and load the knowledge base.

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp tt-shaduni-skill/skill/CLAUDE.md ./
cp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/
cp -r tt-shaduni-skill/skill/templates/ ./templates/
```

---

## Work Modes

| Mode | Description | Trigger Signals |
|------|-------------|-----------------|
| **Query** | Ask about component APIs, theme system, architecture patterns, EMAS cloud service | "how to use", "what is", "which props", `tt-xxx` |
| **Generate** | Provide module name and fields, AI generates complete code | "generate", "create", "write", "new module" |
| **Modify** | Read existing code first, then make incremental changes | "add a", "change", "modify", "fix" |

---

## Interaction Scenarios

### Scenario 1: Component API Query

> **You**: What variants does tt-button have? How to use the outline style?
>
> **AI**: `tt-button` supports 5 variants: `default` (solid primary button), `secondary` (muted gray button), `outline` (bordered button), `ghost` (transparent background), `destructive` (red for dangerous actions).
>
> Usage: `<tt-button variant="outline">Cancel</tt-button>`

### Scenario 2: Full Module Generation

> **You**: Generate a task management module with fields: title, deadline, priority, assignee
>
> **AI**: Field type inference:
> - `title` → `<tt-input>` text input
> - `deadline` → `<tt-date-picker>` date picker
> - `priority` → `<tt-radio>` radio group (high / medium / low)
> - `assignee` → `<tt-picker>` person picker
>
> After confirmation, I will generate 8 files: Schema, 5 APIs (create, read, update, delete, list), Store, list page, detail page, form page, and route configuration.

### Scenario 3: Incremental Code Changes

> **You**: Add search functionality to the project module
>
> **AI**: I have read `pages/project/index.vue` and `stores/project.js`. Here is the modification plan:
> - Add a `<tt-search>` component at the top of the list page
> - Add `searchKeyword` state and `filteredList` getter in the Store
> - Add a `keyword` parameter to the EMAS query in the API layer
>
> Only 3 files will be modified, with no impact on other modules.

### Scenario 4: Query Then Generate (Cross-mode)

> **You**: How does tt-calendar work? Build me a schedule management page.
>
> **AI**: `tt-calendar` key properties: `mode` (single or range), `formatter` (custom date rendering), `showBottom` (bottom confirm bar).
>
> Now generating the schedule management module using `<tt-calendar mode="single">` combined with `formatter` to highlight dates with scheduled events. This includes Schema, API, Store, and pages...

### Scenario 5: Architecture Pattern

> **You**: How to connect the EMAS database? What is the API return format?
>
> **AI**: EMAS is initialized via `setupEmas(sdk)` — the SDK must be explicitly passed in. Database operations go through the `emas.js` entry point:
> ```javascript
> const db = emas.database()
> const result = await db.collection("xxx").get()
> ```
> Unified API return format: `{ success: true, data: [...] }` or `{ success: false, error: "error message" }`

---

## Progressive Disclosure

| Layer | Content | When Loaded |
|-------|---------|-------------|
| Layer 0 | `SKILL.md` (approximately 60 lines) | Always loaded as the entry point |
| Layer 1 | 13 knowledge files | Loaded on demand by topic |
| Layer 2 | 14 reference templates and source code | Loaded when precise details are needed |

---

## File Structure

```
skill/
├── SKILL.md                    # Cursor entry point
├── AGENTS.md                   # Codex entry point
├── CLAUDE.md                   # Claude Code entry point
├── knowledge/
│   ├── 01-overview.md          # Project overview
│   ├── components/             # 6 component category files (63 components)
│   │   ├── basic.md            # Basic components
│   │   ├── layout.md           # Layout components
│   │   ├── navigation.md       # Navigation components
│   │   ├── form.md             # Form components
│   │   ├── display.md          # Display components
│   │   └── feedback.md         # Feedback components
│   ├── 04-theme.md             # CSS variable theme system
│   ├── 05-icons.md             # Remix Icon system
│   ├── 06-cloud-emas.md        # EMAS Serverless cloud service
│   ├── 07-architecture.md      # 10 architecture patterns
│   ├── 08-patterns.md          # Generation workflow
│   └── 09-faq.md               # Frequently asked questions
├── templates/                  # 14 real code examples from tt-daka-mp
│   ├── page/                   # List page, detail page, form page
│   ├── api/                    # Create, read, update, delete, list (5 files)
│   ├── component/              # Business card component
│   ├── store/                  # Pinia state management
│   ├── schema/                 # Collection schema definition
│   ├── composable/             # usePageFresh composable function
│   ├── utils/                  # Authentication utilities
│   └── config/                 # EMAS configuration
└── scripts/
    └── gen-component-docs.mjs  # Auto-generate component documentation script
```

---

## Tech Stack

- **UI Library**: [tt-shaduni](https://github.com/shetengteng/tt-shaduni) — shadcn/ui style, 63 components
- **Framework**: Vue 3 + UniApp
- **Cloud Service**: EMAS Serverless
- **Supported Platforms**: H5, WeChat Mini-program, Alipay Mini-program

## License

MIT
