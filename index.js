const Twit = require('twit');
// Uncomment these lines if running locally (see readme for more details)
// const config = require('./config.js');
// process.env = config;


// Words arrays
const noms = ['journalopes', 'journaputes', 'socialopes', 'gauchiasses', 'voyoucrates', 'merdias', 'feminazis', 'islamo-gauchistes', 'illuminatis', 'lobbies', 'franc-maçons', 'euro-atlantistes', 'droitards', 'bien pensants', 'yankees', 'idiots utiles', 'oligarques', 'élites décadentes', 'bureaucrates', 'banksters', 'pantins', 'despotes', 'spéculateurs'];

const adjectifs = ['cosmopolites', 'bobos', 'droit de l\'hommistes', 'propagandistes', 'antiracistes', 'sionistes', 'adeptes du politiquement correct', 'libre-échangistes', 'capitalistes', 'mondialistes', 'communautaristes', 'impérialistes', 'immigrationnistes', 'satanistes', 'apatrides', 'fratricides', 'untermensche'];

const phraseDébut = ['Encore un coup', 'Encore un example', 'Triste example', 'C\'est la faute', 'Il serait temps de se débarasser', 'Vous êtes à la solde', 'Vous faites le jeu', 'Tout ça à cause', 'Toujours pas débarrassés', 'Marre', 'On n\'en peut plus', 'Ras-le-bol', 'Ras la casquette', 'Y\'en a assez'];

const phraseFin = ['dirigent ce pays', 'contrôlent les médias', 'contrôlent la presse', 'contrôlent le système', 's\'autorisent tout', 'détruisent la tradition française', 'perpétuent la théorie du genre', 'anéantissent l\'identité française', 'veulent gouverner par le chaos', 'diabolisent les identitaires', 'veulent mettre en place un gouvernement mondial', 'tirent les ficelles', 'érigent des minarets', 'vendent leur patrie', 'vous espionnent impunément'];

const interjectionDébut = ['Une honte !', 'Honteux !', 'Honte à vous !', 'Dégoûtant.', 'N\'importe quoi.', 'Scandale !', 'Gerbant.', 'Affligeant.', 'C\'est petit !', 'Média-mensonge !', 'Quelle bouillie !', 'Article erroné !', 'Article bâclé !', 'Faux !', 'Vous cachez la vérité !', 'La vérité est ailleurs !', 'Mensonge !', 'Menteurs !', 'Traîtres !', 'Vendus !', 'Arnaque !', 'N’y croyez pas !', 'On vous ment !', 'Halte à la démocrature !'];

const interjectionFin = ['Jeanne, au secours !', 'Pétain n\'aurait pas cautionné.', 'Pétain doit se retourner dans sa tombe.', 'J\'ai honte d\'être Français.', 'Virons-les !', 'Demandez l\'avis de Faurisson pour voir.', 'Retournez manger un couscous avec Philippot.', 'Ça mérite une bonne quenelle.', 'Allez lire le dernier bouquin de Soral.', 'Allez réécouter la dernière intervention de Zemmour.', 'Nos valeurs se perdent.', '#LePen2022', '#Marion2022', 'On est loin de la pudeur hélléno-chrétienne.', 'Rejoignez plutôt la vraie dissidence !', 'Encore de la novlangue journalistique !', 'Vous déshonnorez la liberté de la presse.', 'Où est passée la liberté d\'expression?', 'Le génie français se perd...', 'La révolte des peuples va arriver.', 'Il y a des coups de savate qui se perdent.', 'Où est l\'authentique journalisme?', 'Fini, l\'âge d\'or de notre civilisation...', '🇫🇷', '🔥🇫🇷', 'Organisons un apéro 🐷🍷', 'La France aux français !', 'Résistons à l\'islamisation du pays', 'Vivement le Frexit.', 'Rétablissons la peine capitale.', 'Ah, le temps béni des colonies...'];


// Utils
const randomItem = array => array[Math.floor(Math.random() * array.length)];

const coinFlip = () => Math.floor(Math.random() * 2);

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});


// Build and post the tweet
const tweet = () => {
  const date = new Date().toISOString().slice(0, 10);
  const tweetContent =
      (coinFlip() === 0 ? randomItem(interjectionDébut) + ' ' : '')
      + randomItem(phraseDébut)
      + ' des '
      + randomItem(noms)
      + (coinFlip() === 0 ?
      ' qui '
      + randomItem(phraseFin)
      : ' ' + randomItem(adjectifs))
      + '. '
      + randomItem(interjectionFin);

  T.get('search/tweets', { q: `list:facho_bot/merdias since:${date}`, count: 10 }, (getErr, getData) => {
    const randomTweet = randomItem(getData.statuses);
    const tweetId = randomTweet.id_str;
    const username = randomTweet.user.screen_name;

    T.post('statuses/update', { status: `.@${username} ${tweetContent}`, in_reply_to_status_id: tweetId }, (postErr, postData) => {
      if (postErr) {
        console.log('error: ', postErr);
      } else {
        console.log('response: ', postData);
      }
    });
  });
};


tweet();
setInterval(() => {
  try {
    tweet();
  } catch (e) {
    console.log(e);
  }
}, 1000 * 60 * 60 * 2); // tweets every 2 hours
