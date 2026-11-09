/* Deterministic local SVG artwork, generated from the shared vocabulary.
 * Run buildNounIcons(fsPromises, nodeVm, projectDirectory) in the maintenance runner.
 */
globalThis.buildNounIcons = async function(fs, vm, base) {
  const context=vm.createContext({});
  for(const file of ['data/vocabulary.js','core.js','pairs.js','data/vocabulary-icons.js'])
    vm.runInContext(await fs.readFile(base+file,'utf8'),context);
  const vocab=context.FRENCH_VOCAB, core=context.FrenchCore;
  const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const line=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}"/>`;
  const rect=(x,y,w,h,r=3)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
  const circle=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/>`;
  const text=(s,x=48,y=80,size=13)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="#174c43" stroke="none" font-family="Microsoft YaHei,PingFang SC,sans-serif" font-size="${size}" font-weight="600">${escape(s)}</text>`;
  const drawings={
    identity:()=>rect(19,16,58,42)+circle(34,31,6)+'<path d="M25 49q9-16 18 0M50 29h18M50 38h18M50 47h12"/>',
    person:()=>circle(48,24,10)+'<path d="M26 59v-8c0-19 44-19 44 0v8Z"/>',
    friends:()=>circle(32,25,8)+circle(64,25,8)+'<path d="M17 56v-8q15-20 30 0v8M49 56v-8q15-20 30 0v8M39 42l18 0"/>',
    globe:()=>circle(48,34,25)+'<ellipse cx="48" cy="34" rx="11" ry="25"/>'+line(23,34,73,34)+'<path d="M28 20q20 12 40 0M28 48q20-12 40 0"/>',
    speech:()=>'<path d="M18 13h60v38H42L28 62V51H18Z"/>'+text('Aa',48,40,22),
    emotion:()=>circle(48,33,25)+circle(39,27,2)+circle(57,27,2)+'<path d="M34 43q14 12 28 0"/>',
    book:()=>'<path d="M48 58q-17-9-31-4V15q17-5 31 4q14-9 31-4v39q-16-5-31 4ZM48 19v39M23 27h17M23 36h17M56 27h17M56 36h17"/>',
    eraser:()=>'<path d="M24 51 13 40l30-29 28 28-18 18H30ZM28 25l28 28M53 57h29"/>',
    pouch:()=>rect(13,22,70,33,8)+'<path d="M18 31h60M65 31v8M25 17h46"/>',
    sharpener:()=>'<path d="M25 12h45v45H25Z"/>'+circle(47,32,12)+line(39,23,54,41)+circle(47,32,2),
    glue:()=>rect(32,23,32,37)+rect(30,12,36,11)+line(32,50,64,50),
    board:()=>rect(12,12,72,39)+line(48,51,48,62)+line(27,62,69,62)+'<path d="M23 24h40M23 34h24"/>',
    desk:()=>rect(12,22,72,10)+line(20,32,20,59)+line(76,32,76,59)+rect(51,32,25,15),
    calculator:()=>rect(28,8,40,54)+rect(34,14,28,12)+[34,45,56].map(x=>[34,45,56].map(y=>rect(x,y,5,4,1)).join('')).join(''),
    pencil:()=>'<path d="m21 57 5-18 33-29 13 14-33 29ZM26 39l13 14M57 12l13 14M21 57l9-2"/>',
    bottle:()=>'<path d="M38 9h20v12l8 9v29H30V30l8-9Z"/>'+line(38,15,58,15)+rect(34,34,28,16),
    wallet:()=>rect(15,21,65,35)+rect(60,32,24,15)+circle(68,39,2),
    headphones:()=>'<path d="M20 39V30a28 28 0 0 1 56 0v9"/>'+rect(15,32,12,25,5)+rect(69,32,12,25,5),
    shirt:()=>'<path d="m30 12-19 16 12 14 9-7v26h32V35l9 7 12-14-19-16-10 6H40Z"/>',
    mat:()=>'<path d="M20 24h59L65 59H8Z"/>'+circle(77,22,8)+'<path d="m25 34 41 0M21 44h41"/>',
    box:()=>'<path d="m18 22 30-12 30 12v31L48 65 18 53ZM18 22l30 12 30-12M48 34v31M33 16l30 12"/>',
    music:()=>'<path d="M36 49V18l34-7v33M36 25l34-7"/><ellipse cx="26" cy="51" rx="10" ry="7"/><ellipse cx="60" cy="46" rx="10" ry="7"/>',
    art:()=>'<path d="M75 34c0-32-57-33-57 0 0 25 25 30 30 18 4-9 27 2 27-18Z"/>'+circle(31,26,3)+circle(44,18,3)+circle(59,24,3)+line(65,45,80,60),
    stage:()=>rect(12,12,72,48)+'<path d="M12 12q35 7 0 38M84 12q-35 7 0 38M20 60V48h56v12"/>',
    film:()=>rect(12,15,72,43)+line(12,25,84,25)+line(12,48,84,48)+[22,38,54,70].map(x=>line(x,15,x,25)+line(x,48,x,58)).join(''),
    game:()=>'<path d="M28 24h40q17 1 17 25 0 17-18 2H29Q8 68 11 49q1-24 17-25Z M25 33v16M17 41h16"/>'+circle(65,36,3)+circle(75,43,3),
    runner:()=>circle(56,15,7)+'<path d="m35 24 18 3 12 15h14M53 27 42 44l17 9-8 12M42 44 27 59H12M35 24 20 39"/>',
    weights:()=>line(20,35,76,35)+rect(12,20,9,30)+rect(22,25,8,20)+rect(75,20,9,30)+rect(66,25,8,20),
    balls:()=>circle(30,38,14)+circle(62,32,14)+circle(66,57,4),
    boat:()=>'<path d="M11 43h74L70 60H25ZM48 8v35M43 13 22 38h21M53 14l22 24H53"/>',
    calendar:()=>rect(16,14,64,46)+line(16,27,80,27)+'<path d="M31 8v13M65 8v13"/>',
    clock:()=>circle(48,34,26)+'<path d="M48 15v19l15 9"/>',
    sun:()=>circle(48,33,15)+[0,45,90,135,180,225,270,315].map(a=>`<path transform="rotate(${a} 48 33)" d="M48 7v6"/>`).join(''),
    ticket:()=>'<path d="M14 18h68v13a7 7 0 0 0 0 14v13H14V45a7 7 0 0 0 0-14ZM61 18v40"/>',
    poster:()=>rect(23,8,50,54)+rect(29,15,38,24)+'<path d="M29 46h38M29 54h24"/>',
    coin:()=>circle(48,34,25)+text('€',48,44,30),
    cake:()=>rect(20,35,56,25)+'<path d="M20 41q8 10 16 0t16 0t24 0M36 35V20M60 35V20M34 14l2-6 2 6M58 14l2-6 2 6"/>',
    seasons:()=>'<path d="M48 9v51M22 34h52"/>'+circle(34,21,7)+'<path d="m60 15 8 8-8 7-7-7ZM30 44l8 8-8 7M58 45l12 12M70 45 58 57"/>',
    wind:()=>'<path d="M12 24h48q18-17 0-17M12 35h64q16 17-2 19M23 46h21q14 17-4 17"/>',
    compass:()=>circle(48,34,26)+'<path d="m55 16-3 24-15 12 4-24Z"/>',
    map:()=>'<path d="m10 16 25-7 26 7 25-7v44l-25 7-26-7-25 7ZM35 9v44M61 16v44"/>',
    road:()=>'<path d="m34 9-20 53M62 9l20 53M48 12v10M48 29v10M48 46v12"/>',
    buildings:()=>rect(12,26,23,36)+rect(38,10,22,52)+rect(63,32,21,30)+[18,44,69].map(x=>line(x,39,x+9,39)+line(x,48,x+9,48)).join(''),
    river:()=>'<path d="M34 9c-30 18 42 20 12 50M57 9c-30 18 42 20 12 50M12 45l8-10 8 10M72 19l7-8 7 8"/>',
    tree:()=>'<path d="M48 59V32M48 32l-11-7M48 42l12-9"/><path d="M27 39C4 29 28 4 41 16 50-3 80 14 65 28 87 44 52 55 45 42 38 49 28 47 27 39Z"/>',
    church:()=>'<path d="M14 59V31l17-15 17 15v28M48 59V35h34v24M31 16V4M25 9h12"/>'+rect(24,43,14,16)+circle(31,31,4),
    museum:()=>'<path d="m10 23 38-17 38 17ZM12 59h72M16 53h64M21 28v25M39 28v25M57 28v25M75 28v25"/>',
    shop:()=>'<path d="M15 24h66l-7-13H22ZM15 24q8 15 16 0 8 15 17 0 8 15 17 0 8 15 16 0M19 33v28h58V33"/>'+rect(27,40,18,21)+rect(53,40,16,12),
    pool:()=>'<path d="M10 43q9-8 18 0t18 0t18 0t22 0M10 56q9-8 18 0t18 0t18 0t22 0M28 32V15q0-12 10-5M52 32V15q0-12 10-5M28 21h24M28 30h24"/>',
    pin:()=>'<path d="M48 62C7 26 31 4 48 9c23-5 39 20 0 53Z"/>'+circle(48,29,8),
    meal:()=>circle(48,35,23)+circle(48,35,15)+'<path d="M12 10v22M7 10v13h10V10M12 32v28M84 10v50M84 10q-15 23 0 24"/>',
    glass:()=>'<path d="M28 12h40l-6 48H34ZM31 29h34M59 12l6-10h12"/>',
    leaf:()=>'<path d="M28 54C-2 18 45 5 73 15 80 49 48 67 28 54ZM22 62l40-39M38 44l-4-16M48 35l16 0"/>',
    root:()=>'<path d="M32 25q-16 10 16 37 33-28 16-37-13-9-32 0ZM48 24V8M48 15 36 7M48 17 61 6M39 36h12M45 47h9"/>',
    florets:()=>circle(30,25,12)+circle(47,16,12)+circle(65,26,13)+'<path d="M25 35q21 35 47 0M48 37v24"/>',
    pod:()=>'<path d="M15 53C9 10 58 4 81 14 76 48 50 67 15 53ZM15 53 81 14"/>'+circle(31,42,5)+circle(46,33,5)+circle(61,24,5),
    stalk:()=>'<path d="M28 60 36 14l7-7 5 7-6 46M49 60l8-44 8-7 6 7-8 44M30 39l14 0M53 37h13"/>',
    fruit:()=>'<path d="M48 21C10-1 9 55 34 60c11 4 15-5 25 0 24 0 31-59-11-39ZM48 21V8q14-7 21 1-12 10-21 8"/>',
    berry:()=>[ [48,16],[35,27],[61,27],[24,39],[48,39],[72,39],[35,51],[61,51],[48,59] ].map(([x,y])=>circle(x,y,8)).join(''),
    citrus:()=>circle(48,34,26)+circle(48,34,20)+[0,60,120,180,240,300].map(a=>`<path transform="rotate(${a} 48 34)" d="M48 34v-19"/>`).join(''),
    nut:()=>'<path d="M48 8C9 20 22 63 48 61 75 62 86 20 48 8ZM48 16c-16 10-16 27 0 36M53 19q12 15 0 27"/>',
    meat:()=>'<path d="M22 49C1 28 33 8 58 12c38 4 30 49 1 45-17-2-26 5-37-8Z"/>'+circle(60,31,9)+'<path d="M23 32q12-15 25-9M28 45q9-9 18-7"/>',
    ribs:()=>'<path d="M19 25q28-19 58 0v26q-28 18-58 0Z M29 20v36M42 17v43M55 17v43M68 20v36"/>',
    drumstick:()=>'<path d="M57 40c34-25-8-52-25-21-10 17 5 29 15 27l16 15q8 6 11-3 9-4 1-11Z"/>',
    sausage:()=>'<path d="m19 20-7-7M76 51l9 8M25 16c-10-5-19 6-13 16 18 34 49 38 65 23 9-9 0-20-9-14-18 11-35-3-43-25Z"/>',
    skewer:()=>'<path d="M15 61 79 7"/>'+rect(25,36,16,16)+rect(45,18,16,16),
    bread:()=>'<path d="M17 55C0 22 35 10 60 9c23-2 32 35 9 46Z M27 23l10 12M43 17l10 12M59 14l10 12"/>',
    jar:()=>rect(26,20,44,40,6)+rect(24,10,48,10)+rect(33,32,30,17),
    bag:()=>'<path d="M27 11h42l-4 11 10 38H21l10-38ZM31 22h34"/>'+rect(32,33,32,17),
    cube:()=>'<path d="m23 23 25-13 25 13v29L48 64 23 52ZM23 23l25 14 25-14M48 37v27"/>',
    bowl:()=>'<path d="M14 30h68q-2 31-34 31-31 0-34-31ZM25 18q-8-6 0-13M47 20q-8-6 0-13M67 18q-8-6 0-13"/>',
    pan:()=>'<path d="M10 29h51v18q-25 23-51 0ZM61 32h26M20 20h31"/>',
    pot:()=>rect(24,25,48,34,6)+'<path d="M19 25h58M30 19h36M43 19v-6h10v6M24 35H12v13h12M72 35h12v13H72"/>',
    cup:()=>'<path d="M19 19h46v29q-23 25-46 0ZM65 25h14q12 21-14 18M15 62h57"/>',
    goblet:()=>'<path d="M27 9h42v18q0 19-21 19T27 27ZM48 46v16M32 62h32"/>',
    spoon:()=>'<ellipse cx="48" cy="22" rx="13" ry="17"/><path d="M45 39v22h6V39"/>',
    fork:()=>'<path d="M34 7v21q14 15 28 0V7M43 7v22M53 7v22M45 39v23h7V39"/>',
    oven:()=>rect(18,8,60,55)+rect(25,27,46,28)+circle(29,17,3)+circle(43,17,3)+circle(65,17,3)+line(35,34,61,34),
    fridge:()=>rect(25,6,46,58)+line(25,27,71,27)+line(33,15,33,22)+line(33,35,33,49),
    whisk:()=>'<path d="M43 7h10v23c28 31-37 49-23 10l13-10M43 30c-17 37 27 37 10 0M48 30v32"/>',
    strainer:()=>'<path d="M17 22h62q0 36-31 36T17 22ZM10 22H3M79 22h14"/>'+[30,42,54,66].map(x=>[30,39,48].map(y=>circle(x,y,1)).join('')).join(''),
    spatula:()=>'<path d="M31 8h34v26l-12 8v20H43V42l-12-8ZM39 15v15M48 15v15M57 15v15"/>',
    apron:()=>'<path d="M37 8q11-10 22 0v12l15 13v29H22V33l15-13ZM37 8v12h22M35 40h26v13H35Z"/>',
    cloth:()=>'<path d="m18 11 57 5-6 45-57-5ZM23 12l-5 43M65 16l-5 43M16 23l56 5M14 46l57 5"/>',
    scale:()=>'<path d="M48 9v50M17 60h62M16 20h64M25 20 12 42h26ZM71 20 58 42h26Z"/>',
    measure:()=>'<path d="M25 9h42v52H25ZM27 19h20M27 29h12M27 39h20M27 49h12"/>',
    checklist:()=>rect(22,9,52,54)+'<path d="m28 22 4 4 7-9M45 22h21M28 36h10M45 36h21M28 49h10M45 49h21"/>',
    camera:()=>rect(12,21,72,38,6)+circle(48,40,14)+circle(48,40,8)+'<path d="M27 21V12h27v9"/>',
    basket:()=>'<path d="M12 28h72L72 60H24ZM28 28l12-18M68 28 56 10M35 38v13M48 38v13M61 38v13"/>',
    question:()=>circle(48,34,26)+'<path d="M38 23q1-17 17-9 15 10-7 23v8"/>'+circle(48,53,1),
    frequency:()=>'<path d="M22 27q18-29 47-4l5 7M74 14v16H58M74 45Q55 74 27 50l-5-7M22 59V43h16"/>',
    exit:()=>rect(18,8,33,54)+'<path d="M36 35h48M72 24l12 11-12 11"/>',
    sports:()=>circle(48,34,25)+'<path d="m48 21 12 9-5 15H40l-5-15ZM48 21V9M35 30 24 25M40 45 32 55M55 45l9 10M60 30l12-5"/>',
    pieces:()=>rect(14,25,24,24)+rect(47,15,14,14)+rect(65,34,18,18),
    hand:()=>'<path d="M23 43V20q0-9 7-4v20V10q4-8 9 0v26V8q6-8 10 0v28V14q6-7 10 0v29l8-11q10-5 7 7L60 61H35Z"/>',
    abstract:()=>rect(20,10,56,49,9)+'<path d="M29 22h38M29 32h24M29 42h31"/>'
  };
  const rules=[
    [/店|商店|商场|市场|超市|书店|药店|理发店|美容院|修鞋铺|加油站/, 'shop'],
    [/师|商人|商贩|店主|药剂师|人员|经营者|供应者|制作或销售者|书商|花商|肉商|鱼贩|顾客|修鞋匠|法国女性|大学生|一个人/, 'person'],
    [/职业|商$|商；/, 'person'],[/朋友|邻居/, 'friends'],[/姓|名字|身份证/, 'identity'],[/国籍|国家/, 'globe'],[/法语/, 'speech'],[/情绪/, 'emotion'],
    [/问题|难题/, 'question'],[/物品/, 'box'],[/爵士/, 'music'],[/运动|休闲活动|^活动$/, 'sports'],[/出口|外出活动/, 'exit'],[/频率/, 'frequency'],
    [/火腿|培根|牛排/, 'meat'],[/甜点/, 'cake'],[/食材|配料/, 'basket'],[/烹煮/, 'pot'],[/一撮|一把/, 'hand'],[/一块|一片/, 'pieces'],[/用具|厨具/, 'fork'],[/购物|采购/, 'basket'],[/照片/, 'camera'],
    [/笔袋|化妆包/, 'pouch'],[/橡皮/, 'eraser'],[/卷笔刀/, 'sharpener'],[/胶棒/, 'glue'],[/铅笔/, 'pencil'],
    [/写字板|黑板|白板/, 'board'],[/桌|办公室/, 'desk'],[/计算器/, 'calculator'],[/钱包/, 'wallet'],[/水壶|瓶/, 'bottle'],[/耳机|头盔/, 'headphones'],
    [/衣服/, 'shirt'],[/运动垫/, 'mat'],[/杂志|阅读|小说|漫画|图书馆|指南/, 'book'],[/绘画|展览/, 'art'],[/音乐|说唱|歌剧/, 'music'],
    [/戏剧|剧院|演出|舞蹈/, 'stage'],[/电影|剧集|场次/, 'film'],[/游戏/, 'game'],[/跑步|慢跑|田径|徒步/, 'runner'],[/力量训练|健身/, 'weights'],[/滚球/, 'balls'],[/帆船|船/, 'boat'],
    [/小时|分钟|一刻钟|时刻/, 'clock'],[/生日|周年纪念/, 'cake'],[/价格|欧分/, 'coin'],[/海报/, 'poster'],[/约会|约定/, 'friends'],
    [/年|周|月|日期|日程|假期|一天|^日$/, 'calendar'],[/中午|下午|早晨|天空/, 'sun'],[/晚上|晚会/, 'stage'],
    [/季节|春天|夏天|秋天|冬天|天气/, 'seasons'],[/风/, 'wind'],[/度|温度/, 'measure'],[/冰冻/, 'fridge'],[/^北$|^南$|^东$|^西$|方向/, 'compass'],
    [/目的地|地址/, 'pin'],[/旅行|出发|到达|行程|地区|地图|平面图/, 'map'],[/城市|市中心|街区|广场/, 'buildings'],[/街道|大道|路线|^路/, 'road'],
    [/公园|花园/, 'tree'],[/河流|河岸|码头|乡村/, 'river'],[/教堂|主教座堂|宗座圣殿/, 'church'],[/纪念物|名胜建筑|博物馆/, 'museum'],
    [/游泳池|溜冰场/, 'pool'],[/餐馆|咖啡馆|茶馆|酒吧|邮局|机场|咨询处/, 'shop'],[/标志牌/, 'poster'],[/交通|拼车/, 'road'],
    [/饮料|汽水|果汁|橙汁/, 'glass'],[/饭|早餐|午餐|晚餐|食物|饮食|前菜|菜肴|点心|零食/, 'meal'],
    [/菜花/, 'florets'],[/芦笋|韭葱|芹菜/, 'stalk'],[/四季豆/, 'pod'],[/萝卜|芜菁|甜菜/, 'root'],[/南瓜|西葫芦/, 'fruit'],
    [/洋蓟|卷心菜|甘蓝|菠菜|菊苣|蔬菜/, 'leaf'],[/覆盆子|黑莓/, 'berry'],[/葡萄柚|小柑橘/, 'citrus'],[/杏仁|干果/, 'nut'],[/杏|无花果|李子|水果/, 'fruit'],
    [/肋排|小排/, 'ribs'],[/腿肉|羊腿|鸡肉|翅肉/, 'drumstick'],[/香肠/, 'sausage'],[/肉串/, 'skewer'],[/肉|禽类/, 'meat'],[/面包/, 'bread'],
    [/酸奶|奶油|果酱|胡椒/, 'jar'],[/面粉|谷物/, 'bag'],[/糖/, 'cube'],[/油/, 'bottle'],[/清汤|高汤|汤/, 'bowl'],[/薄饼|面团/, 'meal'],
    [/食谱|清单|步骤|练习|准备/, 'checklist'],[/公斤|克/, 'scale'],[/毫升|升|数量/, 'measure'],[/罐头|^罐$|容器/, 'jar'],
    [/高脚杯/, 'goblet'],[/有柄杯/, 'cup'],[/^杯$/, 'glass'],[/纸盒|包/, 'box'],[/碗/, 'bowl'],[/汤匙|茶匙|汤勺/, 'spoon'],
    [/叉子|刀叉|餐具/, 'fork'],[/深锅|炖锅/, 'pot'],[/平底/, 'pan'],[/滤盆|漏勺/, 'strainer'],[/烤箱|微波炉/, 'oven'],[/冰箱|冷冻柜/, 'fridge'],
    [/打蛋器|搅拌器/, 'whisk'],[/围裙/, 'apron'],[/抹布/, 'cloth'],[/刮刀|锅铲/, 'spatula'],[/盘|器皿/, 'meal']
  ];
  const iconMap={}, audit=[];
  await fs.mkdir(base+'assets/icons/nouns',{recursive:true});
  for(const entry of vocab.entries) {
    const noun=entry.pair?.m || entry;
    if(!core.isNoun(noun) || context.FRENCH_ICONS.resolve(entry)) continue;
    let label=entry.zh.split(/[；，、；]/)[0].replace(/法国初中/,'初中');
    let kind=/专.*名/.test(noun.pos)?'globe':rules.find(([re])=>re.test(entry.zh))?.[1] || 'abstract';
    // Exact wording inside every pictogram distinguishes specific senses within a family.
    const lines=label.match(/.{1,5}/gu)||['名词'];
    const caption=lines.slice(0,2).map((s,i)=>text(s,48,lines.length>1?77+i*13:84,lines.length>1?11:13)).join('');
    const extra=kind==='calendar'?text(label.match(/周[一二三四五六日]|[一二三四五六七八九十]+月/)?.[0]||'日历',48,48,14):
      kind==='person'?text('人',48,58,12):kind==='shop'?text('店',63,57,12):'';
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><title>${escape(entry.zh)}</title><g fill="#f7faf7" stroke="#276354" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${drawings[kind]()}${extra}</g>${caption}</svg>`;
    const file='assets/icons/nouns/'+entry.id.replace(/[^a-z0-9-]/gi,'_')+'.svg';
    await fs.writeFile(base+file,svg,'utf8');
    const visual={file,source:'noun',label:entry.zh};
    iconMap[entry.id]=visual;
    if(entry.pair) iconMap[entry.pair.f.id]=visual;
    audit.push({id:entry.id,fr:entry.fr,zh:entry.zh,kind,file});
  }
  await fs.writeFile(base+'data/noun-icons.js','/* Generated by scripts/build-noun-icons.js; same vocabulary IDs. */\nglobalThis.FRENCH_NOUN_ICONS = '+JSON.stringify(iconMap,null,2)+';\n','utf8');
  await fs.writeFile(base+'data/noun-icons-audit.json',JSON.stringify(audit,null,2),'utf8');
  return {generated:audit.length,abstract:audit.filter(e=>e.kind==='abstract').map(e=>e.fr+'='+e.zh),nouns:vocab.entries.filter(e=>core.isNoun(e.pair?.m||e)).length};
};
