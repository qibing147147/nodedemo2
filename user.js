const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./mongoose');
//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/zqb');
// mongoose.connect("mongodb://dn_dba:pwd_song@101.200.129.112:27017/vue_shop_lesson", { auto_reconnect: true });

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});
router.post("/addUser", (req, res, next) => {
    let name = req.body.name;
    let age = req.body.age;
    console.log(age);
    User.update({name: name},{name:name, age:age},{upsert:true},(err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    })
});
module.exports = router;