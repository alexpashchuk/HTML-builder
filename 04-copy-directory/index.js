const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const dirPathIn = path.join(__dirname, 'files');
const dirPathOut = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(dirPathOut, { recursive: true }, (err) => {
    if (err) throw err;
  });
  readdir(dirPathOut, { withFileTypes: true })
    .then((files) =>
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) throw err;
        });
      })
    )
    .then(() => {
      readdir(dirPathIn, { withFileTypes: true }).then((files) =>
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.join(__dirname, 'files', file.name),
              path.join(__dirname, 'files-copy', file.name),
              (err) => {
                if (err) throw err;
              }
            );
          }
        })
      );
    });
}
copyDir();
