const path = require('path');
const { readdir, copyFile, rm, mkdir } = require('fs/promises');

async function copyDir() {
  const dirPathIn = path.join(__dirname, 'files');
  const dirPathOut = path.join(__dirname, 'files-copy');

  try {
    await rm(dirPathOut, { recursive: true, force: true });
    await mkdir(dirPathOut, { recursive: true });
    const files = await readdir(dirPathIn, { withFileTypes: true });
    files.forEach((file) => {
      if (file.isFile()) {
        copyFile(path.join(dirPathIn, file.name), path.join(dirPathOut, file.name));
      }
    });
  } catch (err) {
    console.log(err);
  }
}
copyDir();
