/* Conservative exact-word whitelist. No category, Chinese-meaning or grammar fallback.
 * Add only an unambiguous visual; absent entries intentionally have no icon.
 */
(function(root) {
  const normalize=s=>String(s||'').normalize('NFC').toLowerCase().trim().replace(/[’‘]/g,"'");
  const groups=[
    ['😴','sommeil|somnolent|avoir sommeil'],['😨','peur|effrayé|avoir peur'],['😡','colère|fâché|être en colère'],
    ['🍽️','faim|avoir faim'],['🥤','soif|avoir soif'],['🥶','froid'],['🥵','chaud'],
    ['😊','heureux|content|joyeux'],['😢','triste'],['🤒','malade'],['😟','inquiet'],['😲','choqué'],['😍','amoureux'],
    ['👨','homme'],['👩','femme'],['🧒','enfant'],
    ['📓','cahier'],['📖','livre'],['🎒','cartable|sac à dos'],['🖊️','stylo'],['✏️','crayon'],['🖍️','feutre'],
    ['📏','règle'],['✂️','ciseaux|paire de ciseaux'],['🧽','éponge'],['🪑','chaise'],
    ['📱','téléphone portable'],['💻','ordinateur portable'],['🔑','clé'],['👓','lunettes|paire de lunettes'],['🕶️','lunettes de soleil'],
    ['☂️','parapluie'],['📷','appareil photo'],['⌚','montre'],['🧳','valise'],['💊','médicament'],['⛸️','patin|patins|patinage'],
    ['⚽','football|foot'],['🏀','basket-ball|basket'],['🏐','volley-ball'],['🎾','tennis'],['🏸','badminton'],['🏓','ping-pong'],
    ['⛳','golf'],['🏉','rugby'],['⚾','baseball'],['🏊','natation'],['🚴','cyclisme'],['🚲','vélo'],['⛷️','ski'],['🏂','snowboard'],
    ['🧘','yoga'],['🧗','escalade'],['🤺','escrime'],['🏹','tir à l’arc'],['🥋','arts martiaux|judo'],['🏇','équitation'],['🏄','surf'],
    ['🌅','matin'],['🌙','nuit'],['☀️','soleil|ensoleillé'],['❄️','neige|neiger'],['🌧️','pluie|pleuvoir'],['☁️','nuage|nuageux'],
    ['⛈️','orage'],['🌫️','brouillard'],['⚡','éclair'],['🌈','arc-en-ciel'],['💧','goutte|eau'],['🌡️','température'],['🧊','glaçon'],
    ['🏰','château'],['⛪','église'],['🏨','hôtel'],['🏦','banque'],['🏥','hôpital'],['🏫','école|collège'],['🚉','gare'],['🚏','arrêt de bus'],
    ['🚇','métro'],['🚌','bus'],['🚊','tramway|tram'],['🚆','train|TER'],['🚄','TGV'],['🚗','voiture'],['🚕','taxi'],
    ['🏍️','moto'],['🛵','scooter'],['🛴','trottinette'],['✈️','avion'],['🚁','hélicoptère'],['🚚','camion'],['🚀','fusée'],['🐎','cheval'],
    ['🍅','tomate'],['🥔','pomme de terre'],['🧅','oignon'],['🥗','salade'],['🥕','carotte'],['🫑','poivron'],['🫛','petit pois'],
    ['🧄','ail|gousse d’ail'],['🍆','aubergine'],['🍄','champignon'],['🥦','brocoli'],['🥒','concombre'],['🌽','maïs'],
    ['🍊','orange'],['🍎','pomme'],['🍐','poire'],['🍌','banane'],['🍓','fraise'],['🍑','pêche'],['🍍','ananas'],['🍇','raisin'],
    ['🍋','citron'],['🍉','pastèque'],['🍈','melon'],['🥝','kiwi'],['🍒','cerise'],['🥑','avocat'],['🥥','noix de coco|coco'],['🥭','mangue'],
    ['🥩','steak|bifteck'],['🐟','poisson'],['🍔','hamburger'],['🍚','riz'],['🍝','pâtes'],['🥚','œuf|œufs'],['🥛','lait'],
    ['🧀','fromage'],['🧈','beurre'],['🧂','sel'],['☕','café'],['🍵','thé'],['🍫','chocolat'],['🍯','miel'],
    ['🥪','sandwich'],['🍰','gâteau'],['🥧','tarte'],['💶','euro'],['🥄','cuillère'],['🔪','couteau|couteaux'],['🧹','balai']
  ];
  const byWord={};
  for(const [emoji,words] of groups) for(const word of words.split('|')) byWord[normalize(word)]={emoji};
  // Coffee-shop sense is not represented by a cup; country/language/profession symbols are omitted.
  byWord['07:café']=null;
  for(const [words,svg] of [['petit|petite','small'],['grand|grande','big'],['haut|haute','tall'],['bas|basse','short']])
    for(const word of words.split('|')) byWord[word]={svg};
  const byEntry={};
  function resolve(entry) {
    if(root.FRENCH_UNIT5_ICONS?.[entry.id]) return root.FRENCH_UNIT5_ICONS[entry.id];
    if(root.FRENCH_VERB_ICONS?.[entry.id]) return root.FRENCH_VERB_ICONS[entry.id];
    if(root.FRENCH_NOUN_ICONS?.[entry.id]) return root.FRENCH_NOUN_ICONS[entry.id];
    const word=normalize(entry.pair?.m.fr||entry.fr), scoped=entry.category+':'+word;
    const visual=Object.hasOwn(byEntry,entry.id)?byEntry[entry.id]:Object.hasOwn(byWord,scoped)?byWord[scoped]:byWord[word];
    return visual?{...visual,source:'meaning'}:null;
  }
  for(const entry of root.FRENCH_VOCAB?.entries||[]) {
    if(entry.pair) byEntry[entry.pair.f.id]=resolve(entry);
  }
  root.FRENCH_ICONS={byWord,byEntry,resolve};
})(globalThis);
