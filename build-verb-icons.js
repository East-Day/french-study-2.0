/* Local action pictograms. Exact meanings are matched only on verb entries. */
globalThis.buildVerbIcons=async function(fs,vm,base){
  const context=vm.createContext({});
  for(const file of ['data/vocabulary.js','core.js','pairs.js']) vm.runInContext(await fs.readFile(base+file,'utf8'),context);
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const path=d=>`<path d="${d}"/>`, circle=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/>`;
  const box=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  const arrow=path('M22 36h49m-10-10 10 10-10 10');
  const person=circle(30,16,7)+path('M30 23v20m0-10-15 9m15-9 14 7M30 43 19 61m11-18 14 18');
  const bowl=path('M16 38h64q-3 23-32 23T16 38');
  const pot=box(23,29,50,30)+path('M16 29h64M23 39H13m60 0h10');
  const heat=path('M33 21q-7-7 0-14M48 21q-7-7 0-14M63 21q-7-7 0-14');
  const heart=path('M48 54 19 30C7 6 39 1 48 19 59 0 89 8 77 30Z');
  const eye=path('M14 31q34-33 68 0-34 33-68 0Z')+circle(48,31,10);
  const lens=circle(39,29,19)+path('m54 44 22 19');
  const drawings={
    talk:person+path('M47 8h38v26H65L53 44V34h-6Z'),
    home:path('m12 31 36-25 36 25M22 26v37h52V26M41 63V42h14v21'),
    from:path('M16 14v48M14 15h24v17H16M40 40h40m-10-9 10 9-10 9'),
    love:heart,
    dislike:heart+path('m18 8 61 53'),
    prefer:circle(24,32,14)+path('m57 10 7 14 16 3-12 12 3 17-14-8-15 8 3-17-12-12 17-3Z'),
    listen:person+path('M58 15v30m0-24 18-5v24')+`<ellipse cx="52" cy="47" rx="6" ry="4"/><ellipse cx="70" cy="42" rx="6" ry="4"/>`,
    watch:box(29,8,56,34)+path('m48 16 14 9-14 9Z')+circle(18,45,7)+path('M7 64q11-20 24 0'),
    read:circle(48,13,8)+path('M48 34q-16-13-32-9v31q16-4 32 8 17-12 32-8V25q-16-4-32 9ZM48 34v30'),
    cards:box(17,11,31,47)+box(48,16,31,47)+path('m33 24 8 10-8 10-8-10Zm30 5 8 10-8 10-8-10Z'),
    game:path('M26 23h44q17 1 15 31-3 16-20-2H31Q10 74 11 49q1-26 15-26ZM27 31v16M19 39h16')+circle(65,35,3)+circle(75,43,3),
    draw:path('M15 59h66M21 47l6-14 32-26 11 13-32 26ZM27 33l11 13M20 56q20-13 42-1'),
    sing:person+circle(58,25,7)+path('m54 31-9 16M73 10v20m0-17 12-3')+circle(68,31,4),
    dance:circle(48,12,7)+path('M48 20v24m0-17L22 13M48 27l25-13M48 44 27 59m21-15 26 16'),
    shop:box(21,24,54,37)+path('M34 24V13q14-16 28 0v11M35 40h26m-13-8v17'),
    photo:box(29,20,56,35)+circle(58,37,11)+path('M42 20v-9h24v9')+person,
    travel:box(37,21,42,39)+path('M48 21V10h20v11M47 30v20M69 30v20M40 63h4m28 0h4M10 33h18m-8-8 8 8-8 8'),
    friends:person+`<g transform="translate(40 0)">${person}</g>`,
    walk:person+path('M51 41h31m-10-9 10 9-10 9'),
    run:circle(55,13,7)+path('M34 23 52 27l14 15h14M52 27 40 45l18 7-7 12M40 45 26 59H10M34 23 20 37M6 16h17M5 25h12'),
    relax:circle(48,12,7)+path('M48 19v22M48 29 30 42 16 35M48 29 66 42 80 35M48 41 23 58h50Z'),
    tools:path('M22 10q-9 26 15 25l30 28 9-9-29-29q5-26-18-18l10 10-8 10Z'),
    create:path('M31 40C0 9 66-9 65 24q0 12-13 17v13H34V41M36 60h14M76 10v14m-7-7h14'),
    rain:path('M16 29c-15-14 8-28 18-17 5-22 37-11 34 4 25-2 23 20 6 20H18M26 46l-6 13M47 46l-6 13M68 46l-6 13'),
    snow:path('M14 26c-8-16 13-24 23-15 10-20 37-8 32 6 22-1 22 19 3 19H18M28 44v19m-8-14 16 10m0-10-16 10M61 44v19m-8-14 16 10m0-10-16 10'),
    freeze:box(17,23,40,37)+path('m17 23 16-12 40 0-16 12M57 23l16-12v37L57 60M73 5v15m-7-12 14 9m0-9-14 9'),
    search:lens,
    found:lens+path('m28 29 9 9 14-20'),
    visit:eye+path('M29 58h38M35 54V43m13 11V43m13 11V43'),
    know:box(21,8,54,48)+path('M29 20h38M29 30h20m0 15 7 7 15-20'),
    go:arrow+path('M15 15v44M77 15v44'),
    come:path('M75 36H24m10-10L24 36l10 10M17 15v44'),
    ride:box(31,9,48,46)+box(37,15,36,20)+circle(42,47,3)+circle(67,47,3)+path('M38 55v8m34-8v8M7 36h18m-7-7 7 7-7 7'),
    turn:path('M24 62V33q0-17 20-17h33m-12-10 12 10-12 10'),
    continue:arrow+path('M8 36h7M81 36h7'),
    cross:path('M12 20h72M12 55h72M24 27v21m14-21v21m14-21v21m14-21v21M18 11h59m-9-7 9 7-9 7'),
    exit:box(13,8,35,55)+path('M34 35h49m-12-11 12 11-12 11'),
    depart:circle(18,35,5)+path('M28 35h53m-11-10 11 10-11 10M12 53h18'),
    arrive:path('M16 35h53m-10-10 10 10-10 10M79 13v48'),
    eat:circle(32,17,10)+path('M32 27v30m0-19 22-5 5-14M52 15h15M60 8v16')+bowl,
    drink:circle(28,17,9)+path('M28 26v34m0-23 25-3 7-12M53 10h23l-4 21H57ZM76 14h8v12h-9'),
    snack:circle(28,18,9)+path('M28 28v34m0-23 21-9 8 4')+circle(67,24,13)+circle(61,19,1)+circle(71,25,1)+circle(64,30,1),
    wash:path('M15 12h43v11H39v10H24V23h-9M31 38v9m12-9v9M20 54l18 10h29l16-12-23-2-11 5-21-11Z')+circle(65,30,5),
    peel:path('M26 54C1 14 57 5 61 37q3 15-16 23M52 14q32 24 15 35-12 8 1 14M27 19l19 18'),
    cut:path('M14 62h68M30 11h44v18H30ZM30 11l-13 9v9h13M49 35v18m-8-8 8 8 8-8')+box(33,55,32,7),
    add:bowl+path('M48 6v23m-9-9 9 9 9-9M70 7v13m-6-6h12'),
    stir:bowl+path('M48 39 66 7M23 25q25-19 49 0m-8-12 8 12-14 0'),
    pour:path('m23 7 32 19-16 23-30-18ZM19 13l-10 4 10 12M55 26q14 8 15 22')+box(51,49,29,15),
    break:path('M28 10h40v45H28ZM50 10 40 26l18 10-14 19M11 20l10 5M77 25l10-5M14 48l8-3'),
    cook:pot+heat,
    fry:path('M12 35h52v14q-26 22-52 0M64 38h24M24 18q-7-7 0-13M44 18q-7-7 0-13')+circle(38,39,8),
    boil:pot+heat+circle(36,43,4)+circle(57,47,5),
    grill:path('M16 22h65M16 32h65M16 42h65M24 17v31m16-31v31m16-31v31m16-31v31M27 63q-8-9 0-15M48 63q-8-9 0-15M69 63q-8-9 0-15'),
    oven:box(16,8,64,53)+box(24,25,48,28)+circle(29,16,2)+circle(42,16,2)+path('M40 45q-7-8 0-14m13 14q-7-8 0-14'),
    heat:pot+heat+path('M48 62v8'),
    cool:bowl+path('M48 6v21M38 11l20 12M58 11 38 23M77 9v21m-6-6 6 6 6-6'),
    beat:bowl+path('M47 40 62 6M40 37q-9-11 4-14 19-10 10 9M24 18l-9 6 10 5'),
    butter:path('M13 58h70L69 38H25ZM22 18h49v8H22ZM35 25l10 8M35 49h24m-7-7 7 7-7 7'),
    decorate:box(21,36,54,26)+path('M34 7 28 29l17-6ZM29 29l-5 9M57 14v15m-7-7h14M30 46q8 9 16 0t20 0'),
    grate:path('M34 11h33l10 43H23ZM41 19h4m8 0h4M37 29h4m12 0h4M33 39h4m16 0h4M28 63h6m10-2h5m8 3h5M12 14v26m-6-7 6 7 6-7'),
    drain:path('M19 12h58q0 26-29 26T19 12M30 44v15m18-15v20m18-20v15M9 64h78'),
    fill:path('M15 42q33-35 66 0-33 35-66 0ZM48 5v24m-8-8 8 8 8-8')+circle(37,42,3)+circle(49,42,3)+circle(60,42,3),
    blend:box(32,45,35,18)+path('M27 10h43l-7 35H34ZM70 16h12v19H66M37 22l21 13M58 22 37 35')+circle(49,54,3),
    season:path('m27 8 24 10-10 24-24-10ZM27 8l-3-5 24 10 3 5M48 43l5 6m6-8 5 6m-8 8 5 6')+bowl,
    serve:path('M14 40h68M23 40a25 25 0 0 1 50 0M44 11h8M48 11v4M12 56l21 7h34l13-10H45l-13-5Z'),
    waterbath:pot+box(34,18,28,29)+path('M25 42q8-7 16 0t16 0t14 0')+heat,
    place:box(34,9,28,23)+path('M48 35v18m-8-8 8 8 8-8M18 62h60'),
    have:box(39,9,30,24)+path('M12 48l20 15h35l16-15H50l-11 6-17-17Z'),
    want:person+path('M49 10h35v25H66L54 44V35h-5')+circle(67,22,6),
    can:person+path('m52 41 10 12 22-32')
  };
  // Each pair is [drawing, concise caption, exact meanings]. Conjugations share the same meaning.
  const rules=[
    ['talk','叫作','叫作'],['home','居住','居住'],['from','来自','来自'],['talk','说话','说话|说法语'],
    ['love','喜欢','喜欢'],['love','非常喜欢','非常喜欢'],['dislike','讨厌','讨厌'],['prefer','更喜欢','更喜欢'],
    ['listen','听音乐','听音乐'],['watch','看电影','看电影'],['watch','看剧集','看剧集'],['read','读书','读书'],['read','读小说','读小说'],
    ['cards','打牌','打牌'],['game','玩游戏','玩电子游戏'],['draw','画画','画画'],['sing','唱歌','唱歌'],['dance','跳舞','跳舞'],
    ['cook','做饭','做饭'],['shop','购物','购物|购买|买食品或日用品'],['photo','拍照','拍照'],['travel','旅行','旅行'],
    ['friends','朋友外出','和朋友外出'],['walk','散步','散步'],['relax','放松','放松'],['tools','修补手工','做手工或修修补补'],
    ['create','创作','创作'],['walk','走路','走路'],['run','跑步','跑步'],['rain','下雨','下雨'],['snow','下雪','下雪'],['freeze','结冰','结冰'],
    ['found','发现','发现；了解'],['visit','参观','参观'],['know','认识了解','认识；了解|认识、了解'],['search','寻找','寻找'],['found','找到','找到'],
    ['go','去','去'],['come','来','来'],['ride','乘坐','乘坐；走某条路'],['turn','转弯','转弯'],['continue','继续','继续'],['cross','穿过','穿过'],
    ['exit','出去','出去'],['depart','出发','出发'],['arrive','到达','到达'],['eat','吃','吃'],['drink','喝','喝'],['snack','吃零食','吃零食；零碎地吃'],
    ['wash','清洁','清洁'],['wash','清洗','清洗'],['wash','冲洗','冲洗'],['peel','削皮','削皮|去皮'],['cut','切','切'],['add','加入','加入'],
    ['stir','混合搅拌','混合搅拌|搅动'],['pour','倒入','倒入'],['break','打破','打破'],['cook','烹煮','烹煮|把……煮熟'],['fry','油炸煎','油炸；煎'],
    ['boil','煮沸','煮沸'],['grill','烧烤','烧烤；烤制'],['oven','烘烤','烘烤肉类等'],['heat','加热','加热'],['heat','重新加热','重新加热'],
    ['cool','冷却','使冷却'],['beat','搅打','打散；搅打'],['butter','涂黄油','涂黄油'],['decorate','装饰','装饰'],['grate','擦丝','擦成丝或碎屑'],
    ['drain','沥干','沥干'],['fill','填馅','填馅'],['blend','机器搅打','用机器搅打'],['season','放盐','放盐'],['season','放胡椒','放胡椒'],
    ['serve','上菜','上菜；供应'],['waterbath','隔水加热','隔水加热'],['place','放置','放置'],['have','有','有'],['want','想要','想要'],['can','能可以','能、可以']
  ];
  const lookup=new Map();rules.forEach(([kind,label,meanings],index)=>meanings.split('|').forEach(meaning=>lookup.set(meaning,{kind,label,index})));
  const map={},audit=[],unmatched=[],written=new Set();
  await fs.mkdir(base+'assets/icons/verbs',{recursive:true});
  for(const entry of context.FRENCH_VOCAB.entries){
    if(!/动词|^v\./.test(entry.pos))continue;
    const rule=lookup.get(entry.zh);
    if(!rule){unmatched.push({id:entry.id,fr:entry.fr,zh:entry.zh});continue;}
    const {kind,label,index}=rule,file='assets/icons/verbs/action-'+index+'.svg';
    if(!written.has(file)){
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><title>${esc(label)}</title><g fill="none" stroke="#276354" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${drawings[kind]}</g><text x="48" y="85" text-anchor="middle" fill="#174c43" font-family="Microsoft YaHei,PingFang SC,sans-serif" font-size="13" font-weight="600">${esc(label)}</text></svg>`;
      await fs.writeFile(base+file,svg,'utf8');written.add(file);
    }
    map[entry.id]={file,source:'verb',label};audit.push({id:entry.id,fr:entry.fr,zh:entry.zh,file});
  }
  await fs.writeFile(base+'data/verb-icons.js','/* Generated from verb meanings; noun and non-verb entries are excluded. */\nglobalThis.FRENCH_VERB_ICONS = '+JSON.stringify(map,null,2)+';\n','utf8');
  await fs.writeFile(base+'data/verb-icons-audit.json',JSON.stringify({mapped:audit,unmatched},null,2),'utf8');
  return {mapped:audit.length,files:written.size,unmatched};
};
