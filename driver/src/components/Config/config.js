import axios from 'axios'
const Locate = {
    DONE_ADDRESS: "locate_done"
}
const Phone = {
    NEW_ADDRESS: "phone_new",
}
const Driver = {

}
const Point = {

}
const Client = {
    PHONE: "phone",
    DRIVER: "driver",
    POINT: "point",
    LOCATE: "locate"
}
const Socket = {
    Driver,
    Point,
    Locate,
    Phone
}
const serverURL = "http://localhost:8080"
const socketURL = "http://localhost:8000"
axios.defaults.baseURL = serverURL
export {
    Client,
    socketURL,
    serverURL,
    axios,
    Socket

}