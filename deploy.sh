#!/bin/bash

# 贪吃蛇游戏部署脚本
# 用于将游戏部署到GitHub Pages

echo "🐍 贪吃蛇游戏部署脚本"
echo "======================"

# 检查是否在正确的目录
if [ ! -f "index.html" ] || [ ! -f "game.js" ]; then
    echo "错误：请在项目根目录运行此脚本"
    exit 1
fi

# 初始化Git仓库（如果尚未初始化）
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    git init
    git add .
    git commit -m "初始提交：贪吃蛇游戏"
fi

# 检查远程仓库
if ! git remote | grep -q origin; then
    echo "请先添加远程仓库："
    echo "git remote add origin https://github.com/zplswf/dd.git"
    echo "然后运行：git push -u origin main"
    exit 1
fi

# 拉取最新更改
echo "拉取最新更改..."
git pull origin main --rebase

# 添加所有文件
echo "添加文件到Git..."
git add .

# 提交更改
echo "提交更改..."
git commit -m "更新贪吃蛇游戏 $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到GitHub
echo "推送到GitHub..."
git push origin main

echo ""
echo "✅ 代码已推送到GitHub！"
echo ""
echo "📦 部署到GitHub Pages："
echo "1. 访问 https://github.com/zplswf/dd"
echo "2. 点击 Settings → Pages"
echo "3. 在 Source 部分选择："
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo "4. 点击 Save"
echo ""
echo "🌐 游戏将在几分钟后可通过以下地址访问："
echo "   https://zplswf.github.io/dd/"
echo ""
echo "🔄 如果需要强制更新GitHub Pages缓存："
echo "   在仓库设置中重新保存Pages配置"
echo ""
echo "🎮 游戏功能："
echo "   - 方向键或WASD控制"
echo "   - 空格键暂停"
echo "   - 移动设备支持触摸控制"
echo "   - 最高分本地保存"