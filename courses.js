(function(root){
  'use strict';
  const v=root.FRENCH_VOCAB,c=root.FrenchCore,source=root.FRENCH_UNIT5_SOURCE;
  const previousVersion=v.version+'-paired-v1';
  const removed=new Set(v.entries.filter(e=>/^T186R/.test(e.sourceRef||'')||/动词变位/.test(e.pos)).map(e=>e.id));
  v.entries=v.entries.filter(e=>!removed.has(e.id)).map(e=>({...e,course:'manual'}));
  v.categories=v.categories.map(cat=>({...cat,course:'manual',label:cat.id==='12'?'核心语法与数字':cat.label}));
  v.courses=[{id:'manual',label:'原手册 · 分类复习'},...source.lessons.map(l=>({id:l.id,label:l.zh+' · '+l.title}))];
  v.coursePatterns=Object.fromEntries(source.lessons.map(l=>[l.id,l.patterns||[]]));
  v.source='外教法语课分类复习手册.docx、法语第五单元_穿衣与气氛.json';
  v.version+='-u5-v1';
  const split=raw=>{
    const s=raw.normalize('NFC').trim().replace(/[’‘]/g,"'");
    const m=s.match(/^(un |une |des |le |la |les |l')(.+)$/i);
    return m?{article:m[1].trim(),fr:m[2]}:{article:null,fr:s};
  };
  const nounForm=(raw,gender,number)=>{
    const p=split(raw), inferred=['une','la'].includes(p.article)?'f':['un','le'].includes(p.article)?'m':null;
    const known=source.lessons.flatMap(l=>l.groups.flatMap(g=>g.items)).filter(i=>i.gender&&i.fr)
      .map(i=>({fr:split(i.fr).fr,gender:i.gender})).filter(i=>p.fr===i.fr||p.fr.startsWith(i.fr+' ')).sort((a,b)=>b.fr.length-a.fr.length)[0];
    const g=gender||inferred||known?.gender||null;
    const plural=number==='plural'||['des','les'].includes(p.article);
    const definite=plural?'les':/^[aeiouyàâéèêëîïôùûüœ]/i.test(p.fr)?"l'":g==='f'?'la':g==='m'?'le':null;
    return {fr:p.fr,gender:g,number:plural?'plural':'singular',article:p.article||definite,
      articles:[...new Set([p.article,definite,plural?'des':g==='f'?'une':g==='m'?'un':null].filter(Boolean))]};
  };
  for(const lesson of source.lessons) lesson.groups.forEach((group,gi)=>{
    const category=lesson.id+'-g'+(gi+1);
    v.categories.push({id:category,label:group.category,course:lesson.id});
    group.items.forEach((item,ii)=>{
      const id=category+'-i'+(ii+1), ref=lesson.id+'/'+group.category+'/'+(ii+1);
      const common={id,course:lesson.id,category,subcategory:group.category,zh:item.zh,sourceRef:ref,
        sourceRaw:JSON.stringify(item),note:'课件页码：'+group.slides,accepted:[],formHint:'',article:null,gender:null,genderMode:'none'};
      if(group.type==='adjective'){
        const same=c.normalize(item.masculine)===c.normalize(item.feminine);
        const mk=(fr,formGender)=>({...common,id:same?id:id+'-'+formGender,fr,pos:'形容词',genderMode:'adjective',
          formGender:same?null:formGender,formHint:same?'阴阳同形，只填写一次':formGender==='m'?'请写阳性形式':'请写阴性形式',
          accepted:(item.alsoAccept||[]).filter(a=>typeof a==='string')});
        v.entries.push(mk(item.masculine,'m'));if(!same)v.entries.push(mk(item.feminine,'f'));
        return;
      }
      const noun=group.type==='noun'||(group.type!=='number'&&Boolean(split(item.fr).article));
      if(noun){
        let gender=item.gender;
        if(item.fr==='des bottes de motard'){
          gender='f';common.note+='。源文件将此项标为阳性，但同文件 bottes 为阴性；按中心词 bottes 修正为阴性。';
          v.issues.push({sourceRef:ref,original:item.fr,detail:'gender=m 与同文件 bottes=f 冲突，导入按中心词 bottes 使用阴性。'});
        }
        const main=nounForm(item.fr,gender,item.number);
        const variants=(item.alsoAccept||[]).map(a=>nounForm(a,null,item.number));
        const genders=new Set([main.gender,...variants.map(a=>a.gender)].filter(Boolean));
        const both=main.fr==='styliste'&&genders.size>1;
        v.entries.push({...common,...main,pos:'名词',gender:both?null:main.gender,genderMode:both?'none':'fixed',
          formHint:both?'人物称谓阴阳同形；本题只检查拼写':main.number==='plural'?'请写复数形式':'',
          articles:both?[...new Set([...main.articles,...variants.flatMap(a=>a.articles)])]:main.articles,
          accepted:variants.filter(a=>a.gender===main.gender||both||!a.gender).map(a=>a.fr),
          acceptedForms:variants,
          note:common.note+(both?'。阴阳两性均可；原文接受 un styliste / une styliste。':'')});
      }else v.entries.push({...common,fr:item.fr,pos:group.type==='number'?'数词':'表达',accepted:item.alsoAccept||[]});
    });
  });
  const validCourses=new Set(['all',...v.courses.map(x=>x.id)]);
  const categoriesFor=course=>v.categories.filter(x=>course==='all'||x.course===course);
  const inCourse=(e,course)=>Boolean(e)&&(!course||course==='all'||e.course===course);
  const makeRound=c.makeRound,restore=c.restoreState;
  c.makeRound=(entries,options={},rng)=>({...makeRound(entries.filter(e=>inCourse(e,options.course)),options,rng),course:options.course||'all'});
  c.restoreState=(raw,entries,version)=>{
    let s;try{s=typeof raw==='string'?JSON.parse(raw):raw;s=s?JSON.parse(JSON.stringify(s)):s;}catch{return restore(raw,entries,version);}
    if(s?.dataVersion===previousVersion){
      s.dataVersion=version;
      if(s.round&&Array.isArray(s.round.ids)&&Array.isArray(s.round.results)&&Number.isInteger(s.round.index)){
        const r=s.round;r.index=r.ids.slice(0,r.index).filter(id=>!removed.has(id)).length;
        r.ids=r.ids.filter(id=>!removed.has(id));r.results=r.results.filter(x=>!removed.has(x.entryId));
      }
    }
    const result=restore(s,entries,version);
    result.settings.course='all'; // Unified selector; retain the existing round and records.
    if(result.settings.category!=='all'&&!categoriesFor(result.settings.course).some(x=>x.id===result.settings.category))result.settings.category='all';
    return result;
  };
  root.FrenchCourses={categoriesFor,inCourse,validCourses,removedIds:[...removed]};
})(globalThis);
