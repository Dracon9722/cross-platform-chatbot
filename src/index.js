const { router, text, line, messenger } = require('bottender/router');
const handler = require('./handler')


exports.App = () => {
    return router([
        text(/^(hi|hello)$/i, handler.HandleFollow),
        text(/^(help|help |Help|Help )$/i, handler.help),
        text(/^(����Ʀ�])$/i, handler.recentday),
        text(/^(���P�Ʀ�])$/i, handler.recentweek),
        text(/^(�~�ױƦ�])$/i, handler.rank),
        text(/^(���˪��q��|���˪�����|���˪��q��)$/i, handler.Fsong)




        line.message(handler.HandleLineMessage),
        line.follow(handler.HandleFollow),

        messenger.message(handler.HandleMessengerMessage),
        messenger.accountLinking(handler.HandleFollow),
    ]);
}