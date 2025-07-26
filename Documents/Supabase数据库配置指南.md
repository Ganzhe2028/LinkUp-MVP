# Supabase数据库配置指南

## 🚀 快速配置Supabase数据库

### 1. 创建Supabase项目

1. 访问 [Supabase官网](https://supabase.com/)
2. 点击"Start your project"注册账号
3. 创建新项目：
   - 项目名称：`linkup-mvp`
   - 数据库密码：设置一个强密码
   - 地区：选择离您最近的地区

### 2. 获取项目配置

项目创建完成后：
1. 进入项目仪表板
2. 点击左侧"Settings" → "API"
3. 复制以下信息：
   - **Project URL**：`https://xxx.supabase.co`
   - **anon public key**：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. 配置环境变量

1. 复制 `.env.example` 为 `.env`：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入真实配置：
   ```bash
   # Supabase配置
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   
   # Kimi AI配置（可选）
   VITE_KIMI_API_KEY=your-kimi-api-key
   VITE_KIMI_BASE_URL=https://api.moonshot.cn/v1
   
   # LinkUp平台配置
   VITE_APP_NAME=LinkUp
   VITE_APP_DESCRIPTION=专业人才智能对接平台
   ```

### 4. 创建数据库表

1. 在Supabase仪表板中，点击"SQL Editor"
2. 复制 `src/lib/database.sql` 中的SQL代码
3. 粘贴到SQL编辑器中并执行

### 5. 重启开发服务器

```bash
npm run dev
```

## 🔒 安全注意事项

- ✅ `.env` 文件已添加到 `.gitignore`，不会被提交到代码仓库
- ✅ 使用 `anon key`，不是 `service_role key`
- ✅ 启用了行级安全策略（RLS）
- ⚠️ 不要将真实的API密钥分享给他人

## 🆓 免费额度

Supabase免费计划包括：
- 500MB 数据库存储
- 5GB 带宽
- 50,000 月活跃用户
- 无限API请求

对于MVP项目完全够用！

## 🔧 故障排除

### 问题1：无法连接到Supabase
- 检查URL和API密钥是否正确
- 确保网络连接正常
- 检查Supabase项目是否处于活跃状态

### 问题2：数据库表创建失败
- 确保SQL语句完整执行
- 检查是否有语法错误
- 可以分段执行SQL语句

### 问题3：认证功能不工作
- 检查环境变量是否正确加载
- 重启开发服务器
- 查看浏览器控制台错误信息