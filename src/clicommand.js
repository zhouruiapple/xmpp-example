/**
 * Created by Administrator on 6/22/2016.
 */

const Client = require('node-xmpp-client');
const UUID = require('node-uuid');
var {
    AIMXmpp,
    xmppService
} = require('./xmppclient.js');

var {associateXmppEvent} = require('./xmpptools.js');

exports.connectCommand = {
    name: 'connect [jid] [password]',

    description: 'connect to ejabberd server',

    options: [{
            name: '-p, --port [port]',
            description: 'assign the special port to connect when server is not listen on 5222'
        },

        {
            name: '-h, --host [host]',
            description: 'assign the special host to connect when you do not want use the domain of jid'
        },
    ],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            console.log('the client is connected, if you want to reconnect or connect within other jid, please disconnect');
        } else {
            xmppService.aimXmpp = new AIMXmpp({
                jid: args.jid,
                password: args.password
            });

            associateXmppEvent(xmppService.aimXmpp);
        }
        callback();
    },
};

exports.disconnectCommand = {
    name: 'disconnect',

    description: 'disconnect from ejabberd server',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.end();
            xmppService.aimXmpp = null;
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.discoItemsCommand = {
    name: 'disco-items',

    description: 'discovery the items of service from server',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {
                    from: xmppService.aimXmpp.obtainFullJid(),
                    to: xmppService.aimXmpp.obtainDomain(),
                    id: UUID.v4(),
                    type: 'get'
                })
                .c('query', {
                    xmlns: 'http://jabber.org/protocol/disco#items'
                })
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.discoInfoCommand = {
    name: 'disco-info [service]',

    description: 'discovery the info of service from server',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {
                    from: xmppService.aimXmpp.obtainFullJid(),
                    to: service,
                    id: UUID.v4(),
                    type: 'get'
                })
                .c('query', {
                    xmlns: 'http://jabber.org/protocol/disco#info'
                })
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.initialPresenceCommand = {
    name: 'initial-presence',

    description: 'send initial presence to notify the roster',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('presence')
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.subscribePresenceCommand = {
    name: 'subscribe-presence [jid]',

    description: 'subscribe presence with jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('presence', {from: xmppService.aimXmpp.obtainBareJid(), to: args.jid, type: 'subscribe'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.subscribedPresenceCommand = {
    name: 'subscribed-presence [jid]',

    description: 'subscribed presence with jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('presence', {from: xmppService.aimXmpp.obtainBareJid(), to: args.jid, type: 'subscribed'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.unsubscribedPresenceCommand = {
    name: 'unsubscribed-presence [jid]',

    description: 'unsubscribed presence with jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('presence', {from: xmppService.aimXmpp.obtainBareJid(), to: args.jid, type: 'unsubscribed'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.showstatusPresenceCommand = {
    name: 'showstatus-presence [jid] [show] [status]',

    description: 'show status presence with jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('presence', {from: xmppService.aimXmpp.obtainBareJid(), to: args.jid})
                .c('show').t(args.show)
                .up()
                .c('status').t(args.status)
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.showstatusCommand = {
    name: 'showstatus-presence [show] [status]',

    description: 'show status presence without jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('presence')
                .c('show').t(args.show)
                .up()
                .c('status').t(args.status)
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.iqGetRosterCommand = {
    name: 'get-roster',

    description: 'get roster list from server',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: xmppService.aimXmpp.obtainBareJid(), id: UUID.v4(), type: 'get'})
                .c('query', {xmlns: 'jabber:iq:roster'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.iqSetGroupOfRosterCommand = {
    name: 'set-group-of-roster [jid] [group]',

    description: 'set group of roster with jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: xmppService.aimXmpp.obtainBareJid(), id: UUID.v4(), type: 'set'})
                .c('query', {xmlns: 'jabber:iq:roster'})
                .c('item', {jid: args.jid})
                .c('group').t(args.group)
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};


exports.activeChatMessageCommand = {
    name: 'active-chat-message [jid] [message]',

    description: 'send message to jid in chat session with active status',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('message', {from: xmppService.aimXmpp.obtainFullJid(), to: args.jid, type: 'chat'})
                .c('body').t(args.message)
                .up()
                .c('active', {xmlns: 'http://jabber.org/protocol/chatstates'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.composingChatMessageCommand = {
    name: 'composing-chat-message [jid]',

    description: 'send message to fullJid in chat session with composing status',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('message', {from: xmppService.aimXmpp.obtainFullJid(), to: args.jid, type: 'chat'})
                .c('composing', {xmlns: 'http://jabber.org/protocol/chatstates'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.pauseChatMessageCommand = {
    name: 'pause-chat-message [jid]',

    description: 'send message to fullJid in chat session with pause status',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('message', {from: xmppService.aimXmpp.obtainFullJid(), to: args.jid, type: 'chat'})
                .c('pause', {xmlns: 'http://jabber.org/protocol/chatstates'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.goneChatMessageCommand = {
    name: 'gone-chat-message [jid]',

    description: 'send message to fullJid in chat session with gone status',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('message', {from: xmppService.aimXmpp.obtainFullJid(), to: args.jid, type: 'chat'})
                .c('gone', {xmlns: 'http://jabber.org/protocol/chatstates'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};


exports.iqGetVcardCommand = {
    name: 'get-vcard [jid]',

    description: 'get vcard from a roster',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: args.jid, type: 'get', id: UUID.v4()})
                .c('vCard', {xmlns: 'vcard-temp'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.iqSetVcardCommand = {
    name: 'set-vcard [given]',

    description: 'set self vcard',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: xmppService.aimXmpp.obtainBareJid(), type: 'set', id: UUID.v4()})
                .c('vCard', {xmlns: 'vcard-temp'})
                .c('N')
                .c('GIVEN').t('Alice')
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.iqSetBlockingCommand = {
    name: 'set-blocking [jid]',

    description: 'set blocing communication to jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: xmppService.aimXmpp.obtainBareJid(), type: 'set', id: UUID.v4()})
                .c('block', {xmlns: 'urn:xmpp:blocking'})
                .c('item', {jid: args.jid})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};


exports.iqGetBlockingCommand = {
    name: 'get-blocking',

    description: 'get blocing communication list',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: xmppService.aimXmpp.obtainBareJid(), type: 'get', id: UUID.v4()})
                .c('blocklist', {xmlns: 'urn:xmpp:blocking'})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};

exports.iqSetUnblockingCommand = {
    name: 'set-unblocking [jid]',

    description: 'set unblocing communication to jid',

    options: [],

    action: function(args, callback) {
        if (xmppService.aimXmpp) {
            xmppService.aimXmpp.client.send(
                new Client.Stanza('iq', {from: xmppService.aimXmpp.obtainFullJid(), to: xmppService.aimXmpp.obtainBareJid(), type: 'set', id: UUID.v4()})
                .c('unblock', {xmlns: 'urn:xmpp:blocking'})
                .c('item', {jid: args.jid})
            );
        } else {
            console.log('client is not connected to any server')
        }
        callback();
    },
};
