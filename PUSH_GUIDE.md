# 🚀 贪吃蛇游戏推送指南

代码已准备好，但需要手动推送到GitHub。以下是完整步骤：

## 📦 当前状态
- ✅ 游戏代码已创建：`index.html`, `game.js`, `README.md`, `deploy.sh`
- ✅ Git仓库已初始化
- ✅ 代码已提交到本地仓库
- ✅ 远程仓库已配置：`https://github.com/zplswf/dd.git`
- ❌ 代码尚未推送到GitHub

## 🔧 手动推送步骤

### 方法1：使用Git命令（推荐）
在终端中执行：

```bash
# 进入项目目录
cd /home/admin/clawd/dd

# 重命名分支为main（如果尚未）
git branch -M main

# 推送到GitHub
git push -u origin main
```

如果遇到认证问题，可能需要：
1. 使用SSH密钥认证
2. 或使用GitHub Personal Access Token

### 方法2：使用GitHub Desktop
1. 下载GitHub Desktop
2. 添加本地仓库：`/home/admin/clawd/dd`
3. 提交更改
4. 推送到GitHub

### 方法3：使用网页上传
1. 访问 https://github.com/zplswf/dd
2. 点击"Add file" → "Upload files"
3. 上传以下4个文件：
   - `index.html`
   - `game.js` 
   - `README.md`
   - `deploy.sh`

## 🔐 认证方式

### 使用Personal Access Token（推荐）
1. 生成Token：GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 勾选`repo`权限
3. 复制Token
4. 推送时使用Token作为密码：
   ```bash
   git push https://[TOKEN]@github.com/zplswf/dd.git main
   ```

### 使用SSH密钥
1. 生成SSH密钥：`ssh-keygen -t ed25519 -C "327460247@qq.com"`
2. 添加公钥到GitHub：Settings → SSH and GPG keys
3. 使用SSH URL：
   ```bash
   git remote set-url origin git@github.com:zplswf/dd.git
   git push -u origin main
   ```

## 🌐 启用GitHub Pages

推送成功后，启用GitHub Pages：

1. 访问 https://github.com/zplswf/dd
2. 点击 **Settings** → **Pages**
3. 在 **Source** 部分选择：
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 **Save**

等待1-2分钟，游戏将在以下地址可用：
**https://zplswf.github.io/dd/**

## 🎮 本地测试

在推送前，可以先本地测试：

```bash
# 启动本地服务器
python3 -m http.server 8000

# 浏览器访问
http://localhost:8000
```

## 📁 文件清单

确保推送以下文件：
```
dd/
├── index.html          # 主页面（必需）
├── game.js            # 游戏逻辑（必需）
├── README.md          # 说明文档（推荐）
├── deploy.sh          # 部署脚本（可选）
└── PUSH_GUIDE.md      # 本指南（可选）
```

## ⚠️ 常见问题

### 1. 认证失败
```
remote: Support for password authentication was removed...
```
**解决**：使用Personal Access Token代替密码

### 2. 权限拒绝
```
ERROR: Permission to zplswf/dd.git denied to user...
```
**解决**：确认有仓库写入权限，或使用正确的账户

### 3. 网络超时
```
fatal: unable to access 'https://github.com/...': Failed to connect to github.com port 443: Connection timed out
```
**解决**：
- 检查网络连接
- 使用SSH代替HTTPS
- 配置Git代理

### 4. 分支冲突
```
error: failed to push some refs to 'https://github.com/...'
```
**解决**：
```bash
git pull origin main --rebase
git push origin main
```

## 🛠️ 备用方案

如果无法推送，可以：

### 方案A：创建新仓库
1. 删除本地`.git`文件夹
2. 在GitHub创建新仓库
3. 重新初始化并推送

### 方案B：使用GitHub CLI
```bash
# 安装GitHub CLI
gh repo create dd --public --source=. --remote=origin --push
```

### 方案C：压缩上传
1. 将`dd`文件夹压缩为ZIP
2. 在GitHub仓库页面直接上传ZIP文件
3. GitHub会自动解压

## 📞 获取帮助

如果遇到问题：
1. 检查Git版本：`git --version`
2. 检查网络：`ping github.com`
3. 查看Git配置：`git config --list`
4. 搜索错误信息

## ✅ 成功标志

推送成功后，你应该看到：
```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Writing objects: 100% (7/7), 10.45 KiB | 2.09 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/zplswf/dd.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

然后访问 https://github.com/zplswf/dd 确认代码已上传。

---
**最后更新**：2025年1月31日  
**游戏状态**：代码就绪，等待推送  
**预计上线时间**：推送后5分钟内