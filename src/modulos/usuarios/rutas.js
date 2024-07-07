const express = require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');
const controlador= require('./index');
//const { agregar } = require('../../db/mysql');
//const { eliminar } = require('../../db/mysql');
const router = express.Router();

router.get('/',todos);
router.get('/:id',uno);
router.post('/varios',seguridad(),agregarVarios);
router.post('/',seguridad(),agregar);
router.put('/',seguridad(),eliminar);
async function todos (req, res){
    try{  
    const items = await controlador.todos();
    
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, items, 500);
    
    }
    
};

async function uno (req, res){
try{    const items = await controlador.uno(req.params.id);
    respuesta.success(req, res, items, 200);

}catch(err){
    respuesta.error(req, res, err, 500);

}

    
    
};

async function agregar(req, res){
    try{    const items = await controlador.agregar(req.body);
        
        if(req.body.id==0){
            message = 'Item guardado con exito';
        }
        else{message = 'Item actualizado con exito'}
        respuesta.success(req, res, message, 201);
    
    }catch(err){
        respuesta.error(req, res, err, 500);
    
    }
}
    async function agregarVarios(req, res){
        try{    const items = await controlador.agregarVarios(req.body);
            
            if(req.body.id==0){
                message = 'Item guardado con exito';
            }
            else{message = 'Item actualizado con exito'}
            respuesta.success(req, res, message, 201);
        
        }catch(err){
            respuesta.error(req, res, err, 500);
        
        }

    
        
        
    };



async function eliminar (req, res, next){
    try{    const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'item eliminado sactisfactoriamente', 200);
    
    }catch(err){
        next(err);
    }
    
        
        
    };

module.exports=router;