const mongoose = require('mongoose');
const db = require('../config/database')
const readLine = require('readline');

const SloganSchema = mongoose.Schema({
  slogan: {
    type: String,
    required: true,
    unique: true
  },
  validAnswers: {
    type: Array,
    required: true
  },
  almostValidAnswers: {
    type: Array,
    required: true
  }
});

const rl = readLine.createInterface(process.stdin, process.stdout);
const connection = mongoose.createConnection(db.database);
const Slogan = connection.model('Slogan', SloganSchema);

function insertData(array) {
  array.map( (slogan, index) => {

  const newSlogan = new Slogan(slogan);

  newSlogan.save( (err, res) => {
    if (err) {
      console.log(err);
      return
    }

    if (index + 1 === array.length) {
      process.exit()
    }
  })
});
}

rl.setPrompt('Select which slogans to import: \n 1: English \n 2: Polish \n >>>>');

rl.prompt();
rl.on('line', function(line) {
  if (line === '1') {
    insertData(englishSlogansArray);
  } else if (line === '2') {
    insertData(polishSlogansArray);
  } else if (line === 'exit') {
    process.exit(0);
  } else {
    console.log('Wrong input');
    process.exit(0);
  }
  console.log('Done');
  rl.prompt();
}).on('close',function(){
  process.exit(0);
});


