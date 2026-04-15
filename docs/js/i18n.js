const i18n = {
  en: {
    switchLang: 'Switch Language', toggleTheme: 'Toggle Theme',
    heroTitle1: 'TT ShadUni Skill', heroTitle2: 'AI Development Intelligence',
    heroDesc: 'An AI Agent Skill that turns tt-shaduni component library and tt-daka-mp architecture into a queryable knowledge base. Ask about components, generate full modules, or modify existing code — all with one skill.',
    getStarted: 'Get Started',
    modesTitle: 'Three Work Modes', modesDesc: 'Automatically detects your intent and activates the right mode.',
    scenariosTitle: 'Interaction Scenarios', scenariosDesc: 'See how natural language triggers different work modes in real conversations.',
    layersTitle: 'Progressive Disclosure', layersDesc: 'Load knowledge on demand to stay within the context window.',
    installTitle: 'Installation', installDesc: 'Set up the skill for your preferred AI coding assistant.',
    structureTitle: 'File Structure', structureDesc: 'Clean separation of concerns — entry, knowledge, and templates.',
    tree: `skill/
├── SKILL.md              # Cursor entry
├── AGENTS.md             # Codex entry
├── CLAUDE.md             # Claude Code entry
├── knowledge/
│   ├── 01-overview.md
│   ├── components/       # 6 category files (63 components)
│   ├── 04-theme.md
│   ├── 05-icons.md
│   ├── 06-cloud-emas.md
│   ├── 07-architecture.md
│   ├── 08-patterns.md
│   └── 09-faq.md
├── templates/            # 14 reference examples
└── scripts/
    └── gen-component-docs.mjs`,
  },
  zh: {
    switchLang: '切换语言', toggleTheme: '切换主题',
    heroTitle1: 'TT ShadUni Skill', heroTitle2: 'AI 开发智能体',
    heroDesc: '将 tt-shaduni 组件库与 tt-daka-mp 项目架构转化为可查询的 AI 知识库。查询组件用法、生成完整模块、修改已有代码 —— 一个 Skill 全部搞定。',
    getStarted: '开始使用',
    modesTitle: '三种工作模式', modesDesc: '自动识别用户意图，激活对应工作模式。',
    scenariosTitle: '交互场景', scenariosDesc: '看看自然语言如何在真实对话中触发不同的工作模式。',
    layersTitle: '渐进式披露', layersDesc: '按需加载知识，确保始终在上下文窗口内高效工作。',
    installTitle: '安装指南', installDesc: '为你的 AI 编程助手配置此 Skill。',
    structureTitle: '文件结构', structureDesc: '入口、知识与范例清晰分离。',
    tree: `skill/
├── SKILL.md              # Cursor 入口
├── AGENTS.md             # Codex 入口
├── CLAUDE.md             # Claude Code 入口
├── knowledge/
│   ├── 01-overview.md
│   ├── components/       # 6 个分类文件（63 个组件）
│   ├── 04-theme.md
│   ├── 05-icons.md
│   ├── 06-cloud-emas.md
│   ├── 07-architecture.md
│   ├── 08-patterns.md
│   └── 09-faq.md
├── templates/            # 14 个参考范例
└── scripts/
    └── gen-component-docs.mjs`,
  }
}
