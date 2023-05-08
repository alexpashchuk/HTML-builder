const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'), 'utf-8');

readdir(path.join(__dirname, 'styles'), { withFileTypes: true }).then((files) =>
  files.forEach((file) => {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
      readableStream.on('data', (data) => writableStream.write(data));
    }
  })
);
