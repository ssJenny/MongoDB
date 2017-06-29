/**
 * Created by Administrator on 2017/6/28.
 */
var express = require("express");
var mongoClient = require("mongodb").MongoClient
var assert = require("assert");

var app = express();
var url = 'mongodb://localhost:27017/studentdb'

app.get("/", function (req, res) {


    //连接数据库
    mongoClient.connect(url, function (err, db) {
        if(err){
            console.log("数据库连接失败")
            return;
        }

        // 插入数据
        db.collection("student").insertOne({"name":"李四"}, function (err, data ) {
            if(err){
                console.log("插入失败");
                return;
            }
            res.send("数据库连接成功")
            db.close();

        })

    })
})

app.listen(4000);