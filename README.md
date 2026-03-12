# GPU-Cmd-Gen

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 🌐 [中文文档](README.zh.md)

Generate realistic Ubuntu terminal screenshots for GPU servers — perfect for social posts, blog articles, and presentations.

---

## ✨ Features

- **9 GPU models** — RTX 3090 to B200, with accurate VRAM and TFLOPS specs
- **4 quick presets** — from personal dev workstation to 16k-GPU HPC cluster
- **8 system commands** — `nvidia-smi`, `squeue`, `top`, `htop`, `df`, `free`, `lscpu`, `uptime`
- **Custom commands** — add unlimited custom command + output rows
- **Typing animation** — realistic terminal typing with adjustable speed and cursor blink
- **Download as HTML or PNG** — export via `html2canvas`
- **Share via URL** — full configuration encoded as URL params, one-click copy
- **Dark / Light theme** — persisted via `localStorage`
- **Bilingual UI** — English and Chinese, persisted via `localStorage`

---

## 🖥️ Supported GPUs

| Model    | VRAM  | TFLOPS (FP16) |
|----------|-------|----------------|
| RTX 3090 | 24 GB | 35.6           |
| RTX 4090 | 24 GB | 82.6           |
| A40      | 48 GB | 149.7          |
| V100     | 32 GB | 125            |
| A100     | 80 GB | 312            |
| L40S     | 48 GB | 362.1          |
| H100     | 80 GB | 989            |
| H200     | 141 GB| 989            |
| B200     | 192 GB| 4500           |

---

## 📦 Quick Start

```bash
git clone https://github.com/sooua/gpu-cmd-gen.git
cd gpu-cmd-gen
npm install
npm run dev
# → http://localhost:3000
```

---

## 🚀 Deploy

### Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `sooua/gpu-cmd-gen` repository
3. Framework preset: **Astro** (auto-detected)
4. Build command: `npm run build` (pre-filled)
5. Output directory: `dist` (pre-filled from `vercel.json`)
6. Click **Deploy**

Every push to `main` will trigger an automatic re-deploy.

### Manual

```bash
npm run build
# Upload the `dist/` folder to any static host
```

---

## 🛠 Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Framework  | [Astro 5](https://astro.build)     |
| Language   | TypeScript 5                       |
| Screenshot | [html2canvas](https://html2canvas.hertzen.com) |
| Deploy     | [Vercel](https://vercel.com)       |
| Font       | Geist / Geist Mono (Google Fonts)  |

---

## 📄 License

[MIT](LICENSE)

---

## 👤 Author

**Sevion**
[GitHub](https://github.com/sooua)
