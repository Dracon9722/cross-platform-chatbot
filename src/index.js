const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')

exports.App = () => {
    return router([
        text(/^(hi|hello|help)$/i, handler.HandleFollow),
        text(/^(ÀH¾÷ºq¤â)$/i, handler.recommenderHandleLineMessage),
        text(/^(help)$/i, handler.help),

        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}
