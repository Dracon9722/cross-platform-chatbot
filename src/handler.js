const KKBOXMessage = require('./message/KKBOXMessage');
const kkbox = global.kkbox;
const kkassistant = global.kkassistant

const welcomeMessage = 'Hi~ +
    '輸入"help"顯示多項功能';


const HelpMessage = '功能\n' +
    '輸入"推薦的歌曲"將隨機推薦歌曲\n' +
    '輸入"今日排行榜"顯示風雲榜今日排行\n' +
    '輸入"本周排行榜"顯示風雲榜本周排行\n' +
    '輸入"年度排行榜"顯示風雲榜年度排行\n';


exports.HandleLineMessage = async context => {
    if (context.event.isText) {
        kkassistant.nlu(context.event.text, context.session.id)
            .then(nluResp => {
                if (nluResp.directives.length > 0) {
                    if (nluResp.directives[0].type == 'AudioPlayer.Play') {
                        return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                    } else { // Event.Metadata & Video.Metadata
                        return nluResp.directives[0];
                    }
                }
                else {
                    console.error('Error: ', nluResp);
                    context.sendText(nluResp.outputSpeech.text);
                    throw new Error('KKBOX Assistant NLP Error');
                }
            })
            .then(items => new KKBOXMessage(items).toLineMessage())
            .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}




exports.help = async context => {
    await context.sendText(HelpMessage, {
        quickReply: {
            items: [
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '顯示多項功能',
                        text: 'help',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '隨機推薦歌曲',
                        text: '推薦的歌曲',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '本日熱門的歌',
                        text: '今日排行榜',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '本周熱門歌',
                        text: '本周排行榜',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '年度總排名',
                        text: '年度排行榜',
                    },
                },
            ],
        }
    }




    );
}


exports.Fsong = async context => {
    kkassistant.nlu(song[Math.floor(Math.random() * 23)], context.session.id)
        .then(nluResp => {
            if (nluResp.directives.length > 0) {
                if (nluResp.directives[0].type == 'AudioPlayer.Play') {
                    return kkbox.fetchTracks(nluResp.directives[0].playlist.data);
                } else { // Event.Metadata & Video.Metadata
                    return nluResp.directives[0];
                }
            }
            else {
                console.error('Error: ', nluResp);
                context.sendText(nluResp.outputSpeech.text);
                throw new Error('KKBOX Assistant NLP Error');
            }
        })
        .then(items => new KKBOXMessage(items).toLineMessage())
        .then(({ altText, template }) => context.sendImageCarouselTemplate(altText, template))
        .catch(error => {
            console.error('Error: ', error);
        });
}

exports.recentweek = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '本週單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

            {
                type: 'uri',
                label: '點擊查看',
                uri: 'https://kma.kkbox.com/charts/weekly/newrelease?terr=tw&lang=tc',
            },
        ],
    }, {
            quickReply: {
                items: [
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '顯示多項功能',
                            text: 'help',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '隨機推薦歌曲',
                            text: '推薦的歌曲',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '本日熱門的歌',
                            text: '今日排行榜',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '本周熱門歌',
                            text: '本周排行榜',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '年度總排名',
                            text: '年度排行榜',
                        },
                    },
                ],
            }
        });
}

exports.recentday = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '今日單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

            {
                type: 'uri',
                label: '點擊查看',
                uri: 'https://kma.kkbox.com/charts/daily/newrelease?terr=tw&lang=tc',
            },
        ],
    }, {
            quickReply: {
                items: [
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '顯示多項功能',
                            text: 'help',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '隨機推薦歌曲',
                            text: '推薦的歌曲',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '本日熱門的歌',
                            text: '今日排行榜',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '本周熱門歌',
                            text: '本周排行榜',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '年度總排名',
                            text: '年度排行榜',
                        },
                    },
                ],
            }
        });
}

exports.rank = async context => {
    await context.sendButtonsTemplate('想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。', {
        thumbnailImageUrl: 'https://kma.kkbox.com/charts/assets/images/logo.svg?id=e41750806e78fa673556',
        title: '年度單曲累積榜',
        text: '想知道最近火紅的歌曲有哪些嗎?快來 KKBOX 風雲榜。',
        actions: [

            {
                type: 'uri',
                label: '點擊查看',
                uri: 'https://kma.kkbox.com/charts/yearly/newrelease?lang=tc&terr=tw',
            },
        ],
    }, {
            quickReply: {
                items: [
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '顯示多項功能',
                            text: 'help',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '隨機推薦歌曲',
                            text: '推薦的歌曲',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '本日熱門的歌',
                            text: '今日排行榜',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '本周熱門歌',
                            text: '本周排行榜',
                        },
                    },
                    {
                        type: 'action',
                        imageUrl: '',
                        action: {
                            type: 'message',
                            label: '年度總排名',
                            text: '年度排行榜',
                        },
                    },
                ],
            }
        });
}

exports.HandleFollow = async context => {
    await context.sendText(welcomeMessage, {
        quickReply: {
            items: [
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '顯示多項功能',
                        text: 'help',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '隨機推薦歌曲',
                        text: '推薦的歌曲',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '本日熱門的歌',
                        text: '今日排行榜',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '本周熱門歌',
                        text: '本周排行榜',
                    },
                },
                {
                    type: 'action',
                    imageUrl: '',
                    action: {
                        type: 'message',
                        label: '年度總排名',
                        text: '年度排行榜',
                    },
                },
            ],
        }
    }
    );
}

exports.HandleMessengerMessage = async context => {
    if (context.event.isText) {
        await context.sendText(`received the text message: ${context.event.text}`);
    }
}