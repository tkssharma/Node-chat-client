var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io');
var io = socket.listen(http,{ log: false });
var flag=1;

app.get('/', function(req, res){

  res.sendFile("C:\\LEARNING\\node js\\Node Chat app\\index.html");

});

io.sockets.on('connection', function(client){

    console.log('User connected');

    client.on('join',function(name)
    {
    client.set('nickname',name); 
    console.log("connected...." + name);   
    })    

    client.on('messages',function(data)
    {
        client.get('nickname',function(err,name){
        console.log("Message::"+name+" : "+data.hello);
        client.broadcast.emit('messages',{hello:name+" : "+data.hello});   
       })

    });

    client.on('textchanged',function(data)
    {
      console.log("TextChanged::");
      client.broadcast.emit('textchanged',{hello:data.hello});   
    });
            
  });


http.listen(8080, function(){
  console.log('listening on *:8080');
});
