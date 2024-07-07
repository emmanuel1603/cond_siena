const auth = require("../../auth")

module.exports = function checkauth(){
    function middleware(req,res, next){
        const rol = req.body.id;
        auth.chequearToken.confirmarToken(req,id)
        next();
    }
    return middleware
}