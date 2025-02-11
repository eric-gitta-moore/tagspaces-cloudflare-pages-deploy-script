# TagSpaces Cloudflare Pages 部署脚本

这是一个用于将 TagSpaces 部署到 Cloudflare Pages 的自动化脚本工具。

## 功能特点

- 自动克隆并构建 TagSpaces 项目
- 支持自定义 ExtLocations 配置
- 支持自定义基础目录配置
- 使用 execa 进行可靠的命令执行

## 环境要求

- Node.js v20.15.1 或更高版本
- npm 或 pnpm 包管理器

## 安装

```bash
# 克隆项目
git clone https://github.com/your-username/tagspaces-cloudflare-pages-deploy-script.git

# 进入项目目录
cd tagspaces-cloudflare-pages-deploy-script

# 安装依赖
npm install
# 或者使用 pnpm
pnpm install
```

## 使用方法

1. 配置环境变量（可选）：
   - `ExtLocations`: 配置 TagSpaces 的位置列表
   - `baseDir`: 配置部署的基础目录

2. 运行构建命令：

```bash
npm run build
# 或者使用 pnpm
pnpm build
```

构建完成后，`dist` 目录中将包含可以部署到 Cloudflare Pages 的文件。

## 环境变量说明

### ExtLocations
配置 TagSpaces 的位置列表，例如：
```javascript
ExtLocations='{
  "uuid": "your-location-uuid",
  "type": "1",
  "name": "Your Location Name",
  "path": "your-location-path",
  "watchForChanges": false
}'
```

### baseDir
指定部署到 Cloudflare Pages 的基础目录，例如：
```bash
baseDir="your-base-directory"
```

## 许可证

本项目基于 MIT 许可证开源。