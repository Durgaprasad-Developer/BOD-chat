import express from 'express';
import http from 'http';
import cors from "cors";
import {Server} from 'socket.io';

const app = express()

const server = http.createServer(app);
app.use(cors({origin: "http://localhost:5173"}))

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket)=>{

    socket.on("send_message", (data)=>{
        console.log("Message recieved by ", socket.id , " ", data)

    io.emit("receive_message", data);
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected ", socket.id);
    })
})



app.get('/', (req, res)=>{
    console.log("server started");
})

server.listen(8000, ()=>{
    console.log("server listening");
})