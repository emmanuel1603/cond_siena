const express = require ('express');
const config = require('./config');
const usuarios = require('./modulos/usuarios/rutas.js');
const gastos = require('./modulos/gastos/rutas.js');
const recibos = require('./modulos/recibos/rutas.js');
const unidades = require('./modulos/unidades/rutas.js');
const auth = require('./modulos/auth/rutas.js');
const morgan = require ('morgan');
const error = require('./red/errors');
const cors = require('cors');
const whitelist =['http://localhost:3000','http://localhost:3001'];

const app = express();
//middleware
//app.use(cors(corsOptions))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:whitelist}));


//config
app.set('port', config.app.port);
//rutas
app.use('/api/usuarios' , usuarios);
app.use('/api/auth' , auth);
app.use('/api/gastos' , gastos);
app.use('/api/recibos' , recibos);
app.use('/api/unidades' , unidades);

app.use(error);
module.exports = app;
