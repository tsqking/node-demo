const path = require('path');
const fs = require('fs-extra');
const request = require('request');

const download = () => {
  const url = 'https://nodejs.org/dist/v14.17.6/node-v14.17.6-x64.msi';
  const dowloadPath = path.resolve(__dirname, '../download');
  if (!fs.existsSync(dowloadPath)) {
    fs.mkdirSync(dowloadPath);
  }

  const fileName = path.basename(url);
  const filePathTemp = path.join(dowloadPath, `${fileName}.tmp`);
  const filePath = path.join(dowloadPath, fileName);

  const fileStream = fs
    .createWriteStream(filePathTemp)
    .on('error', (e) => {
      console.error('error', e);
    })
    .on('finish', () => {
      console.log(`${fileName} download complete`);
      fs.renameSync(filePathTemp, filePath);
    });

  request.get(url).pipe(fileStream);
};

download();
