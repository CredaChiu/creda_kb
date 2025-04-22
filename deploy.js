import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确保 dist/spa 目录存在
const distPath = path.join(__dirname, 'dist', 'spa');
if (!fs.existsSync(distPath)) {
  console.error('构建目录不存在，请先运行 npm run build');
  process.exit(1);
}

// 部署到 GitHub Pages
try {
  // 初始化一个新的 git 仓库
  execSync('git init', { cwd: distPath });

  // 添加所有文件
  execSync('git add -A', { cwd: distPath });

  // 提交更改
  execSync('git commit -m "Deploy to GitHub Pages"', { cwd: distPath });

  // 推送到 GitHub Pages 分支
  // 请将 YOUR_USERNAME 替换为您的 GitHub 用户名，REPO_NAME 替换为您的仓库名
  execSync('git push -f https://github.com/credachiu/creda_kb.git master:gh-pages', { cwd: distPath });

  console.log('部署成功！');
} catch (error) {
  console.error('部署失败:', error.message);
  process.exit(1);
}
