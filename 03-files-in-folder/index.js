const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        const fileSize = +stats.size / 1024;
        console.log(
          String(file.name).split('.')[0] +
            ' - ' +
            path.extname(path.join(__dirname, 'secret-folder', file.name)).slice(1) +
            ' - ' +
            fileSize.toFixed(3) +
            'kb'
        );
      });
    }
  });
});
