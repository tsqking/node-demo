const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');

const extensionsList = [
  'steoates.autoimport',
  'hookyqr.beautify',
  'coenraads.bracket-pair-colorizer',
  'dsznajder.es7-react-js-snippets',
  'dbaeumer.vscode-eslint',
  'esbenp.prettier-vscode',
  'johnsoncodehk.volar',
  'zhuangtongfa.material-theme',
  'pkief.material-icon-theme',
  'yzhang.markdown-all-in-one',
  'rohinivsenthil.postcode'
];

const execCommand = (command, args, cwd) => {
  const options = {
    stdio: [process.stdin, process.stdout, process.stderr]
  };
  cwd && Object.assign(options, { cwd });

  const sp = spawn.sync(command, args, options);

  if (sp.error) {
    console.error('command exec fail', sp.error);
    process.exit(1);
  }
};

const install = () => {
  let list;
  const vscodeExtPath = path.resolve(__dirname, '../.vscodeExt.json');
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = require(packageJsonPath);
  if (fs.existsSync(vscodeExtPath)) {
    list = require(vscodeExtPath);
  } else if (packageJson.vscodeExt) {
    list = packageJson.vscodeExt;
  } else {
    list = extensionsList;
  }
  list.forEach((e) => {
    execCommand('code', ['--install-extension', e]);
  });
};

install();
