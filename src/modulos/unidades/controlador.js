const db = require('../../db/mysql');

const TABLA = 'unidades';
const TABLA2='usuarios';
module.exports=function(dbInyectada){
 let db=dbInyectada;
 if(!db){
    db=require('../../db/mysql');
 }
}


module.exports =function(fb) {
    function todos(){
        return db.todos(TABLA)
    }
    
    function uno(id){
        return db.join(TABLA,TABLA2,id)
        //return db.uno(TABLA, id)
    }
    function agregar(body){
        return db.agregar(TABLA, body)
    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body)
    }

    return{
        todos,
        uno,
        eliminar,
        agregar,
    }


}