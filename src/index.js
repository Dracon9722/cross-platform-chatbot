const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')

exports.App = () => {
    return router([
        text(/^(hi|hello|)$/i, handler.HandleFollow),
        text(/^(�H��recommender)$/i, handler.recommenderHandleLineMessage),
        text(/^(help)$/i, handler.help),
        text(/^(��~���])$/i, handler.recentday),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
