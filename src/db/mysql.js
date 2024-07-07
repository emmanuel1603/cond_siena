const mysql = require('mysql');
const config = require('../config');
const dbconfig = {
host: config.mysql.host,
user:config.mysql.user,
password:config.mysql.password,
database:config.mysql.database,

}


let conection;

function conmysql(){
    conection = mysql.createConnection(dbconfig);
    conection.connect((err)=>{
        if(err){
            console.log('[db err]',err);
                setTimeout(conmysql,200)
            }else{
                console.log('dbconectada!')
            }
});
conection.on('error', err =>{
    console.log('[db err]',err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        conmysql();
    }else{
        throw err;
    }
});
}
conmysql();
function todos (tabla){
    return new Promise((resolve,reject)=>{
        conection.query(`SELECT * FROM ${tabla}`,(error,result)=>{
            return error ? reject(error):
            resolve(result)

        })
    });

}

function uno (tabla, id){
    return new Promise((resolve,reject)=>{
        conection.query(`SELECT * FROM ${tabla} WHERE id=${id}`,(error,result)=>{
            return error ? reject(error):
            resolve(result)

        })
    });


}

function agregar (tabla, data){
    
    return new Promise((resolve,reject)=>{
        conection.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,[data,data], (error,result)=>{
            return error ? reject(error):
            resolve(result)


        })
    });
    

}


function eliminar (tabla, data){
    
    return new Promise((resolve,reject)=>{
        conection.query(`DELETE FROM ${tabla} WHERE id  = ?`, data.id, (error,result)=>{
            return error ? reject(error):
            resolve(result)

        })
    });
}


function query (tabla, consulta){
    
        return new Promise((resolve,reject)=>{
            
            conection.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error,result)=>{
                return error ? reject(error):  resolve(result[0]);

    
            })
        });


}

module.exports={
    todos,
    uno,
    agregar,
    eliminar,
    query
}
