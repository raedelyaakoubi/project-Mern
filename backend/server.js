const express = require('express')
const dbConnect = require('./dbConnect/dbConnect')
const userRoute = require('./routes/userRoutes')
const chatRoute = require ('./routes/chatRoutes')
const messageRoute =  require ('./routes/messageRoute')
const app = express()
const cors = require('cors')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
require('dotenv').config()
dbConnect()


app.use(cors())
app.use(express.json())
app.use('/api/user' , userRoute)
app.use('/api/chat', chatRoute)
app.use('/api/message', messageRoute)
app.use(notFound);
app.use(errorHandler)

const server= app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
const io = require('socket.io')(server , {
    pingTimeout: 60000,
    cors:{

        origin: "http://localhost:3000",
    }
   
});
io.on("connection", (socket) =>{
    console.log("connected to socket io");
    socket.on("setup", (userData) =>{
        socket.join(userData._id);
        socket.emit("connected");
    });
    socket.on("join chat",(room) =>{
        socket.join(room);
        console.log("User Joined Room: " + room);

    });

    socket.on("typing", (room)=>{socket.in(room).emit("typing")});
    socket.on("stop typing", (room)=>{socket.in(room).emit("stop typing")});




    
    socket.on("new message",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach(user =>{
            if(user._id == newMessageRecieved.sender._id) return ;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })


    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

})

