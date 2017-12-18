const Root = require('./root')
const Model= require('../database')

class Locate extends Root{
    constructor(){
        super()
        this.router.get('/',this.CheckStatus.bind(this))
        return this.router
    }
    CheckStatus(req,res,next){
        Model.Locate.check((err,result)=>{
            if(err) throw err
            res.send("locate connect success!")
        })
    }
    static GetRouter(){
        return new Locate()
    }
}

module.exports = Locate.GetRouter()