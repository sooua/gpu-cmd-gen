import type { Config } from './presets.ts';
import { GPU_SPECS } from './presets.ts';

export interface TerminalItem {
  type: 'prompt' | 'output' | 'empty';
  text?: string;
  command?: string;
}

export function generateTerminalContent(
  config: Config,
  selectedCommands: string[]
): TerminalItem[] {
  const gpu = GPU_SPECS[config.gpuModel] ?? { vram: 24, tflops: 82.6 };
  const totalVRAM = gpu.vram * config.gpuCount;
  const items: TerminalItem[] = [];

  // uname
  items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'uname -a' });
  items.push({ type: 'output', text: `Linux ${config.hostname} 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux` });
  items.push({ type: 'empty' });

  if (selectedCommands.includes('nvidia-smi')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'nvidia-smi' });
    items.push({ type: 'output', text: generateNvidiaSmi(config, gpu, totalVRAM) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('squeue')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: `squeue -u ${config.username}` });
    items.push({ type: 'output', text: generateSqueue(config) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('top')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'top -bn1 | head -20' });
    items.push({ type: 'output', text: generateTop(config) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('htop')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'htop --version' });
    items.push({ type: 'output', text: generateHtop(config) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('df')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'df -h' });
    items.push({ type: 'output', text: generateDf(config) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('free')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'free -h' });
    items.push({ type: 'output', text: generateFree(config) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('lscpu')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'lscpu | head -15' });
    items.push({ type: 'output', text: generateLscpu(config) });
    items.push({ type: 'empty' });
  }

  if (selectedCommands.includes('uptime')) {
    items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: 'uptime' });
    items.push({ type: 'output', text: generateUptime(config) });
    items.push({ type: 'empty' });
  }

  // Custom commands
  for (const cc of config.customCommands) {
    if (cc.cmd.trim()) {
      items.push({ type: 'prompt', text: `${config.username}@${config.hostname}:~$ `, command: cc.cmd });
      if (cc.output.trim()) {
        items.push({ type: 'output', text: escapeHtml(cc.output) });
      }
      items.push({ type: 'empty' });
    }
  }

  return items;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function generateNvidiaSmi(
  config: Config,
  gpu: { vram: number; tflops: number },
  totalVRAM: number
): string {
  const now = new Date();
  const dateStr = now.toDateString();
  const timeStr = now.toTimeString().split(' ')[0];

  let output = `${dateStr} ${timeStr} 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.54.15              Driver Version: 550.54.15      CUDA Version: 12.4     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
`;

  for (let i = 0; i < Math.min(config.gpuCount, 8); i++) {
    const util = 95 + Math.floor(Math.random() * 5);
    const memUsed = Math.floor(gpu.vram * 0.95);
    const temp = 65 + Math.floor(Math.random() * 15);
    const power = Math.floor(gpu.vram * 4.5 * (0.9 + Math.random() * 0.1));
    const powerCap = Math.floor(gpu.vram * 5);
    const busId = (0x80 + i).toString(16).toUpperCase();
    const fan = 30 + Math.floor(Math.random() * 40);
    output += `|   ${i}  ${config.gpuModel.padEnd(21)}    On  |   00000000:${busId}:00.0 Off |                    0 |
| ${fan.toString().padStart(2)}%   ${temp}C    P0         ${power}W / ${powerCap}W |    ${memUsed}GiB / ${gpu.vram}GiB |    ${util}%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
`;
  }

  if (config.gpuCount > 8) {
    output += `... (${config.gpuCount - 8} more GPUs)\n\n`;
    output += `<span class="success">Total GPU Count: ${config.gpuCount}</span>\n`;
    output += `<span class="success">Total VRAM: ${totalVRAM} GB (${(totalVRAM / 1024).toFixed(2)} TB)</span>\n`;
    output += `<span class="success">Total Compute: ${gpu.tflops * config.gpuCount} TFLOPS</span>\n`;
  }

  output += `
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A     12847      C   python3 ${config.taskName.padEnd(38)} ${Math.floor(gpu.vram * 0.95)}GiB |
+-----------------------------------------------------------------------------------------+`;

  return output;
}

