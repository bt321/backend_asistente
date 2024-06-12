import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']
    console.log(headerToken);

    if(headerToken != undefined){
        //tiene token
        //extraemos el token, usamos slice para no extraer tambien el brearer (nos coje apartir de septimo caracter)
        try {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken)
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'holamundo123')
            next()
            
        } catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            })
            
        }
       

    }else{
        res.status(401).json({
            msg : 'Acceso denegado'
        })
    }
}

export default validateToken;