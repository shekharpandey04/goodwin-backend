"use strict";
const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const debug = require("debug")("test");
const events = require("./Constants").events;
const commonVar = require("./Constants").commonVar;
const MatchMaking = require("./utils/MatchMaking").MatchPlayer;
const playerManager = require('./utils/PlayerDataManager');
const makePlayer = require('./utils/connectPlayer');
const PORT = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
const path = require("path");

require("./gameplay/sendsocket").sendSocket(io.sockets);
const AuthRoute     = require('./routes/AuthRoutes') 
const UserRoutes    = require('./routes/UserRoutes')


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data

app.use('/auth',AuthRoute)
app.use('/user',UserRoutes)



let onlineUserQ = [];
const maxPlayerInARoom = 7;
debug("$server started$");

//----------------------
io.on("connection", (socket) => {
  debug("a user connected " + socket.id);
  onEnterLobby(socket);
  RegisterPlayer(socket);
  DissConnect(socket);
})

function onEnterLobby(socket){
  socket.on(events.onEnterLobby, (data) => {
    debug("Player Enter to lobby");
    makePlayer.registeToLobby({
      socketId:socket.id,
      playerId:data[commonVar.playerId]
    });
  })
}

function DissConnect(socket) {
  socket.on("disconnect", () => {
    debug(socket.id + " disconnected");
    makePlayer.exitToLobby(socket.id);
    playerManager.RemovePlayer(socket.id);
  })
}


function RegisterPlayer(socket) {
  socket.on(events.RegisterPlayer, (data) => {
    debug("RegisterPlayer");
    debug(data[commonVar.playerId]);
    let playerObj = {
      socket: socket,
      profilePic: data[commonVar.profilePic],
      playerId: data[commonVar.playerId],
      gameId: data[commonVar.gameId],
      balance: data[commonVar.balance],
    };
    MatchMaking(playerObj)
  })
}

app.get("/servertesting", (req, res) => {
  res.sendFile(path.join(__dirname + '/test.html'));
});

app.get("/test",(req,res)=>{
res.send('test')
});

http.listen(PORT, () => {
  debug("listening on " + PORT);
});
