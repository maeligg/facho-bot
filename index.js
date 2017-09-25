const Twit = require('twit');
const config = require('./config.js');

process.env = config;

// Words arrays
const interjection = ['Une honte !', 'Honteux', 'Honte à vous !', 'Dégueulasse', 'J\'ai honte d\'être Français.', 'N\'importe quoi.', 'La Nation mérite mieux.', 'De Gaule n\'aurait jamais accepté ça.'];

const noms = ['des journalopes', 'des journaputes', 'des socialopes', 'des gauchiasses', 'des représentants de la voyoucratie', 'des merdias', 'des bobos', 'des feminazis', 'des cosmopolites', 'des droit de l\'hommistes', 'des membres de l\'UMPS', 'des bobos', 'des islamo-gauchistes', 'des illuminatis', 'des sionistes'];

const débutPhrase = ['Encore un coup', 'Bel example', 'Triste example'];

const finPhrase = ['dirigent ce pays', 'contrôlent les médias', 'contrôlent nos esprits'];

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
  // Build the tweet
  const tweetContent = `${randomItem(interjection)} ${randomItem(débutPhrase)} ${randomItem(noms)} qui ${randomItem(finPhrase)}.`;

  T.post('statuses/update', { status: tweetContent }, (err, data, resp) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('response: ', resp);
    }
  });
};

tweet();

setInterval(() => {
  try {
    tweet();
  } catch (e) {
    console.log(e);
  }
}, 1000 * 60 * 60 * 3); // tweets every 3 hours
