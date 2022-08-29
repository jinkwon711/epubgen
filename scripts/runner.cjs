const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const chalk = require('chalk');

const tests = path.resolve(__dirname, '../dist/tests');
console.log(chalk.blue`{bold Running all tests in} ${tests}\n`);



let passed = 0, failed = 0;
fs.readdirSync(tests).filter(file => file.endsWith('.js')).forEach(file => {
  console.log(chalk`\n{bold Executing test} ${file}`);
  const ret = spawnSync('node', ['-r', 'source-map-support/register', '--unhandled-rejections=strict', path.resolve(tests, file)], {
    stdio: 'inherit',
  });
  if (ret.status === 0) {
    console.log(chalk.green`Test ${file} ran`);
    passed++;
  } else {
    console.log(chalk.red.bold`Test ${file} failed: exit ${ret.status}`);
    failed++;
  }
});

console.log(chalk`\n\nTests: {green.bold ${passed} ran}, {red.bold ${failed} failed}`);
console.log('Please verify EPUBs and logs');
if (failed)
  process.exit(failed);