#!/bin/bash

# 使用GitHub Token推送
echo "🚀 使用GitHub Token推送"
echo "======================"

if [ -z "$1" ]; then
    echo "❌ 请提供GitHub Token作为参数"
    echo "用法: ./PUSH_WITH_TOKEN.sh 你的GitHub_Token"
    exit 1
fi

TOKEN="$1"
REPO="zplswf/dd"

echo "仓库: $REPO"
echo ""

# 切换回HTTPS远程
git remote set-url origin "https://github.com/$REPO.git"

echo "📤 开始推送..."
echo ""

# 推送
git push "https://$TOKEN@github.com/$REPO.git" main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🌐 接下来："
    echo "1. 访问 https://github.com/zplswf/dd"
    echo "2. Settings → Pages"
    echo "3. Source: main branch, / (root)"
    echo "4. Save"
    echo "5. 访问: https://zplswf.github.io/dd/"
else
    echo ""
    echo "❌ 推送失败"
    echo "可能原因："
    echo "1. Token无效或过期"
    echo "2. 没有仓库写入权限"
    echo "3. 网络问题"
fi