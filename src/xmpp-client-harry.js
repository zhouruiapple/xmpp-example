const Client = require('node-xmpp-client');
const UUID = require('node-uuid');

var stanzaFlag = 0;

var client = new Client({
    jid: 'harry@one.ejabberd.com',
    password: 'password'
});

client.connection.socket.on('error', function (error) {
    console.error(error)
    process.exit(1)
});

client.on('connect', function () {
    console.log('Client is connected')
});

client.on('reconnect', function () {
    console.log('Client reconnects …')
});

client.on('disconnect', function (e) {
    console.log('Client is disconnected', client.connection.reconnect, e)
});

client.on('online', function (data) {
    this.onlineData = data;
    client.send(new Client.Stanza("iq", { from: this.onlineData.jid._local + "@" + this.onlineData.jid._domain, id: UUID.v4(), to: "pubsub.one.ejabberd.com", type: "set" }).c("pubsub", { xmlns: "http://jabber.org/protocol/pubsub" }).c("publish", { node: "/node02"}).c("item").c("entry").c("title").t("ri ni ma"));
});

client.on('offline', function () {
    console.log('Client is offline')
});

client.on('stanza', function (stanza) {
    console.log('incoming stanza: ', stanza.toString());
});

client.on('error', function (error) {
    console.log('ERROR: ' + error);
});

process.on('exit', function () {
    client.end()
});