export function generateSqueue(config: Config): string {
  const days = Math.floor(Math.random() * 10) + 1;
  const hrs = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const mins = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const secs = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const runtime = `${days}-${hrs}:${mins}:${secs}`;
  const nodes = Math.ceil(config.gpuCount / 8);
  const nodeList = nodes === 1 ? 'node001' : `node[001-${String(nodes).padStart(3, '0')}]`;
  const taskShort = config.taskName.substring(0, 8);
  const remaining = Math.floor((100 - config.progress) * 0.5);
  const barFilled = Array(Math.floor(config.progress / 2)).fill('█').join('');
  const barEmpty = Array(50 - Math.floor(config.progress / 2)).fill('░').join('');
  const gpuUtil = `98.${Math.floor(Math.random() * 10)}`;

  return `             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           1847293       gpu ${taskShort.padEnd(8)}  ${config.username.padEnd(8)}  R   ${runtime}    ${nodes} ${nodeList}

<span class="header-text">Job Status:</span>
  Task: ${config.taskName}
  Progress: <span class="success">${config.progress}%</span> [${barFilled}${barEmpty}]
  GPU Utilization: <span class="success">${gpuUtil}%</span>
  Estimated Time Remaining: ${remaining} hours`;
}

export function generateTop(config: Config): string {
  const uptime = Math.floor(Math.random() * 30) + 1;
  const uptimeHrs = Math.floor(Math.random() * 24);
  const uptimeMins = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const loadAvg = (config.cpuCores * 0.8).toFixed(2);
  const timeStr = new Date().toTimeString().split(' ')[0];
  const tasks = 120 + Math.floor(Math.random() * 50);
  const running = Math.floor(Math.random() * 3) + 1;
  const sleeping = tasks - running;
  const cpuUs = (85 + Math.random() * 10).toFixed(1);
  const cpuSy = (5 + Math.random() * 3).toFixed(1);
  const cpuId = (8 - Math.random() * 5).toFixed(1);
  const memTotal = (config.memory * 1024).toFixed(1);
  const memFree = (config.memory * 102.4).toFixed(1);
  const memUsed = (config.memory * 921.6).toFixed(1);
  const swapTotal = (config.memory * 0.5 * 1024).toFixed(1);
  const pid = 12847;
  const virt = `${(config.memory * 900).toFixed(0)}g`;
  const res = `${(config.memory * 850).toFixed(0)}g`;
  const cpuPct = (config.cpuCores * 9.8).toFixed(0);
  const timeUp = uptime * 24;

  return `top - ${timeStr} up ${uptime} days, ${uptimeHrs}:${uptimeMins}, 3 users,  load average: ${loadAvg}, ${loadAvg}, ${loadAvg}
Tasks: ${tasks} total,   ${running} running, ${sleeping} sleeping,   0 stopped,   0 zombie
%Cpu(s): ${cpuUs} us,  ${cpuSy} sy,  0.0 ni, ${cpuId} id,  0.0 wa,  0.0 hi,  0.3 si,  0.0 st
MiB Mem : ${memTotal} total, ${memFree} free, ${memUsed} used,       0.0 buff/cache
MiB Swap: ${swapTotal} total, ${swapTotal} free,      0.0 used. ${memFree} avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  ${pid} ${config.username.padEnd(9)} 20   0  ${virt} ${res}  12876 R  ${cpuPct}  92.3 ${timeUp}:34.56 python3
  12848 ${config.username.padEnd(9)} 20   0 4521832 234532  45632 S   3.2   0.1   1:23.45 nvidia-smi
   1234 root      20   0  167892  23456   8932 S   0.3   0.0   0:45.32 systemd`;
}

