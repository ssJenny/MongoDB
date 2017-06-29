/**
 * Created by Administrator on 2017/6/28.
 */
var express = require("express")
var operaDB = require("./model/operaDB.js")
var bodyParser  = require("body-parser")

var app = express();

app.use(bodyParser.urlencoded({extended:false}))

//设置模板引擎
app.set("view engine","ejs");

app.get("/add", function (req, res) {
    res.render("add")
})


app.get("/", function (req, res,next) {
    operaDB.findInfo("student", function (err, result) {
        if(err){
            console.log(err)
            next()
            return
        }

        res.render("index",{
            "studentData":result
        })
        res.end();
    })
})

app.post("/addInfor", function (req, res) {

    var dataJson = {
        "name":req.body.name,
        "age":req.body.age,
        "hobby":req.body.hobby,
        "score": {
            "yuwen": req.body.yuwen,
            "shuxue": req.body.shuxue
        }
    }
    operaDB.addInfo("student",dataJson,function (err,result) {
        if(err){
            console.log(err)
            return
        }

        res.redirect("/")
        res.end()
    })
})



app.get("/:delid", function (req, res) {

    var condition = {
        "_id":req.params.delid
    }
    console.log(condition)
    operaDB.removeOne("student",condition,function (err, boolean) {
        if(err){
            console.log(err);
            return
        }
        console.log(boolean)
        res.redirect("/")
        res.end()


    })

})



app.listen(3000)