import type { Config } from './presets.ts';

export function encodeConfigToURL(config: Config, selectedCommands: string[]): string {
  const params = new URLSearchParams();

  params.set('username', config.username);
  params.set('hostname', config.hostname);
  params.set('gpuModel', config.gpuModel);
  params.set('gpuCount', String(config.gpuCount));
  params.set('cpuCores', String(config.cpuCores));
  params.set('memory', String(config.memory));
  params.set('taskName', config.taskName);
  params.set('progress', String(config.progress));
  params.set('enableTyping', String(config.enableTyping));
  params.set('enableCursor', String(config.enableCursor));
  params.set('typingSpeed', String(config.typingSpeed));
  params.set('commands', selectedCommands.join(','));

  if (config.customCommands.length > 0) {
    params.set('customCommands', JSON.stringify(config.customCommands));
  }

  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  return url;
}

export function decodeConfigFromURL(): { config: Partial<Config>; selectedCommands: string[] } | null {
  const search = window.location.search;
  if (!search) return null;

  const params = new URLSearchParams(search);
  if (!params.has('username') && !params.has('hostname')) return null;

  const config: Partial<Config> = {};

  if (params.has('username')) config.username = params.get('username')!;
  if (params.has('hostname')) config.hostname = params.get('hostname')!;
  if (params.has('gpuModel')) config.gpuModel = params.get('gpuModel')!;
  if (params.has('gpuCount')) config.gpuCount = parseInt(params.get('gpuCount')!);
  if (params.has('cpuCores')) config.cpuCores = parseInt(params.get('cpuCores')!);
  if (params.has('memory')) config.memory = parseInt(params.get('memory')!);
  if (params.has('taskName')) config.taskName = params.get('taskName')!;
  if (params.has('progress')) config.progress = parseInt(params.get('progress')!);
  if (params.has('enableTyping')) config.enableTyping = params.get('enableTyping') === 'true';
  if (params.has('enableCursor')) config.enableCursor = params.get('enableCursor') === 'true';
  if (params.has('typingSpeed')) config.typingSpeed = parseInt(params.get('typingSpeed')!);

  try {
    if (params.has('customCommands')) {
      config.customCommands = JSON.parse(params.get('customCommands')!);
    }
  } catch {
    config.customCommands = [];
  }

  const selectedCommands = params.has('commands')
    ? params.get('commands')!.split(',').filter(Boolean)
    : ['nvidia-smi', 'squeue'];

  return { config, selectedCommands };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}
