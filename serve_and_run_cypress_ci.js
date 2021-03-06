const cypress = require('cypress');
const { spawn } = require('child_process');

const child = spawn('npm', ['run', 'dev']);

child.on('error', err => {
  console.log(err);
  process.exit(1);
});
child.stderr.on('data', data => console.log(data.toString()));
child.on('exit', code => console.log(`Child exitting with code ${code}`));

child.stdout.on('data', data => {
  const asString = data.toString();
  if (asString.includes('App running at')) {
    cypress
      .run({
        record: true,
      })
      .then(results => {
        const errorCode = results.failures >= 1 ? 1 : 0;
        child.kill();
        process.exit(errorCode);
      })
      .catch(() => {
        child.kill();
        process.exit(1);
      });
  }
});
