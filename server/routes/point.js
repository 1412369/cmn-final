const Root = require('./root')
const Model = require('../database')

class Point extends Root {
    constructor() {
        super()
        this.router.get('/', this.CheckStatus.bind(this))
        return this.router

    }
    CheckStatus(req, res, next) {
        Model.Point.check((err,result)=>{
            if(err) throw err
            res.send("point connect success!")
        })
    }
    static GetRouter() {
        return new Point()
    }
}

module.exports = Point.GetRouter()