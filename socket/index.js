var app = require("http").createServer();
const io = require("socket.io")(app);
const config = require("./config");


io.on('connection',(socket)=>{
    
})
app.listen(8000,(err)=>{
    if(err) throw err
    console.log("Socket is running")
})