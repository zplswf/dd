#!/bin/bash

# 通过GitHub API直接上传文件
# 需要GITHUB_TOKEN环境变量

echo "📤 GitHub API上传脚本"
echo "====================="

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ 请设置GITHUB_TOKEN环境变量"
    echo "export GITHUB_TOKEN=你的GitHub_Token"
    exit 1
fi

REPO="zplswf/dd"
API_URL="https://api.github.com/repos/$REPO"

echo "仓库: $REPO"
echo ""

# 检查仓库访问
echo "🔍 检查仓库访问..."
curl -s -H "Authorization: token $GITHUB_TOKEN" "$API_URL" | grep -q '"name"' && echo "✅ 仓库可访问" || echo "❌ 仓库访问失败"

echo ""
echo "📁 准备上传文件..."
echo ""

# 上传函数
upload_file() {
    local file=$1
    local path=$2
    local content=$(base64 -w 0 "$file")
    
    echo "上传: $file → $path"
    
    curl -s -X PUT -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "$API_URL/contents/$path" \
        -d "{
            \"message\": \"添加 $file\",
            \"content\": \"$content\"
        }" | grep -q '"commit"' && echo "✅ 成功" || echo "❌ 失败"
}

# 上传核心文件
upload_file "index.html" "index.html"
upload_file "game.js" "game.js"
upload_file "README.md" "README.md"
upload_file "test_local.html" "test_local.html"

echo ""
echo "🎉 文件上传完成！"
echo "访问: https://github.com/zplswf/dd"
echo ""
echo "🚀 启用GitHub Pages："
echo "1. 仓库页面 → Settings → Pages"
echo "2. Source: main branch, / (root) folder"
echo "3. Save"
echo "4. 等待后访问: https://zplswf.github.io/dd/"
echo ""
echo "📊 上传统计："
echo "文件数: 4"
echo "仓库: https://github.com/zplswf/dd"
echo "在线游戏: https://zplswf.github.io/dd/"