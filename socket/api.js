const axios = require('axios')
const fetch = axios.create({
    baseURL: 'http://localhost:8080',
    timeOut: 5000
})

const OfflineDriver = (email) =>
    fetch.put('/users/offline', {
        email: email
    })

const OnlineDriver = (email) =>
    fetch.put(`/users/online`, {
        email: email
    })

module.exports = {
    OnlineDriver,
    OfflineDriver
}