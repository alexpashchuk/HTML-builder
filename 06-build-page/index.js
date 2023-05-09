const fs = require('fs');
const path = require('path');
const { copyFile, mkdir, readdir, rm, readFile, writeFile } = require('fs/promises');

const distFolder = path.join(__dirname, 'project-dist');
const curAssetsPath = path.join(__dirname, 'assets');
const distAssetsPath = path.join(distFolder, 'assets');

async function createPage() {
  await rm(distFolder, { recursive: true, force: true });
  await mkdir(path.join(__dirname, 'project-dist'));

  // styles
  const stylesOut = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'), 'utf-8');
  const stylesIn = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  for (let file of stylesIn) {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      input.on('data', (data) => stylesOut.write(data));
    }
  }

  // html
  let htmlTemplate = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const componentFiles = await readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  for (let file of componentFiles) {
    if (file.isFile() && path.extname(path.join(__dirname, 'components', file.name)) === '.html') {
      let htmlFile = await readFile(path.join(__dirname, 'components', file.name), 'utf-8');
      const tagHtml = `{{${file.name.split('.')[0]}}}`;
      htmlTemplate = htmlTemplate.replaceAll(tagHtml, htmlFile);
    }
  }
  await writeFile(path.join(__dirname, 'project-dist/index.html'), htmlTemplate);

  // copy
  async function copyDir(cur, dist) {
    const assetFiles = await readdir(cur, { withFileTypes: true });
    await mkdir(dist, { recursive: true });
    for (let file of assetFiles) {
      if (file.isDirectory()) {
        await copyDir(path.join(cur, file.name), path.join(dist, file.name));
      } else {
        await copyFile(path.join(cur, file.name), path.join(dist, file.name));
      }
    }
  }
  await copyDir(curAssetsPath, distAssetsPath);
}
createPage();
