const Root = require('./root')
const Model = require('../database')
const validate = require('validator')
const jwt = require('jsonwebtoken')
const {
    comparePassword,
    cryptPassword,
    GenerateToken,
    VerifiedToken
} = require('../ulti/auth')
const {
    JWT_SERCRET
} = require('../config')
class User extends Root {
    constructor() {
        super()
        this.router.get('/', this.CheckStatus.bind(this))
        this.router.post('/login', this.Login.bind(this))
        this.router.post('/register', this.Register.bind(this))
        return this.router

    }
    CheckStatus(req, res, next) {
        Model.User.check((err, result) => {
            if (err) throw err
            res.send("user connect success!")
        })
    }
    Login(req, res, next) {
        const params = req.body
        let current_user={}
        const {
            email,
            password
        } = params
        if (!validate.isEmail(email)) return this.HandleErr(res,400,"Wrong email type!")
        if (!password) return this.HandleErr(res,400,"Wrong password!")
        Model.User.findOne({
                "email": email
            })
            .then(result => {
                !result && this.HandleErr(res,400,"User not found!")
                current_user = result
                return comparePassword(password, result.password)
            })
            .then(match => {
                console.log("current",current_user)
                match ?
                    GenerateToken({
                        email
                    }).then(token => this.HandleResult(res, 200, {
                        token: token,
                        user: current_user.name
                    })).catch(err => this.HandleErr(res, 400, err)) :
                    this.HandleErr(res, 403, "Password wrong!")

            })
            .catch(err => {
                throw err
            })
    }
    Register(req, res, next) {
        const params = req.body
        const {
            email,
            password
        } = params
            !validate.isEmail(email) && this.HandleErr(res, 403, "Invalid email")
        Model.User.findOne({
                "email": email
            })
            .then(user => {
                user && this.HandleErr(res, 400, "This email already taken!")
                return cryptPassword(password)
            })
            .then(result => {
                params.password = result
                return Model.User.insert(params)
            })
            .then(result => {
                this.HandleResult(res, 200, result.ops[0])
            })
            .catch(err => {
                this.HandleErr(res, 403, err)
            })
    }
    static GetRouter() {
        return new User()
    }
}

module.exports = User.GetRouter()