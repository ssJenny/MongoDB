/**
 * Created by Administrator on 2017/6/28.
 */
var express = require("express");
var mongoClient = require("mongodb").MongoClient
var bodyParser  = require("body-parser");

var app = express();
var url = 'mongodb://localhost:27017/studentdb';

app.use(bodyParser.urlencoded({extended:false}))

//设置模板引擎
app.set("view engine","ejs");

app.get("/add", function (req, res) {
    res.render("add")
})


app.get("/", function (req, res,next) {

    //连接数据库
    mongoClient.connect(url, function (err, db) {
        if(err){
            console.log("数据库连接失败")
            next();
            return;
        }

        //查询数据
        var cursor = db.collection("student").find();
        var result = [];

        //遍历查询结果
        cursor.each(function (err, doc) {

            if(err){
                console.log(err)
                return
            }

            if(doc != null){
                result.push(doc)
            }else{


                res.render("index",{
                    'studentData':result
                })
                db.close();
                res.end();
            }
        })
    })
})

app.post("/addInfor", function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if(err){
            console.log("数据库连接失败")
            return;
        }
        console.log(req.body)
        db.collection("student").insertOne({
            "name":req.body.name,
            "age":req.body.age,
            "hobby":req.body.hobby,
            "score":{
                "yuwen":req.body.yuwen,
                "shuxue":req.body.shuxue
            }
        },function(err,doc){
            if(err){
                console.log(err);
                return;
            }
            db.close();
            res.redirect("/")
            res.end()
        })
    })
})


app.get("/:delid", function (req, res) {
    //console.log(req.params.delid);
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("数据库连接失败")
            return;
        }
        db.collection("student").deleteOne({
            "_id":req.params.delid
        },function (err, result) {
            if(err){
                console.log(err);
                return;
            }
            db.close();
            res.redirect("/")
            res.end()
        })

    })



})



app.listen(3000)