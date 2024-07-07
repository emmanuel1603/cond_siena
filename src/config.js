require('dotenv').config();

module.exports = {
    app:{
            port:process.env.PORT || 4000,
    },
    jwt:{
        secret:process.env.JET_SECRET||'notasecreta!'
    },

    mysql:{
        host:'roundhouse.proxy.rlwy.net',
        port:43244,
        user:'root',
        password:'slKCIsHIbZrxxGOZnUhufWvrnjfbDgpo',
        database:'railway',
        connectTimeout: 20000 // increase the timeout to 10 seconds
}    
}