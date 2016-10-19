$(document).ready(function() {
    var socketServer = 'http://192.168.1.8/';
    var socket = io.connect(socketServer);

    socket.on('connect', function() {
        $('#error').hide();
        $('#error').html('');
        $('#noerror').show();
        console.log('connected :)');
    });

    socket.io.on('connect_error', function(err) {
        $('#error').html(err + '<br>Chat server offline');
        $('#error').show();
        $('#noerror').hide();
    });

    socket.on('welcome', function(data) {
        $('#log').append('<div><strong>' + data.text + '</strong></div>');
    });

    socket.on('otherUserDisconnect', function(data) {
        $('#log').append('<div><strong>' + data + ' disconnected</strong></div>');
    });

    socket.on('message', function(data) {
        $('#log').append('<div><strong>' + data.user + ': ' + data.message + '</strong></div>');
    })

    var name;

    $('#user-save').click(function() {
        console.log('click');
        var username = $('#user-name');
        var txt = username.val().trim();
        console.log(txt);
        if(txt.length > 0) {
            name = txt;
            username.prop('disabled', true);
            $(this).hide();
            $('#controls').show();
            $('#message').prop('disabled', false);
            $('#send').prop('disabled', false);
            socket.emit('user', name);
        }
    });

    $('#send').click(function() {
        var input = $('#message');
        var text = input.val().trim();
        if(text.length > 0) {
            socket.emit('message', text);
        }
        input.val('');
    });


});