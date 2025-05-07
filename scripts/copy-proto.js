const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/proto');
const targetDir = path.join(__dirname, '../dist/proto');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy proto files
fs.copySync(sourceDir, targetDir, {
  filter: (src) => {
    return src.endsWith('.proto');
  },
});

console.log('Proto files copied successfully'); 