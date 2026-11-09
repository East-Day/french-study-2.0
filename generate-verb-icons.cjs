// Optional maintenance: node scripts/generate-verb-icons.cjs
const fs=require('node:fs/promises'),path=require('node:path'),vm=require('node:vm');
(async()=>{
  const base=path.resolve(__dirname,'..')+path.sep,context=vm.createContext({});
  vm.runInContext(await fs.readFile(path.join(__dirname,'build-verb-icons.js'),'utf8'),context);
  console.log(await context.buildVerbIcons(fs,vm,base));
})().catch(error=>{console.error(error);process.exitCode=1;});
