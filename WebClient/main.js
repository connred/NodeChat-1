$(document).ready(function () {
    var socketServer = 'http://130.211.216.160/';
    var socket = io.connect(socketServer);
    var name;
    socket.on('connect', function () {
        $('#error').hide();
        $('#error').html('');
        $('#noerror').show();
        // in case the server is coming back online for an active user
        if (user) {
            socket.emit('user', name);
        }
    });
    socket.io.on('connect_error', function (err) {
        $('#error').html(err + '<br>Chat server offline');
        $('#error').show();
        $('#noerror').hide();
    });
    socket.on('message', function (data) {
        $('#log').append('<div><strong>' + data.user + ': ' + data.message + '</strong></div>');
        console.log('Message sent by', data.user, ":'", data.message, "'");
    });
    socket.on('otherUserConnect', function (data) {
        $('#log').append('<div><strong>' + data + ' connected</strong></div>');
    });
    socket.on('otherUserDisconnect', function (data) {
        $('#log').append('<div><strong>' + data + ' disconnected</strong></div>');
    });
    socket.on('displayname', function () {
        $('#user').append('<span>' + 'You choose the name: ' + socket.user + '</span>');
    })
    $('#pass-enter').click(function () {
        var password = $('#pass-input');
        var realpassword = '1234';
        var pwd = password.val().trim();
        if (password.val().trim() === realpassword) {
            $('#user-name').prop('disabled', false);
            $('#user-save').prop('disabled', false);
            $('#user').prop('hidden', false);
            $('#pass-input').prop('hidden', true);
            $('#pass-enter').prop('hidden', true);
            $('#span1').prop('hidden', true);
        }
        else {
            alert('Incorrect Password');
        }
    });
    $('#user-save').click(function () {
        var username = $('#user-name');
        var txt = username.val().trim();
        console.log(txt);
        if (txt.length > 0) {
            name = txt;
            username.prop('hidden', true);
            $('#span2').hide();
            $(this).hide();
            $('#controls').show();
            $('#show-button').prop('hidden, true');
            $('#log').prop('hidden', false);
            $('#message').prop('disabled', false);
            $('#send').prop('disabled', false);
            socket.emit('user', name);
        }
    });
    $('#send').click(function () {
        var input = $('#message');
        var text = input.val().trim();
        if (text.length > 0) {
            socket.emit('message', text);
        }
        input.val('');
    });
    $("#user-name").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#user-save").click();
        }
    });
    $("#pass-input").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#pass-enter").click();
        }
    });
    $("#message").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#send").click();
        }
    });
});