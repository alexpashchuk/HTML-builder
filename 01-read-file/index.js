const path = require('path');
const fs = require('fs');
const { stdout } = process;

const ReadStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

ReadStream.on('data', (data) => {
  stdout.write(data);
});

ReadStream.on('error', (error) => {
  console.log(error.message);
});