export function generateHtop(config: Config): string {
  const cpuPct = (85 + Math.random() * 10).toFixed(1);
  const barLen = Math.floor(config.cpuCores * 0.85 / 10);
  const barEmpty = Math.max(0, Math.floor(config.cpuCores * 0.15 / 10));
  const memUsed = (config.memory * 0.92).toFixed(0);
  const tasks = 120 + Math.floor(Math.random() * 50);
  const running = Math.floor(Math.random() * 3) + 1;
  const loadAvg = (config.cpuCores * 0.8).toFixed(2);

  return `htop 3.2.1
CPU Usage: [<span class="success">${Array(barLen).fill('|').join('')}</span>${Array(barEmpty).fill(' ').join('')}] ${cpuPct}%
Memory:    [<span class="warning">${Array(92).fill('|').join('')}</span>${Array(8).fill(' ').join('')}] ${memUsed}G/${config.memory}G
Swap:      [${Array(100).fill(' ').join('')}] 0G/${(config.memory * 0.5).toFixed(0)}G

Running: ${running}, Tasks: ${tasks}, Load average: ${loadAvg}`;
}

export function generateDf(config: Config): string {
  const total = config.gpuCount > 1000 ? Math.floor(config.gpuCount / 100) * 10 : 100;
  const used = Math.floor(total * (0.6 + Math.random() * 0.2));
  const avail = total - used;
  const usePct = Math.floor(used / total * 100);
  const dataTot = total * 5;
  const dataUsed = Math.floor(dataTot * 0.45);
  const dataAvail = dataTot - dataUsed;
  const dsTot = total * 10;
  const dsUsed = Math.floor(dsTot * 0.82);
  const dsAvail = dsTot - dsUsed;
  const shmSize = Math.floor(config.memory / 2);

  return `Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  ${total}T   ${used}T  ${avail}T  ${usePct}% /
/dev/nvme1n1    ${dataTot}T  ${dataUsed}T  ${dataAvail}T  45% /data
/dev/nvme2n1    ${dsTot}T ${dsUsed}T  ${dsAvail}T  82% /datasets
tmpfs            ${shmSize}G    0  ${shmSize}G   0% /dev/shm`;
}

export function generateFree(config: Config): string {
  const total = config.memory * 1024;
  const used = Math.floor(total * 0.92);
  const free = total - used;
  const swap = Math.floor(total * 0.5);

  return `               total        used        free      shared  buff/cache   available
Mem:           ${total}Mi      ${used}Mi       ${free}Mi       156Mi       512Mi       ${free}Mi
Swap:          ${swap}Mi          0Mi    ${swap}Mi`;
}

export function generateLscpu(config: Config): string {
  const coresPerSocket = Math.floor(config.cpuCores / 4);

  return `Architecture:            x86_64
  CPU op-mode(s):        32-bit, 64-bit
  Address sizes:         46 bits physical, 57 bits virtual
  Byte Order:            Little Endian
CPU(s):                  ${config.cpuCores}
  On-line CPU(s) list:   0-${config.cpuCores - 1}
Vendor ID:               GenuineIntel
  Model name:            Intel(R) Xeon(R) Platinum 8480+
    CPU family:          6
    Model:               143
    Thread(s) per core:  2
    Core(s) per socket:  ${coresPerSocket}
    Socket(s):           2
    CPU max MHz:         3800.0000
    CPU min MHz:         800.0000`;
}

export function generateUptime(config: Config): string {
  const days = Math.floor(Math.random() * 90) + 30;
  const hours = Math.floor(Math.random() * 24);
  const mins = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const load = (config.cpuCores * 0.8).toFixed(2);
  const timeStr = new Date().toTimeString().split(' ')[0];

  return ` ${timeStr} up ${days} days, ${hours}:${mins},  3 users,  load average: ${load}, ${load}, ${load}`;
}
