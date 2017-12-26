var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const {
    Client,
    Locate,
    Phone,
    Driver
} = require("./config.js");
const {
    OfflineDriver,
    OnlineDriver
} = require('./api')
let Pointers = new Map()
let Drivers = new Map()
let Locaters = new Map()
let Phoners = new Map()
let LocationsQueue = []


io.on('connection', (socket) => {
    //==============Connection=========== 
    socket.on(Client.DRIVER, (client_id) => {
        console.log(`Connected: ${client_id}`)
        OnlineDriver(client_id)
            .then(response => {
                for (let [key, value] of Locaters) {
                    socket.to(value.id).emit(Driver.ONLINE, response.data.message)
                }
                console.log(`Online: ${client_id}`)
            })
            .catch(err => console.err(err))
        Drivers.set(client_id, {
            id: socket.id,
            status: "free"
        })
    })
    socket.on(Client.POINT, (client_id) => {})
    socket.on(Client.LOCATE, (client_id) => {
        console.log(`Connected: ${client_id}`)
        Locaters.set(client_id, {
            id: socket.id,
            status: "free"
        })
    })
    socket.on(Client.PHONE, (client_id) => {
        console.log(`Connected: ${client_id} `)
        Phoners.set(client_id, {
            id: socket.id,
            status: "free"
        })
    })
    //==============Data tranfer=========== 
    socket.on(Phone.NEW_ADDRESS, (address) => {
        for (let [key, value] of Locaters) {
            if (value.status === "free") {
                socket.to(value.id).emit(Phone.NEW_ADDRESS, address)
                Locaters.set(key, {
                    id: value.id,
                    status: "free"
                })
                break;
            }
        }
    })
    socket.on("disconnect", (reason) => {
        for (let [key, value] of Drivers) {
            if (value.id === socket.id) {
                console.log(`Bye: ${key}`)
                OfflineDriver(key)
                    .then(response => {
                        for (let [key, value] of Locaters) {
                            socket.to(value.id).emit(Driver.OFFLINE,response.data.message.driver_id)
                        }
                    })
                    .catch(err => console.err(err))
                break;
            }
        }
    })
})
server.listen(8000, (err) => {
    if (err) throw err
    console.log("Socket is running")
})