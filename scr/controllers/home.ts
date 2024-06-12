import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import { MusculosEntreno } from '../models/musculosentreno';
import { Objetivo } from '../models/objetivo';
import { TipoEjercicio } from '../models/tipoejercicio';
import { User } from '../models/user';
import { DiasDescanso } from '../models/diasdescanso';

export const getDatosUser = async(req: Request, res: Response) => {
    console.log(`aqui estoy :${req.headers.authorization}`)
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(`aqui estoy :${username}`)


  try{ 
    const MusculoEntreno = await MusculosEntreno.findAll({where: { username_usuario: username}})
    console.log(MusculoEntreno)
    const tipoEjercicios = await TipoEjercicio.findAll({where: { username_usuario: username}})
    console.log(tipoEjercicios)
    const user = await User.findAll({where: { username: username}})
    console.log(user)
    const objetivos = await Objetivo.findAll({where: { username_usuarios: username}})
    console.log(objetivos)
    const diasDescanso = await DiasDescanso.findAll({where: { username_usuario: username}})
    console.log(diasDescanso)
    const DatosUser = {
        MusculoEntreno: MusculoEntreno,
        tipoEjercicios: tipoEjercicios,
        user: user,
        objetivos: objetivos,
        diasDescanso: diasDescanso
    }
    res.json(DatosUser)
} catch (error) { 
    res.status(500).json({ error: 'Error al obtener las rutinas' });
}


} 