const auth = require("../../auth")
const db = require('../../db/mysql');


module.exports = function checkauth(){
    function middleware(req,res, next){
        const id = req.body.id;
        auth.chequearToken.confirmarToken(req,id)
        next();
    }
    return middleware
}