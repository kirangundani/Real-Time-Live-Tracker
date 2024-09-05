const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views")); // Ensure views directory is set correctly
app.use(express.static(path.join(__dirname, "public"))); // Correct middleware usage

io.on("connection", function(socket){
  socket.on("send-location",function(data){
     io.emit("receive-location",{id:socket.id,...data});
  });
socket.on("disconnect",function(){
  io.emit("user-disconnected",socket.id);
});
});

app.get("/", function(req, res){
  res.render("index"); // Ensure 'index.ejs' exists in the 'views' directory
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
