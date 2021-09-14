const fs = require('fs-extra');
const path = require('path');

const remove = () => {
  const resultPath = path.resolve(__dirname, '../result');
  const reportPath = path.resolve(__dirname, '../report');

  fs.existsSync(resultPath) && fs.removeSync(resultPath);
  fs.existsSync(reportPath) && fs.removeSync(reportPath);
};

remove();
