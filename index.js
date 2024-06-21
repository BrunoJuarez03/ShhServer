const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors')

app.use(cors());

const Port = process.env.PORT || 3001;

const ip = process.env.IP || "localhost";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:'http://localhost:3000',
    }
})

io.on("connection", (socket)=>{
    socket.on("send_message", (data) =>{
        io.emit("receive_message", data)
    })

    socket.on("UserJoin", (data) =>{
        io.emit("User_Joined", data)
    })
})

server.listen(Port, ip,()=>{
    console.log("server is running.")
});