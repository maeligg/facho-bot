const Twit = require('twit');
const config = require('./config.js');

process.env = config;


// Words arrays
const noms = ['des journalopes', 'des journaputes', 'des socialopes', 'des gauchiasses', 'des voyoucrates', 'des merdias', 'des feminazis', 'des islamo-gauchistes', 'des illuminatis', 'des sionistes', 'des lobbies'];

const adjectifs = ['cosmopolites', 'bobos', 'droit de l\'hommistes', 'bien pensants', 'politiquement corrects'];

const phraseDébut = ['Encore un coup', 'Encore un example', 'Triste example', 'C\'est la faute', 'Il serait temps de se débarasser', 'Vous êtes à la solde', 'Vous faites le jeu'];

const phraseFin = ['dirigent ce pays', 'contrôlent les médias', 'contrôlent la presse', 'contrôlent le système', 's\'autorisent tout'];

const interjectionDébut = ['Une honte !', 'Honteux !', 'Honte à vous !', 'Dégoûtant.', 'N\'importe quoi.', 'Scandale !', 'Gerbant.', 'Affligeant.'];

const interjectionFin = ['Jeanne, au secours !', 'Pétain n\'aurait pas cautionné.', 'Pétain doit se retourner dans sa tombe.', 'J\'ai honte d\'être Français.', 'Virons-les !', 'Demandez l\'avis de Faurisson pour voir.', 'Retournez manger un couscous avec Philippot.', 'Ça mérite une bonne quenelle.', 'Allez lire le dernier bouquin de Soral.', 'Allez réécouter la dernière intervention de Zemmour.', 'Il faut quitter l\'Union Européenne.', 'L\'Islam va trop loin.', 'Nos valeurs se perdent.', '#LePen2021', '#Marion2021'];


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
      + ' '
      + randomItem(noms)
      + (coinFlip() === 0 ?
      ' qui '
      + randomItem(phraseFin)
      : ' ' + randomItem(adjectifs))
      + '.'
      + (coinFlip() === 0 ? ' ' + randomItem(interjectionFin) : '');

  T.get('search/tweets', { q: `list:facho_bot/merdias since:${date}`, count: 10 }, (getErr, getData) => {
    const randomTweet = randomItem(getData.statuses);
    const tweetId = randomTweet.id_str;
    const username = randomTweet.user.screen_name;

    T.post('statuses/update', { status: `@${username} ${tweetContent}`, in_reply_to_status_id: tweetId }, (postErr, postData) => {
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
