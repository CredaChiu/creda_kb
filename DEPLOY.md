# 部署指南

本项目可以通过两种方式部署到 GitHub Pages：

## 方法一：使用 GitHub Actions 自动部署

1. 确保您的代码已经推送到 GitHub 仓库的 `main` 分支
2. GitHub Actions 会自动构建项目并部署到 `gh-pages` 分支
3. 在 GitHub 仓库设置中，确保 GitHub Pages 设置为从 `gh-pages` 分支的根目录提供服务

## 方法二：手动部署

如果您想手动部署，可以按照以下步骤操作：

1. 构建项目：
   ```bash
   npm run build
   ```

2. 进入构建输出目录：
   ```bash
   cd dist/spa
   ```

3. 创建 `.nojekyll` 文件（防止 GitHub Pages 忽略以下划线开头的文件）：
   ```bash
   touch .nojekyll
   ```

4. 创建 `404.html` 文件以支持 SPA 路由：
   ```bash
   echo '<!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title>Keycaps Collection</title>
       <script type="text/javascript">
         // 单页应用的 GitHub Pages 重定向
         var pathSegmentsToKeep = 1;
         var l = window.location;
         l.replace(
           l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "") +
           l.pathname.split("/").slice(0, 1 + pathSegmentsToKeep).join("/") + "/?/" +
           l.pathname.slice(1).split("/").slice(pathSegmentsToKeep).join("/").replace(/&/g, "~and~") +
           (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
           l.hash
         );
       </script>
     </head>
     <body>
       <h1>重定向中...</h1>
     </body>
   </html>' > 404.html
   ```

5. 初始化 Git 仓库并提交文件：
   ```bash
   git init
   git add -A
   git commit -m "Deploy to GitHub Pages"
   ```

6. 推送到 GitHub Pages 分支：
   ```bash
   git push -f https://github.com/credachiu/creda_kb.git master:gh-pages
   ```

7. 返回项目根目录：
   ```bash
   cd ../..
   ```

## 故障排除

如果您在访问 GitHub Pages 网站时遇到 "The site configured at this address does not contain the requested file" 错误，请检查以下几点：

1. 确保 GitHub Pages 设置正确，应该从 `gh-pages` 分支的根目录提供服务
2. 确保 `index.html` 文件存在于 `gh-pages` 分支的根目录
3. 确保 `.nojekyll` 文件存在于 `gh-pages` 分支的根目录
4. 确保 `quasar.config.js` 中的 `publicPath` 设置为 `/creda_kb/`（或您的仓库名）
5. 等待几分钟，GitHub Pages 部署可能需要一些时间生效
