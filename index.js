const Twit = require('twit');
const config = require('./config.js');

process.env = config;

// Words arrays
const interjection = ['Une honte !', 'Honte à vous !', 'Dégueulasse', 'J\'ai honte d\'être Français.']

const noms = ['des journalopes', 'des socialopes', 'de la gauchiasse', 'de la voyoucratie', 'des merdias', 'des bobos', 'des socialopes', 'des feminazis', 'des cosmopolites', 'des droit de l\'hommistes', 'de l\'UMPS', 'des bobos'];

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
  const tweetContent = `${randomItem(interjection)} Encore un coup ${randomItem(noms)} qui dirige ce pays.`

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
