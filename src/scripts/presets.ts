export interface Config {
  username: string;
  hostname: string;
  gpuModel: string;
  gpuCount: number;
  cpuCores: number;
  memory: number;
  taskName: string;
  progress: number;
  enableTyping: boolean;
  enableCursor: boolean;
  typingSpeed: number;
  customCommands: CustomCommand[];
}

export interface CustomCommand {
  cmd: string;
  output: string;
}

export interface GpuSpec {
  vram: number;
  tflops: number;
}

export interface Preset {
  username: string;
  hostname: string;
  gpuModel: string;
  gpuCount: number;
  cpuCores: number;
  memory: number;
  taskName: string;
  progress: number;
}

export const GPU_SPECS: Record<string, GpuSpec> = {
  'RTX 3090':  { vram: 24,  tflops: 35.6  },
  'RTX 4090':  { vram: 24,  tflops: 82.6  },
  'A40':       { vram: 48,  tflops: 149.7 },
  'A100':      { vram: 80,  tflops: 312   },
  'L40S':      { vram: 48,  tflops: 362.1 },
  'H100':      { vram: 80,  tflops: 989   },
  'H200':      { vram: 141, tflops: 989   },
  'V100':      { vram: 32,  tflops: 125   },
  'B200':      { vram: 192, tflops: 4500  },
};

export const PRESETS: Record<string, Preset> = {
  rtx4090: {
    username: 'developer',
    hostname: 'workstation',
    gpuModel: 'RTX 4090',
    gpuCount: 1,
    cpuCores: 32,
    memory: 128,
    taskName: 'stable-diffusion-training',
    progress: 67,
  },
  startup: {
    username: 'admin',
    hostname: 'ai-cluster-01',
    gpuModel: 'A100',
    gpuCount: 8,
    cpuCores: 128,
    memory: 1024,
    taskName: 'LLaMA-3-70B-finetune',
    progress: 82,
  },
  h200: {
    username: 'root',
    hostname: 'dgx-h200',
    gpuModel: 'H200',
    gpuCount: 8,
    cpuCores: 224,
    memory: 2048,
    taskName: 'multimodal-foundation-model',
    progress: 34,
  },
  cluster: {
    username: 'sysadmin',
    hostname: 'hpc-master',
    gpuModel: 'H200',
    gpuCount: 16384,
    cpuCores: 262144,
    memory: 4194304,
    taskName: 'GPT-5.1-pretrain',
    progress: 45,
  },
};

export const DEFAULT_CONFIG: Config = {
  username: 'admin',
  hostname: 'gpu-server-01',
  gpuModel: 'RTX 4090',
  gpuCount: 1,
  cpuCores: 64,
  memory: 256,
  taskName: 'GPT-5.1-pretrain',
  progress: 45,
  enableTyping: true,
  enableCursor: true,
  typingSpeed: 30,
  customCommands: [],
};
