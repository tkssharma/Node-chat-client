# Node js client server 

On the server-side, Socket.IO works by adding event listeners to an instance of http.Server. To add Socket.IO support to a http.Server instance, you'd write

```sh
var server = require("net").createServer();
var io = require("socket.io")(server);

var handleClient = function (socket) {
    // we've got a client connection
    socket.emit("tweet", {user: "nodesource", text: "Hello, world!"});
};

io.on("connection", handleClient);

server.listen(8080);

```

# Client-side 

```sh
<script src="/socket.io/socket.io.js"></script>
<script>
    var socket = io.connect("http://localhost");
</script>

```

Since both the server and client's Socket object act as EventEmitters, you can emit and listen for events in a bi-directional manner. For example, we can emit a "tweet" event on the server and listen for it on the client side.

```sh
io.on("connection", function (socket) {
    var tweet = {user: "nodesource", text: "Hello, world!"};

    // to make things interesting, have it send every second
    var interval = setInterval(function () {
        socket.emit("tweet", tweet);
    }, 1000);

    socket.on("disconnect", function () {
        clearInterval(interval);
    });
});

```