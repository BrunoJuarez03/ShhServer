const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors')

app.use(cors());

const Port = process.env.PORT || 10000;


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:'https://sprightly-seahorse-75fe0c.netlify.app/'
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

server.listen(Port, ()=>{
    console.log("server is running.")
});

//https://shhserver.onrender.com