import type { Config } from './presets.ts';
import { generateTerminalContent } from './generator.ts';
import type { TerminalItem } from './generator.ts';

async function typeText(el: HTMLElement, text: string, speed: number): Promise<void> {
  for (const char of text) {
    el.textContent += char;
    await new Promise<void>((resolve) => setTimeout(resolve, speed));
  }
}

export async function renderTerminal(
  config: Config,
  selectedCommands: string[]
): Promise<void> {
  const terminal = document.getElementById('terminal') as HTMLElement;
  const container = document.getElementById('terminalContainer') as HTMLElement;
  const headerTitle = document.getElementById('terminalHeaderTitle') as HTMLElement;

  terminal.innerHTML = '';
  headerTitle.textContent = `${config.username}@${config.hostname}: ~`;
  container.classList.add('show');

  const items = generateTerminalContent(config, selectedCommands);

  for (const item of items) {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (item.type === 'empty') {
      line.innerHTML = '&nbsp;';
      terminal.appendChild(line);
      continue;
    }

    if (item.type === 'prompt') {
      const promptSpan = document.createElement('span');
      // Build colored prompt
      const [user, rest] = (item.text ?? '').split('@');
      const [host, suffix] = (rest ?? '').split(':');
      promptSpan.innerHTML = `<span class="prompt">${user}@${host}</span><span class="header-text">:~</span>$ `;
      line.appendChild(promptSpan);

      if (config.enableTyping) {
        const cmdSpan = document.createElement('span');
        cmdSpan.className = 'command typing';
        line.appendChild(cmdSpan);
        terminal.appendChild(line);
        await typeText(cmdSpan, item.command ?? '', config.typingSpeed);
        await new Promise<void>((resolve) => setTimeout(resolve, 200));
      } else {
        const cmdSpan = document.createElement('span');
        cmdSpan.className = 'command';
        cmdSpan.textContent = item.command ?? '';
        line.appendChild(cmdSpan);
        terminal.appendChild(line);
      }
    } else if (item.type === 'output') {
      line.className = 'terminal-line output';
      line.innerHTML = item.text ?? '';
      terminal.appendChild(line);
      if (config.enableTyping) {
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
      }
    }

    terminal.scrollTop = terminal.scrollHeight;
  }

  if (config.enableCursor) {
    const cursorLine = document.createElement('div');
    cursorLine.className = 'terminal-line';
    cursorLine.innerHTML = `<span class="prompt">${config.username}@${config.hostname}</span><span class="header-text">:~</span>$ <span class="cursor"></span>`;
    terminal.appendChild(cursorLine);
  }
}

export function generateDownloadableHTML(
  config: Config,
  selectedCommands: string[]
): string {
  const items = generateTerminalContent(config, selectedCommands);
  let terminalHTML = '';

  for (const item of items) {
    if (item.type === 'empty') {
      terminalHTML += '<div class="terminal-line">&nbsp;</div>\n';
    } else if (item.type === 'prompt') {
      const [user, rest] = (item.text ?? '').split('@');
      const [host] = (rest ?? '').split(':');
      terminalHTML += `<div class="terminal-line"><span class="prompt">${user}@${host}</span><span class="header-text">:~</span>$ <span class="command">${item.command ?? ''}</span></div>\n`;
    } else if (item.type === 'output') {
      terminalHTML += `<div class="terminal-line output">${item.text ?? ''}</div>\n`;
    }
  }

  if (config.enableCursor) {
    terminalHTML += `<div class="terminal-line"><span class="prompt">${config.username}@${config.hostname}</span><span class="header-text">:~</span>$ <span class="cursor"></span></div>`;
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.username}@${config.hostname} - Ubuntu Terminal</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#000; color:#fff; padding:20px; display:flex; justify-content:center; align-items:center; min-height:100vh; }
    .terminal-wrapper { max-width:1200px; width:100%; }
    .terminal-header { background:#2d2d2d; padding:10px 15px; border-radius:8px 8px 0 0; display:flex; align-items:center; gap:8px; }
    .terminal-btn { width:12px; height:12px; border-radius:50%; }
    .terminal-btn.close { background:#ff5f56; }
    .terminal-btn.minimize { background:#ffbd2e; }
    .terminal-btn.maximize { background:#27c93f; }
    .terminal-title { margin-left:auto; font-size:0.85rem; color:#999; }
    .terminal { background:#300a24; padding:20px; border-radius:0 0 8px 8px; font-family:'Courier New',monospace; font-size:14px; color:#fff; overflow-x:auto; min-height:500px; }
    .terminal-line { margin-bottom:2px; white-space:pre-wrap; word-break:break-all; }
    .prompt { color:#8ae234; }
    .command { color:#fff; }
    .output { color:#d3d7cf; }
    .header-text { color:#729fcf; }
    .warning { color:#fce94f; }
    .success { color:#8ae234; }
    .cursor { display:inline-block; width:8px; height:16px; background:#fff; animation:blink 1s step-end infinite; vertical-align:text-bottom; }
    @keyframes blink { 0%,50% { opacity:1; } 51%,100% { opacity:0; } }
    @media (max-width:768px) { .terminal { font-size:12px; padding:15px; } }
  </style>
</head>
<body>
  <div class="terminal-wrapper">
    <div class="terminal-header">
      <div class="terminal-btn close"></div>
      <div class="terminal-btn minimize"></div>
      <div class="terminal-btn maximize"></div>
      <div class="terminal-title">${config.username}@${config.hostname}: ~</div>
    </div>
    <div class="terminal">
${terminalHTML}
    </div>
  </div>
</body>
</html>`;
}
