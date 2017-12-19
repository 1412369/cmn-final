const Root = require('./root')
const Model = require('../database')
class Driver extends Root{
    constructor(){
        super()
        this.router.get('/',this.CheckStatus.bind(this))
        this.router.post('/login', this.Login.bind(this))
        this.router.post('/register', this.Register.bind(this))
        return this.router

    }
    CheckStatus(req,res,next){
        Model.Driver.check((err,result)=>{
            if(err) throw err
            res.send("driver connect success!")
        })
    }
    Login(req,res,next){
        const params= req.body
        const {email,password} = params
        if(!validate.isEmail(email))  throw Error("Wrong email type!")
        if(!password) throw Error("Invalid password!")
        Model.User.findOne({"email":email,"role":"driver"})
        .then(result=>{
            return comparePassword(password,result.password)
        })
        .then(match=>{
            match ? res.send("login success!") : res.send("login failure!")
            
        })
        .catch(err=>{
            throw err
        })
    }
    Register(req,res,next){
        const params = req.body
        const {email,password} = params
        if(!validate.isEmail(email))  throw Error("Wrong email type!")
        params.role="driver"
        cryptPassword(password)
        .then(result=>{
            params.password = result
            console.log(params)
            return Model.User.insert(params)
        })
        .then(result=>{
            res.send(result.ops[0])
        })
        .catch(err=>{
            throw err
        })
        
       
    }
    static GetRouter(){
        return new Driver()
    }
}

module.exports = Driver.GetRouter()