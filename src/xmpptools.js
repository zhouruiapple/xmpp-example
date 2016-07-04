/**
 * Created by Administrator on 6/22/2016.
 */

 exports.associateXmppEvent = function(aimxmpp) {
     aimxmpp.on('sockt-error', function(data) {
         console.log('sockt-error %s', data);
     });

     aimxmpp.on('connect', function(data) {
         console.log('aim xmpp connect');
     });

     aimxmpp.on('reconnect', function(data) {
         console.log('aim xmpp reconnect');
     });

     aimxmpp.on('disconnect', function(data) {
         console.log('aim xmpp disconnect');
     });

     aimxmpp.on('online', function(data) {
         console.log('aim xmpp online');
     });

     aimxmpp.on('offline', function(data) {
         console.log('aim xmpp offline');
     });

     aimxmpp.on('stanza', function(data) {
         console.log('aim xmpp stanza: %s', data.toString());
     });

     aimxmpp.on('error', function(data) {
         console.log('aim xmpp error');
     });
 };
