#!/bin/bash

# 构建项目
npm run build

# 进入构建输出目录
cd dist/spa

# 创建 .nojekyll 文件（防止 GitHub Pages 忽略以下划线开头的文件）
touch .nojekyll

# 初始化 git 仓库
git init
git add -A
git commit -m 'deploy to gh-pages'

# 推送到 GitHub Pages 分支
# 请将 credachiu/creda_kb 替换为您的 GitHub 用户名和仓库名
git push -f https://github.com/credachiu/creda_kb.git master:gh-pages

cd -
