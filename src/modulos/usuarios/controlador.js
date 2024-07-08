const db = require('../../db/mysql');
const auth = require('../auth');
const TABLA = 'unidades';

const TABLA2 = 'usuarios';
module.exports=function(dbInyectada){
 let db=dbInyectada;
 if(!db){
    db=require('../../db/mysql');
 }
}


module.exports =function(fb) {
    function todos(){
        return db.joinTodos(TABLA,TABLA2)
    }
    
    function uno(id){
      return db.join(TABLA,TABLA2,id)
      //  return db.uno(TABLA, id)
    }
    async function agregar(body){
        const usuario ={
            id:body.id,
            nombre:body.nombre,
            apellido:body.apellido,
            email:body.email,
            telefono:body.telefono,
            cedula:body.cedula,
            rol:body.rol,
            activo:body.activo
        }
        const respuesta = await db.agregar(TABLA2, usuario);
        console.log('respuesta',respuesta)
        var insertId = 0;
        if(body.id==0){
            insertId=respuesta.insertId;
        }else{
            insertId=body.id;
        }
        var respuesta2 = '';
        if(body.usuario||body.password){
            respuesta2 = await auth.agregar({
                id:insertId,
                usuario:body.usuario,
                password:body.password

            })
        }
        return respuesta2;
    }
    async function agregarVarios(body) {
        const usuarios = body.Hoja1; // asumiendo que el array de usuarios está en la propiedad Hoja1
        const resultados = [];
      
        for (const usuario of usuarios) {
          const nuevoUsuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            cedula: usuario.cedula,
            rol: usuario.rol,
            activo: usuario.activo
          };
      
          const respuesta = await db.agregar(TABLA, nuevoUsuario);
          console.log('respuesta', respuesta);
          var insertId = 0;
          if (usuario.id === 0) {
            insertId = respuesta.insertId;
          } else {
            insertId = usuario.id;
          }
      
          var respuesta2 = '';
          if (usuario.usuario || usuario.password) {
            respuesta2 = await auth.agregar({
              id: insertId,
              usuario: usuario.usuario,
              password: usuario.password
            });
          }
      
          resultados.push(respuesta2);
        }
      
        return resultados;
      }
    function eliminar(body){
        return db.eliminar(TABLA, body)
    }

    return{
        todos,
        uno,
        eliminar,
        agregar,
        agregarVarios
    }


}
