var db=require('../config/connection')
var BSON = require('mongodb').BSONPure;
var collection=require('../config/collections')
var bcrypt=require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>
        {
            userData.Password= await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.insertedId)
            })
        })
        
    }
}