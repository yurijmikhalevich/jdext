#!/usr/bin/env node
const fs = require('fs');

exports.extract = (jdsave, webm)=>{
  const j = fs.readFileSync(jdsave);
  if (j[512495]!=0 || j[512496]!=0x1A)
    throw new Error('cannot find JDSave video start byte, please report the issue here https://github.com/39dotyt/jdext/issues');
  const v = Buffer.from(j.buffer, 512496);
  fs.writeFileSync(webm, v);
};

if (module.parent)
  return;
if (process.argv.length < 4)
  return console.warn('not enought arguments\nexample: ./jdext.js JDSave_1 myvideo.webm');
exports.extract(process.argv[2], process.argv[3]);
