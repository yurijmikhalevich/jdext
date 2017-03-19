#!/usr/bin/env node
const fs = require('fs');

exports.extract = (jdsave, webm)=>{
  const j = fs.readFileSync(jdsave);
  if (j[512495]!=0 || j[512496]!=0x1A)
    throw new Error('cannot find video start byte');
  const v = Buffer.from(j.buffer, 512496);
  fs.writeFileSync(webm, v);
};

if (module.parent)
  return;
if (process.argv.length < 4)
  return console.warn('not enought arguments\nexample: ./jdext.js JDSave_1 myvideo.webm');
try {
  exports.extract(process.argv[2], process.argv[3]); }
catch(e){
  console.error(`${e.stack}\n\nplease copy log from above and report the issue here https://github.com/39dotyt/jdext/issues`);  }
