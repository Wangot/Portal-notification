$(document).ready(function() {
    initSocketIO();


    function initSocketIO() {

        /*
         Connect to socket.io on the server.
         */
        var host = window.location.host //.split(':')[0];
        var socket = io.connect('http://' + host, {
            'query': "token=" + "token_test",
            reconnect: false,
            'try multiple transports': false
        });
        var intervalID;
        var reconnectCount = 0;

        socket.on('connect', function() {
            console.log('connected');
            // send join message
            socket.emit('join', JSON.stringify({}));
        });
        socket.on('connecting', function() {
            console.log('connecting');
        });
        socket.on('disconnect', function() {
            console.log('disconnect');
            intervalID = setInterval(tryReconnect, 4000);
        });
        socket.on('connect_failed', function() {
            console.log('connect_failed');
        });
        socket.on('error', function(err) {
            console.log('error: ' + err);
        });
        socket.on('reconnect_failed', function() {
            console.log('reconnect_failed');
        });
        socket.on('reconnect', function() {
            console.log('reconnected ');
        });
        socket.on('reconnecting', function() {
            console.log('reconnecting');
        });

        var tryReconnect = function() {
            ++reconnectCount;
            if (reconnectCount == 5) {
                clearInterval(intervalID);
            }
            console.log('Making a dummy http call to set jsessionid (before we do socket.io reconnect)');
            $.ajax('/')
                .success(function() {
                    console.log("http request succeeded");
                    //reconnect the socket AFTER we got jsessionid set
                    io.connect('http://' + host, {
                        reconnect: false,
                        'try multiple transports': false
                    });
                    clearInterval(intervalID);
                }).error(function(err) {
                    console.log("http request failed (probably server not up yet)");
                });
        };

        // Test for sending notification
        socket.on('notification_test', function(msg) {
            console.log("notification_test ==> ", msg)
        });
    }
});