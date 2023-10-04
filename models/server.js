const express = require('express')
const cors = require('cors');

class Server {
    constructor(){
        this.app=express();
        this.port = process.env.PORT;
        this.userPath= '/api/users'
        //midlewares
        this.middlewares();
        //routes
        this.routes();
    }
    middlewares(){
        //Directorio publico
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
        
        this.app.use(express.static('public'));

    }
    routes(){
       this.app.use(this.userPath,require('../routes/user.routes'));
    }
    listen(){
        this.app.listen(this.port, () => {
        console.log(`Server on port ${this.port}`)
      })
    }

}

module.exports = Server;