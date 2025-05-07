const fs = require('fs-extra');
const path = require('path');

// Ensure proto directories exist
const srcProtoDir = path.join(__dirname, '../src/proto');
const distProtoDir = path.join(__dirname, '../dist/proto');

// Clean up any existing generated files
fs.removeSync(path.join(srcProtoDir, 'src'));
fs.removeSync(path.join(srcProtoDir, '*_pb.js'));

// Ensure directories exist
fs.ensureDirSync(srcProtoDir);
fs.ensureDirSync(distProtoDir);

// Copy proto files to dist
fs.copySync(srcProtoDir, distProtoDir, {
  filter: (src) => {
    return src.endsWith('.proto');
  },
});

console.log('Proto directory structure set up successfully'); 