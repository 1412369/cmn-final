const Root = require('./root')
const Model = require('../database')
class Driver extends Root{
    constructor(){
        super()
        this.router.get('/',this.CheckStatus.bind(this))
        return this.router

    }
    CheckStatus(req,res,next){
        Model.Driver.check((err,result)=>{
            if(err) throw err
            res.send("driver connect success!")
        })
    }
    static GetRouter(){
        return new Driver()
    }
}

module.exports = Driver.GetRouter()