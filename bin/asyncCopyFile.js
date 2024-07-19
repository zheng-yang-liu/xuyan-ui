const fs = require('fs').promises;
const path = require('path');

// 删除文件或文件夹
async function removeDirectory(directory) {
  const items = await fs.readdir(directory);
  
  await Promise.all(items.map(async item => {
    const filePath = path.join(directory, item);
    const stat = await fs.lstat(filePath);

    if (stat.isDirectory()) {
      await removeDirectory(filePath);
      await fs.rmdir(filePath);
    } else {
      await fs.unlink(filePath);
    }
  }));
}

async function copyDirectory(source, destination) {
  // 确保目标文件夹存在
  await fs.mkdir(destination, { recursive: true });

  // 清空目标文件夹
  await removeDirectory(destination);

  // 读取源目录中的所有项目
  const items = await fs.readdir(source);

  // 使用Promise.all来等待所有复制操作完成
  await Promise.all(items.map(async item => {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);
    const stat = await fs.lstat(sourcePath);

    if (stat.isDirectory()) {
      // 递归复制目录
      await copyDirectory(sourcePath, destinationPath);
    } else {
      // 复制文件
      await fs.copyFile(sourcePath, destinationPath);
    }
  }));
}
//E:\WEB\Develop-by-yourself\xuyan-ui-development\packages

//E:\WEB\Develop-by-yourself\xuyan-ui-showcase\node_modules\yanyan-ui
// 示例用法
(async () => {
  try {
    const sourceFolder = path.join('E:', 'WEB', 'Develop-by-yourself', 'xuyan-ui-development', 'packages');
    const destinationFolder = path.join('E:', 'WEB', 'Develop-by-yourself', 'xuyan-ui-showcase', 'node_modules', 'yanyan-ui');

    await copyDirectory(sourceFolder, destinationFolder);

    console.log(`所有文件和文件夹已经从 ${sourceFolder} 复制到 ${destinationFolder}。`);
  } catch (error) {
    console.error('发生错误:', error);
  }
})();
