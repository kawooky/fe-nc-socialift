const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")


app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "http://localhost:19006",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    // let socketIDs = [...io.sockets.sockets.keys()]

    // socket.emit('sockets', {socketIDs})



    // socket.on("join_room", (data) => {
    //     console.log(data)
    //     socket.join(data)
    // })

    // socket.on("send_message", (data) => {
    //     socket.to(data.room).emit("receive_message", data)
    // })

        socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })

    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id} `);
    })
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})