const polishSlogansArray = [
  {
    slogan: 'domek z kart',
    validAnswers: ['domek z kart', 'dom z kart'],
    almostValidAnswers: ['karciany dom', 'domek karciany']
  },
  {
    slogan: 'odkurzacz',
    validAnswers: ['odkurzacz'],
    almostValidAnswers: ['odkużacz', 'odkuracz', 'pochłaniacz kurzu']
  },
  {
    slogan: 'stara panna',
    validAnswers: ['stara panna'],
    almostValidAnswers: ['stara', 'panna', 'pani', 'kobieta']
  },
  {
    slogan: 'gang',
    validAnswers: ['gang'],
    almostValidAnswers: ['mafia', 'przestępcy']
  },
  {
    slogan: 'klatka schodowa',
    validAnswers: ['klatka schodowa'],
    almostValidAnswers: ['schody', 'klatka']
  },
  {
    slogan: 'akwarium',
    validAnswers: ['akwarium'],
    almostValidAnswers: ['akwrium', 'akwarim']
  },
  {
    slogan: 'unia europejska',
    validAnswers: ['unia europejska'],
    almostValidAnswers: ['unia', 'europejska']
  },
  {
    slogan: 'miś pluszowy',
    validAnswers: ['miś pluszowy'],
    almostValidAnswers: ['miś', 'pluszowy']
  },
  {
    slogan: 'cztery strony świata',
    validAnswers: ['cztery strony świata'],
    almostValidAnswers: ['cztery', 'strony', 'świata']
  },
  {
    slogan: 'akacje',
    validAnswers: ['akacje'],
    almostValidAnswers: ['akcje', 'akcja']
  },
  {
    slogan: 'koń trojański',
    validAnswers: ['koń trojański'],
    almostValidAnswers: ['koń', 'trojański', 'troja']
  },
  {
    slogan: 'anakonda',
    validAnswers: ['anakonda'],
    almostValidAnswers: ['ankonda', 'wąż']
  },
  {
    slogan: 'antywirus',
    validAnswers: ['antywirus'],
    almostValidAnswers: ['wirus', 'trojan']
  },
  {
    slogan: 'świnka morska',
    validAnswers: ['świnka morska'],
    almostValidAnswers: ['świnka', 'morska']
  },
  {
    slogan: 'western',
    validAnswers: ['western'],
    almostValidAnswers: ['zachód', 'gatunek']
  },
  {
    slogan: 'mydlane oczy',
    validAnswers: ['mydlane oczy'],
    almostValidAnswers: ['mydlane', 'oczy']
  },
  {
    slogan: 'czarna porzeczka',
    validAnswers: ['czarna porzeczka'],
    almostValidAnswers: ['czarna', 'porzeczka']
  },
  {
    slogan: 'różowe okulary',
    validAnswers: ['różowe okulary'],
    almostValidAnswers: ['różowe', 'okulary']
  },
  {
    slogan: 'godzina duchów',
    validAnswers: ['godzina duchów'],
    almostValidAnswers: ['godzina', 'duchy', 'duchów']
  },
  {
    slogan: 'alaska',
    validAnswers: ['alaska'],
    almostValidAnswers: ['alska', 'laska']
  },
  {
    slogan: 'ekran',
    validAnswers: ['ekran'],
    almostValidAnswers: ['monitor', 'tv']
  },
  {
    slogan: 'awaria systemu',
    validAnswers: ['awaria systemu'],
    almostValidAnswers: ['awaria', 'system']
  },
  {
    slogan: 'program telewizyjny',
    validAnswers: ['program telewizyjny'],
    almostValidAnswers: ['program', 'telewizyjny']
  },
  {
    slogan: 'nabić kogoś w butelkę',
    validAnswers: ['nabić kogoś w butelkę'],
    almostValidAnswers: ['nabić kogoś', 'nabić kogoś w', 'butelka']
  },
  {
    slogan: 'cały dom na głowie',
    validAnswers: ['cały dom na głowie'],
    almostValidAnswers: ['cały dom', 'głowa', 'dom na głowie', 'cały']
  },
  {
    slogan: 'uniwersytet',
    validAnswers: ['uniwersytet'],
    almostValidAnswers: ['uniwrsytet', 'uczelnia']
  },
  {
    slogan: 'kłamca',
    validAnswers: ['kłamca'],
    almostValidAnswers: ['kłamczuch', 'ściemniacz']
  },
  {
    slogan: 'kosiarz umysłów',
    validAnswers: ['kosiarz umysłów'],
    almostValidAnswers: ['kosiarz', 'umysł', 'kosa', 'kosić']
  },
  {
    slogan: 'szaleniec',
    validAnswers: ['szaleniec'],
    almostValidAnswers: ['obłąkany', 'wariat']
  },
  {
    slogan: 'depilacja',
    validAnswers: ['depilacja'],
    almostValidAnswers: ['depilator', 'depilować']
  },
  {
    slogan: 'fast food',
    validAnswers: ['fast food'],
    almostValidAnswers: ['fast', 'food']
  },
  {
    slogan: 'chińszczyzna',
    validAnswers: ['chińszczyzna'],
    almostValidAnswers: ['chińczyk', 'zupka chińska']
  },
  {
    slogan: 'zegar ścienny',
    validAnswers: ['zegar ścienny'],
    almostValidAnswers: ['zegar', 'ścienny', 'ściana']
  },
  {
    slogan: 'wyzwiska',
    validAnswers: ['wyzwiska'],
    almostValidAnswers: ['wyzywać', 'przezywać']
  },
  {
    slogan: 'myśleć o niebieskich migdałach',
    validAnswers: ['myśleć o niebieskich migdałach'],
    almostValidAnswers: ['migdały', 'niebieskie migdały', 'myśleć', 'myśleć o migdałach']
  },
  {
    slogan: 'klaskanie',
    validAnswers: ['klaskanie', 'klaskać'],
    almostValidAnswers: ['klaszczeć', 'owacje']
  },
  {
    slogan: 'kalendarz',
    validAnswers: ['kalendarz'],
    almostValidAnswers: ['data', 'dzień', 'miesiąc', 'rok']
  },
  {
    slogan: 'robin hood',
    validAnswers: ['robin hood'],
    almostValidAnswers: ['robin', 'hood']
  },
  {
    slogan: 'krzyk',
    validAnswers: ['krzyk'],
    almostValidAnswers: ['hałas', 'krzyczeć']
  },
  {
    slogan: 'fotografia',
    validAnswers: ['fotografia'],
    almostValidAnswers: ['zdjęcie', 'fotograf']
  },
  {
    slogan: 'rada miasta',
    validAnswers: ['rada miasta'],
    almostValidAnswers: ['miasto', 'rada']
  },
  {
    slogan: 'barszcz',
    validAnswers: ['barszcz'],
    almostValidAnswers: ['zupa', 'barszc']
  },
  {
    slogan: 'import',
    validAnswers: ['import'],
    almostValidAnswers: ['imprt', 'port']
  },
  {
    slogan: 'papierosy',
    validAnswers: ['papierosy'],
    almostValidAnswers: ['szlugi', 'fajki']
  },
  {
    slogan: 'zakwasy',
    validAnswers: ['zakwasy'],
    almostValidAnswers: ['zakwas', 'ból mięśni']
  },
  {
    slogan: 'cisza przed burzą',
    validAnswers: ['cisza przed burzą'],
    almostValidAnswers: ['cisza', 'burze']
  },
  {
    slogan: 'batman',
    validAnswers: ['batman'],
    almostValidAnswers: ['nietoperz', 'batmobile']
  },
  {
    slogan: 'sprzątaczka',
    validAnswers: ['sprzątaczka'],
    almostValidAnswers: ['sprzątać', 'sprzątanie']
  },
  {
    slogan: 'domek na drzewie',
    validAnswers: ['domek na drzewie'],
    almostValidAnswers: ['dom', 'domek', 'drzewo']
  },
  {
    slogan: 'drzwi antywłamaniowe',
    validAnswers: ['drzwi antywłamaniowe'],
    almostValidAnswers: ['drzwi', 'antywłamaniowe']
  }
]

