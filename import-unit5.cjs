// Optional maintenance: node scripts/import-unit5.cjs (no dependencies).
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');
(async()=>{
  const base=path.resolve(__dirname,'..')+path.sep;
  const raw=JSON.parse(await fs.readFile(base+'法语第五单元_穿衣与气氛.json','utf8'));
  await fs.writeFile(base+'data/unit5-source.js','globalThis.FRENCH_UNIT5_SOURCE = '+JSON.stringify(raw,null,2)+';\n');
  const context=vm.createContext({});
  for(const file of ['data/vocabulary.js','core.js','data/unit5-source.js','courses.js','pairs.js','scripts/build-unit5-icons.js'])
    vm.runInContext(await fs.readFile(base+file,'utf8'),context,{filename:file});
  console.log(await context.buildUnit5Icons(fs,base,context.FRENCH_VOCAB));
})().catch(error=>{console.error(error);process.exitCode=1;});
