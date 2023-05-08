const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'message.txt'), 'utf-8');

stdout.write('Hello! Enter message, please:\n');
stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    process.exit();
  }
  output.write(data);
});

process.on('exit', () => stdout.write('Thanks! Good luck!'));
process.on('SIGINT', () => process.exit());
