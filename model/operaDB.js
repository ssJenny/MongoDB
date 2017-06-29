/**
 * Created by Administrator on 2017/6/28.
 */
var setUrl = require("../setUrl.js")
var MongoClient = require('mongodb').MongoClient;

//连接数据库
function connectdb(callback) {
    MongoClient.connect(setUrl.url, function (err, db){
        if(err){
            callback(err,null)
            return
        }
        callback(null,db)
    })
}


exports.findInfo = function (collectionName,callback) {

    connectdb(function (err,db) {
        var cursor = db.collection(collectionName).find();
        var result = [];

        //遍历查询结果
        cursor.each(function (err, doc) {

            if(err){
                callback(err,null)
                return
            }

            if(doc != null){
                result.push(doc)
            }else{

                callback(null,result)
                db.close();

            }
        })
    })
}

exports.addInfo = function (collectionName, dataJson, callback) {
    connectdb(function (err, db) {
        db.collection(collectionName).insertOne(dataJson,function(err,doc){
            if(err){
               callback(err, null)
                return;
            }
            callback(null, doc)
            db.close();
        })

    })
}

exports.removeOne = function (collectionName, condition, callback) {
    connectdb(function (err, db) {
       try {
           db.collection(collectionName).deleteOne(condition);

           callback(null,true);
       }catch (err){
           callback(err,false)
       }
    })
}