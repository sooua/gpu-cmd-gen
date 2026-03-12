# GPU-Cmd-Gen

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/已部署至-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/许可证-MIT-yellow.svg)](LICENSE)

> 🌐 [English README](README.md)

生成逼真的 GPU 服务器 Ubuntu 终端截图——适用于社交媒体、博客文章和技术演示。

---

## ✨ 功能特性

- **9 种 GPU 型号** — 从 RTX 3090 到 B200，配有精确的显存与 TFLOPS 参数
- **4 种快速预设** — 从个人开发工作站到 16k GPU 的 HPC 超算集群
- **8 条系统命令** — `nvidia-smi`、`squeue`、`top`、`htop`、`df`、`free`、`lscpu`、`uptime`
- **自定义命令** — 可无限添加自定义命令行及输出内容
- **打字动画** — 逼真的终端打字效果，支持调节速度与光标闪烁
- **导出 HTML / PNG** — 通过 `html2canvas` 一键下载
- **分享链接** — 完整配置编码为 URL 参数，一键复制
- **深色 / 浅色主题** — 偏好持久化存储（`localStorage`）
- **中英双语界面** — 语言偏好持久化存储（`localStorage`）

---

## 🖥️ 支持的 GPU 型号

| 型号     | 显存   | TFLOPS（FP16） |
|----------|--------|----------------|
| RTX 3090 | 24 GB  | 35.6           |
| RTX 4090 | 24 GB  | 82.6           |
| A40      | 48 GB  | 149.7          |
| V100     | 32 GB  | 125            |
| A100     | 80 GB  | 312            |
| L40S     | 48 GB  | 362.1          |
| H100     | 80 GB  | 989            |
| H200     | 141 GB | 989            |
| B200     | 192 GB | 4500           |

---

## 📦 快速开始

```bash
git clone https://github.com/sooua/gpu-cmd-gen.git
cd gpu-cmd-gen
npm install
npm run dev
# → http://localhost:3000
```

---

## 🚀 部署

### Vercel（推荐）

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 导入 `sooua/gpu-cmd-gen` 仓库
3. 框架预设：**Astro**（自动检测）
4. 构建命令：`npm run build`（已预填）
5. 输出目录：`dist`（由 `vercel.json` 预填）
6. 点击 **Deploy**

每次推送到 `main` 分支都会自动触发重新部署。

### 手动部署

```bash
npm run build
# 将 `dist/` 文件夹上传至任意静态托管服务
```

---

## 🛠 技术栈

| 层级       | 技术                                         |
|------------|----------------------------------------------|
| 框架       | [Astro 5](https://astro.build)               |
| 语言       | TypeScript 5                                 |
| 截图生成   | [html2canvas](https://html2canvas.hertzen.com) |
| 部署       | [Vercel](https://vercel.com)                 |
| 字体       | Geist / Geist Mono（Google Fonts）           |

---

## 📄 许可证

[MIT](LICENSE)

---

## 👤 作者

**Sevion**
[GitHub](https://github.com/sooua)
