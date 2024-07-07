const db = require('../../db/mysql');
const argon2 = require('argon2');
const auth = require('../../auth');

const TABLA = 'auth';
module.exports=function(dbInyectada){
 let db=dbInyectada;
 if(!db){
    db=require('../../db/mysql');
 }
}


module.exports =function(fb) {
    async function login(usuario,password){
        const data = await db.query(TABLA, {usuario: usuario});
        console.log(data.password);
        return await argon2.verify(data.password,password)
        .then(resultado=>{
            if(resultado === true){
                //generar token
                return auth.asignarToken({...data})

            }else{
                throw new Error('información invalida');
            }
        })     
    }

    async function agregar(data){
        const authData ={
            id:data.id,
        }
        if(data.usuario){
            authData.usuario=data.usuario
        }

        if(data.password){
            authData.password= await argon2.hash(data.password.toString(),5);
        }    
        return db.agregar(TABLA, authData)
    }
    
    


    return{

        agregar,
        login
    }
    



}