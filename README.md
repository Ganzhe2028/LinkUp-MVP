# LinkUp MVP - 专业人才智能对接平台

<div align="center">

![LinkUp Logo](src/assets/logo.svg)

**🚀 基于AI的智能人才匹配平台，重新定义招聘体验**

[![GitHub](https://img.shields.io/badge/GitHub-LinkUp--MVP-blue?logo=github)](https://github.com/Ganzhe2028/LinkUp-MVP)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite)](https://vitejs.dev/)

</div>

## 🎯 产品愿景

LinkUp致力于通过AI技术革新传统招聘模式，为企业和人才提供更精准、高效的匹配服务。我们相信，每个人才都应该找到最适合的机会，每个企业都应该遇见最合适的人才。

## ✨ 核心功能

### 🤖 AI智能匹配
- **语义理解搜索**：支持自然语言查询，如"找个会AI的Python开发者，最好在北京"
- **多维度评分**：基于技能、经验、地理位置、文化匹配等综合评估
- **智能推荐**：基于Kimi AI的深度学习算法，提供个性化人才推荐

### 💬 实时沟通
- **即时聊天**：企业与候选人可直接沟通，提高沟通效率
- **消息管理**：完整的对话历史记录和消息状态管理
- **多媒体支持**：支持文本、图片等多种消息类型

### 👤 智能档案
- **完整画像**：包含技能、经验、项目、教育背景等全方位信息
- **动态更新**：实时同步最新状态和求职意向
- **隐私保护**：灵活的隐私设置，保护用户信息安全

### 📊 数据洞察
- **搜索分析**：提供搜索结果分析和优化建议
- **市场趋势**：展示人才市场分布和技能需求趋势
- **匹配报告**：详细的匹配原因和潜在价值分析

## 🛠️ 技术架构

### 前端技术栈
- **React 18** - 现代化用户界面框架
- **Vite** - 极速开发构建工具
- **Tailwind CSS** - 原子化CSS框架
- **Radix UI** - 高质量组件库
- **Framer Motion** - 流畅动画效果

### 后端服务
- **Supabase** - 现代化后端即服务平台
- **Kimi AI** - 智能搜索和匹配引擎
- **实时数据库** - 支持实时数据同步

### 核心特性
- 🎨 **现代化UI设计** - 简洁美观的用户界面
- 📱 **响应式布局** - 完美适配各种设备
- ⚡ **极速性能** - 优化的加载速度和交互体验
- 🔒 **安全可靠** - 企业级安全保障
- 🌐 **国际化支持** - 多语言界面支持

## 🚀 快速开始

### 环境要求
- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone git@github.com:Ganzhe2028/LinkUp-MVP.git
cd LinkUp-MVP
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
# 配置Supabase和Kimi AI相关参数
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
打开浏览器访问 `http://localhost:8080`

### 环境变量配置

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `VITE_SUPABASE_URL` | Supabase项目URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase匿名密钥 | ✅ |
| `VITE_KIMI_API_KEY` | Kimi AI API密钥 | ⚠️ |
| `VITE_KIMI_BASE_URL` | Kimi API基础URL | ⚠️ |

> ⚠️ **安全提醒**：
> - 请勿将真实的API密钥提交到代码仓库
> - `.env` 文件已被添加到 `.gitignore` 中
> - 未配置Kimi API时，系统将使用智能模拟搜索功能

### 🔐 API密钥获取

#### Supabase配置
1. 访问 [Supabase](https://supabase.com/) 创建项目
2. 在项目设置中获取 `URL` 和 `anon key`
3. 将密钥添加到 `.env` 文件中

#### Kimi AI配置（可选）
1. 访问 [Moonshot AI](https://platform.moonshot.cn/) 注册账号
2. 获取API密钥
3. 在 `.env` 文件中配置：
```bash
VITE_KIMI_API_KEY=your-real-kimi-api-key
```

## 📱 功能演示

### 主要页面
- **🏠 首页** - 产品介绍和快速入口
- **🔍 智能搜索** - AI驱动的人才搜索
- **👥 人才库** - 完整的候选人列表
- **💬 聊天中心** - 实时沟通平台
- **👤 个人档案** - 用户信息管理

### 核心流程
1. **注册登录** → **完善档案** → **开始搜索**
2. **AI匹配** → **查看详情** → **发起沟通**
3. **实时聊天** → **深度了解** → **达成合作**

## 🔧 开发指南

### 项目结构
```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
├── lib/           # 工具库和API
├── hooks/         # 自定义Hooks
├── contexts/      # React Context
└── assets/        # 静态资源
```

### 可用脚本
```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览生产构建
npm run lint       # 代码检查
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 Apache License 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- **项目地址**：[GitHub](https://github.com/Ganzhe2028/LinkUp-MVP)
- **问题反馈**：[Issues](https://github.com/Ganzhe2028/LinkUp-MVP/issues)
- **功能建议**：[Discussions](https://github.com/Ganzhe2028/LinkUp-MVP/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个星标！**

Made with ❤️ by LinkUp Team

</div>
