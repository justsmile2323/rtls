var net = require('net');
var firebase = require('firebase');

var db_config = {
        apiKey: "AIzaSyC8OMX5S6OTBt1UQBW3qHMrEHqNYlKUP2o",
        authDomain: "prisoners-61c87.firebaseapp.com",
        databaseURL: "https://prisoners-61c87.firebaseio.com",
        projectId: "prisoners-61c87",
        storageBucket: "prisoners-61c87.appspot.com",
        messagingSenderId: "3273599200"
};
var db = firebase.initializeApp(db_config);

var devicesRef = firebase.database().ref('devices');

var server = net.createServer(function(socket) {

    socket.setEncoding('ASCII');
    socket.on('data', function(data){
        var inData = data;
        var arr = inData.split(' ');

        console.log(inData);
        var coord = {
            a0:{
                x: 0,
                y: 0,
            },
            a1:{
                x: 0,
                y: arr[4],
            },
            a2:{
                x: arr[3],
                y: arr[4],
            },
            a3:{
                x: arr[3],
                y: 0,
            },
            a4:{
                x: arr[1],
                y: arr[2],
            }
        };
        devicesRef.child('device'+arr[0]).update(coord);
    });
    socket.on('close', function(){
        console.log('Socket closed');
    });
    socket.on('end',function(data){
        console.log('Socket ended from other end!');
    });
});
server.listen(8083);

server.on('connection', function(socket){
    console.log('Conected');
});
