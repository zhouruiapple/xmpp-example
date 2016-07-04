/**
 * Created by Administrator on 6/22/2016.
 */

var Vantage = require('vantage');
var UUID = require('node-uuid');

var {
    associateCommand
} = require('./clitools.js');

var {
    connectCommand,
    disconnectCommand,
    discoItemsCommand,
    initialPresenceCommand,
    subscribePresenceCommand,
    subscribedPresenceCommand,
    unsubscribedPresenceCommand,
    showstatusPresenceCommand,
    showstatusCommand,
    iqGetRosterCommand,
    iqSetGroupOfRosterCommand,
    activeChatMessageCommand,
    composingChatMessageCommand,
    pauseChatMessageCommand,
    goneChatMessageCommand,
    iqGetVcardCommand,
    iqSetVcardCommand,
    iqSetBlockingCommand,
    iqGetBlockingCommand,
    iqSetUnblockingCommand
} = require('./clicommand.js');

var delimiter = 'xmppcli-$',
    description = 'xmpp console application',
    port = 33333;

if(process.argv.length > 2) {
    port = parseInt(process.argv[2]);
}

vantage = new Vantage();

associateCommand(vantage, connectCommand);
associateCommand(vantage, disconnectCommand);
associateCommand(vantage, discoItemsCommand);
associateCommand(vantage, initialPresenceCommand);
associateCommand(vantage, subscribePresenceCommand);
associateCommand(vantage, subscribedPresenceCommand);
associateCommand(vantage, unsubscribedPresenceCommand);
associateCommand(vantage, showstatusPresenceCommand);
associateCommand(vantage, showstatusCommand);
associateCommand(vantage, iqGetRosterCommand);
associateCommand(vantage, iqSetGroupOfRosterCommand);
associateCommand(vantage, activeChatMessageCommand);
associateCommand(vantage, composingChatMessageCommand);
associateCommand(vantage, pauseChatMessageCommand);
associateCommand(vantage, goneChatMessageCommand);
associateCommand(vantage, iqGetVcardCommand);
associateCommand(vantage, iqSetVcardCommand);
associateCommand(vantage, iqSetBlockingCommand);
associateCommand(vantage, iqGetBlockingCommand);
associateCommand(vantage, iqSetUnblockingCommand);

vantage
    .delimiter(delimiter)
    .listen(port)
    .show();
