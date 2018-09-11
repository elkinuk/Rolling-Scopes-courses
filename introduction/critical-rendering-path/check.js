const exec = require('child_process').exec;
const psi = require('psi-local');

const port = Math.round(Math.random() * 1000) + 3000;
const runServerScript = `http-server . -p ${port}`;
const execProgram = exec(runServerScript);

psi(port).then(results => {
  if (results.err) console.log(results.err);

  const passing = +results.ruleGroups.SPEED.score;
  const failing = 100 - passing;

  console.log('\x1b[32m', `${passing} passing`);
  console.log('\x1b[31m', `${failing} failing`);

  execProgram.kill();
});
