require('dotenv').config();

module.exports = {
    app:{
            port:process.env.PORT || 4000,
    },
    jwt:{
        secret:process.env.JET_SECRET||'notasecreta!'
    },

    mysql:{
        host:process.env.MYSQL_HOST || 'localhost',
        user:process.env.MYSQL_USER || 'root',
        port:process.env.MYSQL_PORT || '43244',
        password:process.env.MYSQL_PASSWORD || '',
        database:process.env.MYSQL_DB || 'cond_siena',
}    
}

  /* mysql:{
        host:'roundhouse.proxy.rlwy.net',
        port:43244,
        user:'root',
        password:'slKCIsHIbZrxxGOZnUhufWvrnjfbDgpo',
        database:'railway',
        connectTimeout: 20000 // increase the timeout to 10 seconds
}    
}*/