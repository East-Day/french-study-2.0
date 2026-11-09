/* Explicit, source-order meaning mapping. Run with buildUnit5Icons(fs, base, vocabulary). */
globalThis.buildUnit5Icons = async function(fs, base, vocabulary) {
  const groups = {
    'u5-s1-g1':['👕','👚👖','🚪','👕','👖','👕','🧶','🧥','👚','👔','👖','👖','skirt','👗','shorts','👖','🧥','🧥','🧥','🪶','🌧️','🩲','🩲','👙','🧦','🧦'],
    'u5-s1-g2':['💍','👞','👟','👢','👞','🩴','👠','🩴','🧣','🧣','🎩','🧢','🧶','👓','🕶️','⌚','🧤','belt','☂️','👜','🎒'],
    'u5-s1-g3':['#df3c42','#3e80d3','#41965d','#282c30','#f58e34','#ffffff','#8a9096','#85573d','#f3cc40','#f1a6bd','#9663c2','#e7d7b5','#203e78'],
    'u5-s1-g4':['✨','🛋️','🎩','👕','✨','💰','🌟','🌸'],
    'u5-s1-g5':['leather','velvet','🧶','👢','✨','🏷️'],
    'u5-s1-g6':['👕','👖','🪞','🛍️','🤲','🏬','🔎','💶❔','💸','🪞✔','🛍️✔','＝','👚❤️','🚪👕'],
    'u5-s1-g7':['✨','runway','🚶','runway','✂️','✏️','🪡','🖼️','👗👔','📈','🚩','👀','✍️','📷','👗🌙','👕☀️'],
    'u5-s2-g1':['🎤','🎸','🎤','🎷','🎻','🎛️','🎤','🎸','🎸','🪕','🎸','🤠','🎛️','🎸','📜'],
    'u5-s2-g2':['🎵','🎸','🎹','🎻','🥁','🎸','🎷','🎺','flute','clarinet','🪗','harp','trombone','cello','banjo','ukulele','xylophone','tambourine','triangle'],
    'u5-s2-g3':['😄','🎉','👥','⚡','🤗','🥂','😌','😊','💕','✨','😆','🤩','🧐','👍','🌟'],
    'u5-s2-g4':['😢','🥱','😰','😣','😬','😟','😨','🌧️','😖','🔊','👎'],
    'u5-s2-g5':['❔','🌿','🤫','🙂'],
    'u5-s2-g6':['💬','🏛️','🎼','🎧','💿','🎤','📋🎵','👨🎵','👩🎵','👨🎤','👥🎵','🎼','💻','📜','🎪','🏆','🥂','🎂','🎭','🎟️','🎭','🪁'],
    'u5-s2-g7':['🎵','❤️🎵','🎟️❔','💬','🕰️❔','👥🎉','👥👥','🥵','👥🎤','😂','🚶','👂⚡','🎭'],
    'u5-s2-g8':['100','101','200','1k','10k','20k','100k','1M']
  };
  const drawings = {
    skirt:'<path d="M24 10h24l10 32H14z"/><path d="M25 17h22M29 20l-3 18m10-18v18m7-18 3 18"/>',
    shorts:'<path d="M21 10h30l3 31H38l-2-16-2 16H18z"/><path d="M22 17h28"/>',
    belt:'<rect x="8" y="20" width="56" height="13" rx="3"/><rect x="27" y="17" width="18" height="19" rx="3"/><path d="M36 26h8"/>',
    leather:'<path d="m21 9 13 4 16-4 6 9-5 11 5 12-19-3-17 4-6-12 5-10z"/><path d="m22 21 9-2m8 9 8 4m-21 0 6 2"/>',
    velvet:'<path d="M15 11q9 6 21 0t21 0v29q-10-6-21 0t-21 0z"/><path d="M24 18v17m10-20v17m11-17v18"/>',
    runway:'<path d="m26 16-13 27h46L46 16z"/><circle cx="36" cy="8" r="4"/><path d="m36 12-5 14h10zm-3 14-3 12m9-12 3 12"/>',
    flute:'<path d="m13 35 43-23 3 5-43 23z"/><path d="m23 31 1 2m7-6 1 2m7-6 1 2m7-6 1 2"/>',
    clarinet:'<path d="m34 7-3 27-6 9h22l-6-9-3-27z"/><path d="M34 17h4m-5 6h6m-6 6h6"/>',
    harp:'<path d="M18 8q25 0 36 10L43 43H18z"/><path d="M24 13v26m7-25v25m7-22v22m7-20v15"/>',
    trombone:'<path d="M13 20h36v17H21V26h34M49 20l13-8v17z"/><path d="M21 32h27"/>',
    cello:'<path d="M34 4h4v14q13 2 5 11 13 14-7 14T29 29q-8-9 5-11z"/><path d="M36 8v39m-15-22 32 8"/>',
    banjo:'<circle cx="30" cy="32" r="12"/><path d="m35 22 16-18 4 4-17 18M25 36l12-12"/>',
    ukulele:'<path d="m36 23 13-17 5 4-15 17q8 13-5 17T21 33q-4-10 7-11z"/><circle cx="32" cy="30" r="3"/>',
    xylophone:'<path d="M13 12v25h7V12zm12 4v24h7V16zm12 4v23h7V20zm12 4v20h7V24zM17 7l34 33"/>',
    tambourine:'<ellipse cx="36" cy="26" rx="24" ry="16"/><ellipse cx="36" cy="26" rx="17" ry="10"/><path d="M13 23v7m46-7v7M32 11h8m-8 30h8"/>',
    triangle:'<path d="M41 42H13L36 7l23 35H49M45 24l17 12"/>'
  };
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const map={};
  await fs.mkdir(base+'assets/icons/unit5',{recursive:true});
  for(const e of vocabulary.entries.filter(e=>e.course!=='manual')) {
    const index=Number(e.id.match(/-i(\d+)/)[1])-1, symbol=groups[e.category]?.[index];
    if(!symbol) throw new Error('Missing explicit icon: '+e.id);
    const label=e.zh.replace(/^(一件|一身|一家|一双|一种|一名|一个|一张|一首|一份|一场)/,'').split(/[（、，]/)[0];
    const caption=label.length>6?label.slice(0,5)+'…':label;
    const picture=drawings[symbol]?`<g fill="#c4e4d7" stroke="#256453" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round">${drawings[symbol]}</g>`:
      symbol.startsWith('#')?`<circle cx="36" cy="25" r="18" fill="${symbol}" stroke="#718278"/>`:
      `<text x="36" y="36" text-anchor="middle" font-size="${Array.from(symbol).length>4?24:30}" font-family="Segoe UI Emoji,Apple Color Emoji,sans-serif">${esc(symbol)}</text>`;
    const file='assets/icons/unit5/'+e.id.replace(/-m$/,'')+'.svg';
    await fs.writeFile(base+file,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 64"><title>${esc(e.zh)}</title>${picture}<text x="36" y="59" text-anchor="middle" font-size="10" fill="#285347" font-family="Microsoft YaHei,sans-serif">${esc(caption)}</text></svg>\n`,'utf8');
    map[e.id]={file,source:'unit5',meaning:e.zh};if(e.pair)map[e.pair.f.id]=map[e.id];
  }
  await fs.writeFile(base+'data/unit5-icons.js','// Explicit meaning icons; maintained in scripts/build-unit5-icons.js\nglobalThis.FRENCH_UNIT5_ICONS = '+JSON.stringify(map,null,2)+';\n','utf8');
  return {cards:vocabulary.entries.filter(e=>e.course!=='manual').length, mappings:Object.keys(map).length};
};
