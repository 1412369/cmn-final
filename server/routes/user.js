const Root = require('./root')
const Model = require('../database')

class User extends Root {
    constructor() {
        super()
        this.router.get('/', this.CheckStatus.bind(this))
        this.router.post('/login', this.Login.bind(this))
        this.router.post('/register', this.Register.bind(this))
        return this.router

    }
    CheckStatus(req, res, next) {
        Model.User.check((err,result)=>{
            if(err) throw err
            res.send("user connect success!")
        })
    }
    Login(req,res,next){
        const data= req.body
        console.log(data)
    }
    Register(req,res,next){
        const params = req.body
        Model.User.insert(params,(err,result)=>{
            if(err) throw err
            res.send(result)
        })
    }
    static GetRouter() {
        return new User()
    }
}

module.exports = User.GetRouter()