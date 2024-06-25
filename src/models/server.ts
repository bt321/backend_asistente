import express, {Application} from 'express';
import routesRutina from '../routes/rutina';
import routesUser from '../routes/user';
import routesPasswd from '../routes/actualizarPasswd';
import routesObjetivo from '../routes/objetivo';
import routesHome from '../routes/home';
import routesDieta from '../routes/dieta';
import db from '../db/connection';
import { Rutina } from './rutina';
import cors from 'cors';

 
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
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('App corriendo en el puerto ' + this.port);
        })
    }
    routes(){ 
        this.app.use('/api/rutina', routesRutina);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/passwd', routesPasswd);
        this.app.use('/api/objetivo', routesObjetivo);
        this.app.use('/api/home', routesHome);
        this.app.use('/api/dieta', routesDieta);
    }
    midlewares(){ 
        this.app.use(express.json()); 
 
        //CORS
        this.app.use(cors());
    }
    async dbConnect(){ 
        try{
            await db.authenticate();
            console.log('Base de datos conectada')  

        } catch(error){
            console.error('no se ha podido conectar a la base de datos: ', error);

        }
    }

} 
 
export default Server;  