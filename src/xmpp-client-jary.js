const Client = require('node-xmpp-client');
const UUID = require('node-uuid');

var stanzaFlag = 0;

var client = new Client({
    jid: 'jary@one.ejabberd.com/home',
    password: 'password'
});

client.connection.socket.on('error', function (error) {
    console.error(error);
    process.exit(1);
});

client.on('connect', function () {
    console.log('Client is connected');
});

client.on('reconnect', function () {
    console.log('Client reconnects …');
});

client.on('disconnect', function (e) {
    console.log('Client is disconnected', client.connection.reconnect, e);
});

client.on('online', function (data) {
    console.log('Client is online');
    console.log(data);
    this.onlineUser = data;
});

client.on('offline', function () {
    console.log('Client is offline');
});

client.on('stanza', function (stanza) {
    console.log('incoming stanza: ', stanza.toString());
});

client.on('error', function (error) {
    console.log('ERROR: ' + error);
});

process.on('exit', function () {
    client.end();
});

process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdout.write('>');

function getFullJid(user) {
    return user.jid._local + '@' + user.jid._domain + '/' + user.jid._resource;
};

function getBareJid(user) {
    return user.jid._local + '@' + user.jid._domain;
};

function getDomain(user) {
    return user.jid._domain;
};

process.stdin.on('data', function (text) {
    var rText = text.substring(0, text.length - 2);

    switch (rText) {
        case 'disco-items':
            client.send(new Client.Stanza('iq', { from: getFullJid(client.onlineUser), to: getDomain(client.onlineUser), id: UUID.v4(), type: 'get' })
                .c('query', { xmlns: 'http://jabber.org/protocol/disco#items' })
            );
            break;
        default:
            break;
    };

    process.stdout.write('>');
});