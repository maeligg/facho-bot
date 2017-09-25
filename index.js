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
    // Build the tweet
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