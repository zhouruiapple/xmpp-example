/**
 * Created by Administrator on 6/22/2016.
 */
const Client = require('node-xmpp-client');
const UUID = require('node-uuid');
var util = require('util');
var events = require('events');

exports.AIMXmpp = function(opt) {
    events.EventEmitter.call(this);

    this.client = new Client(opt);

    if (this.client) {
        this.client.connection.socket.on('error', function(error) {
            this.emit('sockt-error', error);
        }.bind(this));

        this.client.on('connect', function() {
            this.emit('connect');
        }.bind(this));

        this.client.on('reconnect', function() {
            this.emit('reconnect');
        }.bind(this));

        this.client.on('disconnect', function() {
            this.emit('disconnect');
        }.bind(this));

        this.client.on('online', function(data) {
            this.onlineUser = data;
            this.emit('online', data);
        }.bind(this));

        this.client.on('offline', function() {
            this.emit('offline');
        }.bind(this));

        this.client.on('stanza', function(stanza) {
            this.emit('stanza', stanza);
        }.bind(this));

        this.client.on('error', function(error) {
            this.emit('error', error);
        }.bind(this));
    } else {
        console.log('AIMXmpp client is empty');
    }

    this.obtainFullJid = function() {
        if (this.client && this.onlineUser) {
            return this.onlineUser.jid._local + '@' + this.onlineUser.jid._domain + '/' + this.onlineUser.jid._resource;
        } else {
            return null;
        }
    };

    this.obtainBareJid = function() {
        if (this.client && this.onlineUser) {
            return this.onlineUser.jid._local + '@' + this.onlineUser.jid._domain;
        } else {
            return null;
        }
    };

    this.obtainDomain = function() {
        if (this.client && this.onlineUser) {
            return this.onlineUser.jid._domain;
        } else {
            return null;
        }
    };
}

util.inherits(this.AIMXmpp, events.EventEmitter);

exports.xmppService = {
    aimXmpp: null,
};
