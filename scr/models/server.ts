import express, {Application} from 'express';
import routesProducts from '../routes/product';
import routesUser from '../routes/user';
import sequelize from '../db/connection';
import { Product } from './product';

 
 class Server{
    private app : Application;
    private port : string;
    
    

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        console.log();
        this.midlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('App corriendo en el puerto ' + this.port);
        })
    }
    routes(){ 
        this.app.use('/api/products', routesProducts);
        this.app.use('/api/users', routesUser);
    }
    midlewares(){
        this.app.use(express.json());
    }
    async dbConnect(){ 
        try{
            await sequelize.authenticate();
            console.log('todo OK');

        } catch(error){
            console.error('no se ha podido conectar a la base de datos: ', error);

        }
    }

}

export default Server;