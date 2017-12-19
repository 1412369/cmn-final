const Root = require('./root')
const Model = require('../database')

class Phone extends Root {
    constructor(){
        super()
        this.router.get('/',this.CheckStatus.bind(this))
        this.router.post('/login', this.Login.bind(this))
        this.router.post('/register', this.Register.bind(this))
        return this.router

    }
    CheckStatus(req,res,next){
        Model.Phone.check((err,result)=>{
            if(err) throw err
            res.send("phone connect success!")
        })
    }
    Login(req,res,next){
        const params= req.body
        const {email,password} = params
        if(!validate.isEmail(email))  throw Error("Wrong email type!")
        if(!password) throw Error("Invalid password!")
        Model.User.findOne({"email":email,role:"phone"})
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
        params.role="phone"
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
        return new Phone()
    }
}

module.exports = Phone.GetRouter()