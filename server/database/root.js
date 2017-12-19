const express = require('express')
const axios = require('axios')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"
const Promise = require('bluebird')

// const CreateCollection = (collection, callback) => {
//     MongoClient.connect(url, (err, db) => {
//         if (err) {
//             callback(err, null)
//         } else {
//             db.createCollection(collection, function (err, res) {
//                 if (err) throw err;
//                 console.log("Collection created!");
//                 db.close();
//                 callback(null, res)
//             });
//         }
//     })
// }
const ConnectDB = (callback) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            return callback(err, null)
        } else {
            return callback(null, client)
        }
    })
}
class Root {
    constructor(collection) {
        this.router = router
        this.collection = collection
        this.dbName = "barg"
    }
    BeforeUpdate(fields) {
        if (!fileds['modified']) fields['modified'] = new Date()
        return fields
    }
    BeforeInsert(fields) {
        if (!fields['created_at']) fields['created_at'] = new Date()
        return fields
    }
    check(callback) {
        ConnectDB((err, client) => {
            if (err) return callback(err, null)
            return callback(null, client)
        })
    }
    find(params, query) {
        const d = Promise.defer()
        ConnectDB((err, client) => {
            if (err) throw err
            const db = client.db(this.dbName)
            db.collection(this.collection).find(params, query == null ? {} : query).toArray((err, data) => {
                err ? d.reject(err) :
                    d.resolve(data)
                client.close()
            })
        })
        return d.promise;
    }
    insert(params, callback) {
        const d = Promise.defer()
        params = this.BeforeInsert(params)
        ConnectDB((err, client) => {
            if (err) throw err
            const db = client.db(this.dbName)
            db.collection(this.collection).insert(params, (err, data) => {
                err ? d.reject(err) :
                    d.resolve(data)
                client.close()
            })
        })
        return d.promise;
    }
    update(params, query) {
        const d = Promise.defer()
        params = this.BeforeUpdate(params)
        ConnectDB((err, client) => {
            if (err) throw err
            const db = client.db(this.dbName)
            db.collection(this.collection).update(params, query, (err, data) => {
                err ? d.reject(err) :
                    d.resolve(data)
                client.close()
            })
        })
    }
    findOne(params) {
        const d = Promise.defer()
        ConnectDB((err, client) => {
            if (err) throw err
            const db = client.db(this.dbName)
            db.collection(this.collection).findOne(params, (err, data) => {
                err ? d.reject(err) :
                    d.resolve(data)
                client.close()
            })
        })
        return d.promise;
    }
}
module.exports = Root