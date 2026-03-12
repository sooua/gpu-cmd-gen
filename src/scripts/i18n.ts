export type Lang = 'zh' | 'en';

export interface Translations {
  subtitle: string;
  quickPresets: string;
  rtx4090: string;
  rtx4090Desc: string;
  startup: string;
  startupDesc: string;
  h200: string;
  h200Desc: string;
  cluster: string;
  clusterDesc: string;
  customConfig: string;
  username: string;
  hostname: string;
  gpuModel: string;
  gpuCount: string;
  cpuCores: string;
  memory: string;
  taskName: string;
  progress: string;
  commands: string;
  animationSettings: string;
  typingAnimation: string;
  cursorBlink: string;
  typingSpeed: string;
  customCommands: string;
  addCommand: string;
  commandPlaceholder: string;
  outputPlaceholder: string;
  generate: string;
  share: string;
  download: string;
  downloadPng: string;
  reset: string;
  downloadTerminal: string;
  linkCopied: string;
  generateFirst: string;
  footer1: string;
  footer2: string;
  themeTitle: string;
  remove: string;
}

const translations: Record<Lang, Translations> = {
  zh: {
    subtitle: '生成逼真的Ubuntu终端界面 - 支持超算集群、GPU服务器等多种预设',
    quickPresets: '📦 快速预设',
    rtx4090: '🎮 RTX 4090 工作站',
    rtx4090Desc: '单卡 24GB 显存，适合个人开发',
    startup: '🚀 AI创业公司',
    startupDesc: '8卡 A100 服务器',
    h200: '⚡ 顶级单机',
    h200Desc: '8卡 H200 超级服务器',
    cluster: '🏢 超算集群',
    clusterDesc: '万卡级别训练集群',
    customConfig: '⚙️ 自定义配置',
    username: '用户名',
    hostname: '主机名',
    gpuModel: 'GPU 型号',
    gpuCount: 'GPU 数量',
    cpuCores: 'CPU 核心数',
    memory: '内存 (GB)',
    taskName: '训练任务名称',
    progress: '训练进度 (%)',
    commands: '🔧 显示的命令',
    animationSettings: '🎬 动画设置',
    typingAnimation: '打字动画',
    cursorBlink: '光标闪烁',
    typingSpeed: '打字速度 (ms)',
    customCommands: '📝 自定义命令',
    addCommand: '+ 添加命令',
    commandPlaceholder: '命令 (如: ls -la)',
    outputPlaceholder: '命令输出内容...',
    generate: '🚀 生成终端',
    share: '🔗 分享链接',
    download: '💾 下载 HTML',
    downloadPng: '📷 下载 PNG',
    reset: '🔄 重置',
    downloadTerminal: '💾 下载终端 HTML',
    linkCopied: '✅ 链接已复制！',
    generateFirst: '请先生成终端！',
    footer1: 'Made with ❤️ by',
    footer2: 'View on GitHub',
    themeTitle: '切换主题',
    remove: '删除',
  },
  en: {
    subtitle: 'Generate realistic Ubuntu terminal interfaces — GPU servers, HPC clusters, and more',
    quickPresets: '📦 Quick Presets',
    rtx4090: '🎮 RTX 4090 Workstation',
    rtx4090Desc: 'Single GPU 24GB VRAM, for personal dev',
    startup: '🚀 AI Startup',
    startupDesc: '8x A100 server',
    h200: '⚡ Top-tier Machine',
    h200Desc: '8x H200 superserver',
    cluster: '🏢 HPC Cluster',
    clusterDesc: '10k+ GPU training cluster',
    customConfig: '⚙️ Custom Config',
    username: 'Username',
    hostname: 'Hostname',
    gpuModel: 'GPU Model',
    gpuCount: 'GPU Count',
    cpuCores: 'CPU Cores',
    memory: 'RAM (GB)',
    taskName: 'Training Job Name',
    progress: 'Progress (%)',
    commands: '🔧 Commands',
    animationSettings: '🎬 Animation',
    typingAnimation: 'Typing animation',
    cursorBlink: 'Cursor blink',
    typingSpeed: 'Typing speed (ms)',
    customCommands: '📝 Custom Commands',
    addCommand: '+ Add Command',
    commandPlaceholder: 'Command (e.g.: ls -la)',
    outputPlaceholder: 'Command output...',
    generate: '🚀 Generate',
    share: '🔗 Share',
    download: '💾 Download HTML',
    downloadPng: '📷 Download PNG',
    reset: '🔄 Reset',
    downloadTerminal: '💾 Download Terminal HTML',
    linkCopied: '✅ Link copied!',
    generateFirst: 'Please generate terminal first!',
    footer1: 'Made with ❤️ by',
    footer2: 'View on GitHub',
    themeTitle: 'Toggle theme',
    remove: 'Remove',
  },
};

export function t(lang: Lang, key: keyof Translations): string {
  return translations[lang][key];
}

export function applyLanguage(lang: Lang): void {
  document.querySelectorAll<HTMLElement>('[data-lang-key]').forEach((el) => {
    const key = el.getAttribute('data-lang-key') as keyof Translations;
    if (key && translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholder attributes
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-lang-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-lang-placeholder') as keyof Translations;
    if (key && translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Update lang button
  const currentLang = document.getElementById('currentLang');
  if (currentLang) {
    currentLang.textContent = lang === 'zh' ? '🇨🇳 中文' : '🇺🇸 English';
  }

  // Update active state on options
  document.querySelectorAll<HTMLElement>('.lang-option').forEach((opt) => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}