const englishSlogansArray = [
  {
    slogan: 'robot',
    validAnswers: ['robot'],
    almostValidAnswers: ['machine', 'robt']
  },
  {
    slogan: 'spider',
    validAnswers: ['spider'],
    almostValidAnswers: ['insect', 'spidr']
  },
  {
    slogan: 'bridge',
    validAnswers: ['bridge'],
    almostValidAnswers: ['construction', 'brigde']
  },
  {
    slogan: 'candy',
    validAnswers: ['candy'],
    almostValidAnswers: ['cande', 'sweet']
  },
  {
    slogan: 'cookie',
    validAnswers: ['cookie'],
    almostValidAnswers: ['cokie', 'cake']
  },
  {
    slogan: 'ocean',
    validAnswers: ['ocean'],
    almostValidAnswers: ['sea', 'ocen']
  },
  {
    slogan: 'rabbit',
    validAnswers: ['rabbit'],
    almostValidAnswers: ['rabit', 'animal']
  },
  {
    slogan: 'bounce',
    validAnswers: ['bounce'],
    almostValidAnswers: ['ball', 'bonce']
  },
  {
    slogan: 'swimming pool',
    validAnswers: ['swimming pool'],
    almostValidAnswers: ['swimming', 'pool']
  },
  {
    slogan: 'ladybug',
    validAnswers: ['ladybug'],
    almostValidAnswers: ['bug', 'insect']
  },
  {
    slogan: 'tail',
    validAnswers: ['tail'],
    almostValidAnswers: ['back', 'fur']
  },
  {
    slogan: 'elephant',
    validAnswers: ['elephant'],
    almostValidAnswers: ['elepant', 'elephan']
  },
  {
    slogan: 'star',
    validAnswers: ['star'],
    almostValidAnswers: ['planet', 'sun']
  },
  {
    slogan: 'ferry',
    validAnswers: ['ferry'],
    almostValidAnswers: ['ship', 'barge']
  },
  {
    slogan: 'draw',
    validAnswers: ['draw'],
    almostValidAnswers: ['win', 'loose']
  },
  {
    slogan: 'mail',
    validAnswers: ['mail'],
    almostValidAnswers: ['email', 'gmail']
  },
  {
    slogan: 'seal',
    validAnswers: ['seal'],
    almostValidAnswers: ['animal', 'sea']
  },
  {
    slogan: 'neighbor',
    validAnswers: ['neighbor'],
    almostValidAnswers: ['neigbor', 'neighor']
  },
  {
    slogan: 'tiger',
    validAnswers: ['tiger'],
    almostValidAnswers: ['lion', 'animal']
  },
  {
    slogan: 'gate',
    validAnswers: ['gate'],
    almostValidAnswers: ['door', 'entrance']
  },
  {
    slogan: 'earmuffs',
    validAnswers: ['earmuffs'],
    almostValidAnswers: ['ear', 'muff']
  },
  {
    slogan: 'razor',
    validAnswers: ['razor'],
    almostValidAnswers: ['blade', 'knife']
  },
  {
    slogan: 'picture frame',
    validAnswers: ['picture frame'],
    almostValidAnswers: ['picture', 'frame']
  },
  {
    slogan: 'timer',
    validAnswers: ['timer'],
    almostValidAnswers: ['time', 'seconds']
  },
  {
    slogan: 'vegetarian',
    validAnswers: ['vegetarian'],
    almostValidAnswers: ['vege', 'vegan']
  },
  {
    slogan: 'art gallery',
    validAnswers: ['art gallery'],
    almostValidAnswers: ['art', 'gallery']
  },
  {
    slogan: 'zoo',
    validAnswers: ['zoo'],
    almostValidAnswers: ['animal', 'animals']
  },
  {
    slogan: 'barber',
    validAnswers: ['barber'],
    almostValidAnswers: ['hair', 'hairdresser']
  },
  {
    slogan: 'scuba diving',
    validAnswers: ['scuba diving'],
    almostValidAnswers: ['scuba', 'diving']
  },
  {
    slogan: 'hipster',
    validAnswers: ['hipster'],
    almostValidAnswers: ['beard', 'lumberjack']
  },
  {
    slogan: 'husband',
    validAnswers: ['husband'],
    almostValidAnswers: ['wife', 'marriage']
  },
  {
    slogan: 'myth',
    validAnswers: ['myth'],
    almostValidAnswers: ['mythology', 'zeus', 'atena']
  },
  {
    slogan: 'season',
    validAnswers: ['season'],
    almostValidAnswers: ['winter', 'spring', 'autumn', 'summer']
  },
  {
    slogan: 'theory',
    validAnswers: ['theory'],
    almostValidAnswers: ['equation', 'theorem']
  },
  {
    slogan: 'wormhole',
    validAnswers: ['wormhole'],
    almostValidAnswers: ['worm', 'hole']
  },
  {
    slogan: 'tournament',
    validAnswers: ['tournament'],
    almostValidAnswers: ['competition', 'tourment']
  },
  {
    slogan: 'upgrade',
    validAnswers: ['upgrade'],
    almostValidAnswers: ['promotion', 'software']
  },
  {
    slogan: 'parody',
    validAnswers: ['parody'],
    almostValidAnswers: ['gig', 'performance']
  },
  {
    slogan: 'companion',
    validAnswers: ['companion'],
    almostValidAnswers: ['friend', 'compan']
  },
  {
    slogan: 'coast',
    validAnswers: ['coast'],
    almostValidAnswers: ['shore', 'port']
  },
  {
    slogan: 'cashier',
    validAnswers: ['cashier'],
    almostValidAnswers: ['cash', 'checkout']
  },
  {
    slogan: 'danger',
    validAnswers: ['danger'],
    almostValidAnswers: ['warning', 'dangr']
  },
  {
    slogan: 'population',
    validAnswers: ['population'],
    almostValidAnswers: ['people', 'group']
  },
  {
    slogan: 'treatment',
    validAnswers: ['treatment'],
    almostValidAnswers: ['cure', 'medicine']
  },
  {
    slogan: 'employee',
    validAnswers: ['employee'],
    almostValidAnswers: ['emplyee', 'employer']
  },
  {
    slogan: 'time zone',
    validAnswers: ['time zone'],
    almostValidAnswers: ['time', 'zone']
  },
  {
    slogan: 'soul',
    validAnswers: ['soul'],
    almostValidAnswers: ['spirit', 'sol']
  },
  {
    slogan: 'member',
    validAnswers: ['member'],
    almostValidAnswers: ['membr']
  },
  {
    slogan: 'effect',
    validAnswers: ['effect'],
    almostValidAnswers: ['efect']
  },
  {
    slogan: 'reward',
    validAnswers: ['reward'],
    almostValidAnswers: ['prize', 'award']
  }
]




