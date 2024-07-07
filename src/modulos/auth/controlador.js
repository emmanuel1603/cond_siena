const db = require('../../db/mysql');
const argon2 = require('argon2');
const auth = require('../../auth');


const TABLA = 'auth';
const TABLA2 = 'usuarios';
module.exports=function(dbInyectada){
 let db=dbInyectada;
 if(!db){
    db=require('../../db/mysql');
 }
}


module.exports =function(fb) {
    async function login(usuario,password){
        const data = await db.query(TABLA, {usuario: usuario});
        const datarol = await db.uno(TABLA2, data.id);
        console.log(datarol[0].rol);
        return await argon2.verify(data.password,password)
        .then(resultado=>{
            if(resultado === true){
            if(datarol[0].id===data.id){
                console.log('si es la misma id');

            }
               
               
                return{ 
                
                token: auth.asignarToken({...data}),
                rol:datarol[0].rol
                
        }

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