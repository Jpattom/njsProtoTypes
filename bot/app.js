var restify = require('restify');
//var builder = require('botbuilder');
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.clear();
    console.log('%s listening to %s', server.name, server.url);
   
});

server.post('/api/messages', function (obj) {
    console.clear();
    console.log(obj);
    
});

server.get('/api/messages', function (message) {
    console.clear();
    console.log(message);

});

//var connector = new builder.ChatConnector({
//    appId: process.env.MICROSOFT_APP_ID,
//    appPassword: process.env.MICROSOFT_APP_PASSWORD,
//    endpoint: '10.0.0.65:52561',
//    stateEndpoint: '10.0.0.65:52561'
    
//});
//server.post('/api/messages', connector.listen());

//console.log("What the ?");
//var bot = new builder.UniversalBot(connector, function (session) {
//    console.log(session);
//    session.send("You said: %s", session.message.text);
//});
