const express = require('express')

class Root {
    constructor() {
        this.router =  express.Router()
    }
    HandleResult(res, status, data) {
        const message={
            status,
            message:data
        }
        res.status(status).send(message)
    }
    HandleErr(res, status, err) {
        const message={
            status,
            message:err
        }
        res.status(status).send(message)
    }
}
module.exports = Root