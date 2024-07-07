const jwt = require('jsonwebtoken');
config = require('../config')


const secret = config.jwt.secret;

const db = require('../db/mysql');
const TABLA2 = 'usuarios';


function asignarToken(data){

    return jwt.sign(data, secret)
}
async function verificarRol(rol){
    const decodificado = decodificarCabecera(req);
    const datarol = await db.uno(TABLA2, decodificado.id);
}
function verificarToken(token){
    return jwt.verify(token,secret);
}
const chequearToken = {
    confirmarToken:function(req,id){
        
    const decodificado = decodificarCabecera(req);
    const datarol = db.uno(TABLA2, decodificado.id);
    if(decodificado.id !==id && datarol[0].rol !== "administrador"){
        throw new Error("NO TIENES PRIVILEGIOS")
    }
    }

}


function obtenerToken(autorizacion){
    if(!autorizacion){
        throw new Error('No viene token');
    }
    if(autorizacion.indexOf('Bearer')=== -1){
        throw new Error('Formato Invalido');

    }
    let token = autorizacion.replace('Bearer ', '')
    return token
}

function decodificarCabecera(req){
    
    console.log(req.headers)
    const autorizacion = req.headers.authorization || '';

    const token = obtenerToken(autorizacion);
    const decodificado= verificarToken(token);

    req.user = decodificado;
    return decodificado;
}

module.exports={
    asignarToken,
    chequearToken
}