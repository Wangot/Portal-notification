
function SocketServer(host) {

    host || (host = window.location.host);

    this.socket = null;

    this.host = host;

    /*
     Connect to socket.io on the server.
     */
    var socket = this.connectToHost(host);
    this.createEvents(socket);
}

_.extend(SocketServer.prototype, {
    connectToHost: function(host) {

        this.socket = io.connect('http://' + host, {
            'query': "token=" + "token_test",
            'try multiple transports': false,

            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionDelayMax': 10000,
        });

        return this.socket;

    },

    createEvents: function(socket) {

        socket.on('connect', _.bind(function() {
            console.log('connected');
            // send join message

            socket.emit('join', JSON.stringify({}));
        }, this));

        socket.on('connecting', function() {
            //console.log('connecting');
        });

        socket.on('disconnect', _.bind(function() {
            console.log('disconnect');
        }, this));

        socket.on('connect_failed', function() {
            //console.log('connect_failed');
        });

        socket.on('error', function(err) {
            console.log('error: ' + err);
        });

        socket.on('reconnect_failed', function() {
            //console.log('reconnect_failed');
        });

        socket.on('reconnect', function() {
            //console.log('reconnected ');
        });

        socket.on('reconnecting', function() {
            //console.log('reconnecting');
        });
    },

    registerAsAdmin: function() {

        if(this.socket)
        {
            this.socket.on('COMPANY_ADMIN', function(msg) {
                console.log("COMPANY_ADMIN ==> ", msg)
            });
        }

    },

    registerToCompanyNotifications: function(companies) {

        companies || (companies = []);

        if( (this.socket) && (companies.length > 0) )
        {
            for(var x=0; x<companies.length; x++)
            {
                console.log('SUBSCRIBING TO CHANNEL;', 'COMPANY_' + companies[x]);
                this.socket.on('COMPANY_' + companies[x], function(msg) {
                    console.log("COMPANY_NOTIFICATION ==> ", msg)
                });
            }
        }

    }
});

$(document).ready(function() {
    window.socketServer = new SocketServer();

    window.socketServer.registerAsAdmin();

    window.socketServer.registerToCompanyNotifications([23,5]);
});