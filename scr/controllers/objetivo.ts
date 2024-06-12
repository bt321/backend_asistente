import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import { Objetivo } from '../models/objetivo';

export const getObjetivo = async(req: Request, res: Response) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try{ 
        const objetivos = await Objetivo.findAll({where: { username_usuarios: username}})
        console.log(objetivos)
        res.json(objetivos)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener Objetivos' });
    }


}
export const updateObjetivo = async(req: Request, res: Response) => {
    const datos = req.body;
    console.log(datos)
    const token = datos.token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try{ 
        await Objetivo.update( 
            {    
                tipo_objetivo: datos.data.tipo_objetivo,
                peso_actual: datos.data.peso_actual,
                peso_objetivo: datos.data.peso_objetivo
            
            },
            {
            where: { 
                username_usuarios: username
            } 
            });
            res.json({
                msg : `Usuario ${datos.username} creado con exito`
            });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
}
