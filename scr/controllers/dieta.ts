import {Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken'
import { Objetivo } from '../models/objetivo';
import { Dieta } from '../models/dieta';

export const getDieta = async(req: Request, res: Response) => {
    console.log(`aqui estoy :${req.headers.authorization}`)
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    const objetivos = await Objetivo.findAll({ attributes: ['tipo_objetivo'], where: { username_usuarios: username}})
    const tipo_objetivo =  objetivos.map(objetivos => objetivos.dataValues.tipo_objetivo).flatMap(tipo => tipo.split(', '));

    //funcion para seleccionar 7 elementos de forma aleatoria
    function getRandomElements<T>(sourceArray: T[], count: number): T[] {
        return sourceArray
            .sort(() => 0.5 - Math.random())  // Ordenar la lista aleatoriamente
            .slice(0, count);                // Tomar los primeros 'count' elementos
    }

    try{ 
        const dietas_disponibles = await Dieta.findAll({where: { tipo_objetivo: tipo_objetivo}})
        //const listaDieta = getRandomElements(dietas_disponibles,7)
        console.log(dietas_disponibles)
        res.json(dietas_disponibles) 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las dietas' });
    }
    
    
} 
export const actualizarDieta = async(req: Request, res: Response) => {
    console.log(`aqui estoy :${req.headers.authorization}`)
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    const objetivos = await Objetivo.findAll({ attributes: ['tipo_objetivo'], where: { username_usuarios: username}})
    const tipo_objetivo =  objetivos.map(objetivos => objetivos.dataValues.tipo_objetivo).flatMap(tipo => tipo.split(', '));

    //funcion para seleccionar 7 elementos de forma aleatoria
    function getRandomElements<T>(sourceArray: T[], count: number): T[] {
        return sourceArray
            .sort(() => 0.5 - Math.random())  // Ordenar la lista aleatoriamente
            .slice(0, count);                // Tomar los primeros 'count' elementos
    }

    try{ 
        const dietas_disponibles = await Dieta.findAll({where: { tipo_objetivo: tipo_objetivo}})
        const listaDieta = getRandomElements(dietas_disponibles,7)
        console.log(listaDieta)
        res.json(listaDieta) 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las dietas' });
    }
    
    
}