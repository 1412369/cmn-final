const express = require('express')

class Root {
    constructor() {
        this.router =  express.Router()
    }
    HandleResult(res, status, data) {

    }
    HandleErr(res, status, err) {

    }
}
module.exports = Root