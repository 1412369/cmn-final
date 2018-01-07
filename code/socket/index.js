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
    OnlineDriver,
    Pair
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
                    io.to(value.id).emit(Driver.ONLINE, response.data.message)
                }
            })
            .catch(err => console.error(err))
        Drivers.set(client_id, {
            id: socket.id,
            status: "free"
        })
    })
    socket.on(Client.POINT, (client_id) => {})
    socket.on(Client.LOCATE, (client_id) => {
        console.log(`Connected: ${client_id},${socket.id}`)
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
                io.to(value.id).emit(Phone.NEW_ADDRESS, address)
                Locaters.set(key, {
                    id: value.id,
                    status: "busy"
                })
                break;
            }
        }
    })
    // Pair Driver With Location
    socket.on(Driver.DRIVER_MOVE,(payload)=>{
        console.log("move",payload)
        const driver = Drivers.get(payload.email)
        console.log(Drivers,driver)
        for (let [key, value] of Locaters) {
            io.to(value.id).emit(Driver.DRIVER_MOVE, payload)
        }
        io.to(driver.id).emit(Driver.DRIVER_MOVE,payload)
    })
    socket.on(Locate.PAIR, (payload) => {
        const driver_value = Drivers.get(payload.driver.email)
        const locator_value = Locaters.get(payload.locator.email)
        const data = {
            driver: payload.driver,
            locator: payload.locator
        }
        Pair(data, payload._id).then(response => {
            io.to(driver_value.id).emit(Locate.PAIR,response.data.message)
            io.to(locator_value.id).emit(Locate.PAIR)
            Drivers.set(driver_value.email, {
                id: driver_value.id,
                status: "busy"
            })
            Locaters.set(locator_value.email, {
                id: locator_value.id,
                status: "free"
            })
        }).catch(err => {
            throw err
        })

    })
    socket.on("disconnect", (reason) => {
        for (let [key, value] of Drivers) {
            if (value.id === socket.id) {
                console.log(`Bye: ${key}`)
                OfflineDriver(key)
                    .then(response => {
                        for (let [key, value] of Locaters) {
                            io.to(value.id).emit(Driver.OFFLINE, response.data.message.driver_id)
                        }
                    })
                    .catch(err => console.error(err))
                break;
            }
        }
    })
})
server.listen(8000, (err) => {
    if (err) throw err
    console.log("Socket is running")
})