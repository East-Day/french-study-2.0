// Optional maintenance command: node scripts/generate-noun-icons.cjs
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');
(async()=>{
  const base=path.resolve(__dirname,'..')+path.sep;
  const context=vm.createContext({});
  vm.runInContext(await fs.readFile(path.join(__dirname,'build-noun-icons.js'),'utf8'),context);
  console.log(await context.buildNounIcons(fs,vm,base));
})().catch(error=>{console.error(error);process.exitCode=1;});
