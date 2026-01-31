#!/bin/bash

# 贪吃蛇游戏 - 最终推送脚本
# 推送到 https://github.com/zplswf/dd

echo "🐍 贪吃蛇游戏 - 最终推送"
echo "========================"
echo "目标仓库: https://github.com/zplswf/dd"
echo ""

# 检查目录
if [ ! -f "index.html" ] || [ ! -f "game.js" ]; then
    echo "❌ 错误：请在游戏目录 (/home/admin/clawd/dd) 运行"
    exit 1
fi

echo "📊 当前状态："
git status --short
echo ""

echo "🔗 远程仓库配置："
git remote -v
echo ""

echo "🚀 尝试推送方案..."
echo ""

# 方案1：尝试HTTPS推送
echo "1. 尝试HTTPS推送..."
git push https://github.com/zplswf/dd.git main 2>&1 | grep -E "success|error|fatal|Username|Password" || echo "等待认证..."

echo ""
echo "📋 如果认证失败，请选择以下方案："
echo ""
echo "🔑 方案A：使用GitHub Token推送"
echo "   1. 获取Token：GitHub → Settings → Developer settings → Personal access tokens"
echo "   2. 生成Token，勾选 'repo' 权限"
echo "   3. 运行：git push https://[TOKEN]@github.com/zplswf/dd.git main"
echo ""
echo "🔐 方案B：使用SSH推送"
echo "   1. 确保SSH密钥已添加到GitHub"
echo "   2. 运行："
echo "      git remote set-url origin git@github.com:zplswf/dd.git"
echo "      git push -u origin main"
echo ""
echo "💻 方案C：手动输入凭据"
echo "   运行：git credential fill"
echo "   然后输入："
echo "   protocol=https"
echo "   host=github.com"
echo "   username=你的GitHub用户名"
echo "   password=你的Token"
echo ""
echo "🌐 方案D：使用GitHub CLI"
echo "   运行：gh auth login"
echo "   然后：git push origin main"
echo ""
echo "========================================"
echo "🎯 推送成功后："
echo "1. 访问 https://github.com/zplswf/dd"
echo "2. 确认代码已上传"
echo "3. Settings → Pages → 启用GitHub Pages"
echo "4. 访问：https://zplswf.github.io/dd/"
echo ""
echo "🎮 游戏功能："
echo "   - 完整贪吃蛇游戏"
echo "   - 现代化UI设计"
echo "   - 键盘+触摸控制"
echo "   - 分数系统"
echo "========================================"

# 显示文件清单
echo ""
echo "📁 推送的文件："
ls -la *.html *.js *.md *.sh 2>/dev/null | awk '{print $9, "(" $5 "字节)"}'
echo ""
echo "总文件数: $(ls -1 *.html *.js *.md *.sh 2>/dev/null | wc -l)"
echo ""

# 最后尝试一次
echo "🔄 最后尝试推送..."
echo "按Ctrl+C取消，或等待认证提示"
timeout 30 git push -u origin main 2>&1 | tail -10