import {Request, Response, Router} from 'express';
import { Rutina } from '../models/rutina';
import jwt from 'jsonwebtoken'
import { User } from '../models/user';
import { MusculosEntreno } from '../models/musculosentreno';
import { DiasDescanso } from '../models/diasdescanso';
import { TipoEjercicio } from '../models/tipoejercicio';
const axios = require('axios');
const router = Router();
const datosRegistro : any = {
    datosPersonales:{},
    objetivo:{},
    diasDescanso:{},
    musculoentreno:{},
    musculo_desarrollo:'',
    parteFuerte:'',
    otrasPartes:'',
    tipoEjercicios:{}
}

export const generarRutina = async(req: Request, res: Response) => {
    const {datosPersonales, musculoentreno, objetivo, diasDescanso, tipoEjercicios}  = req.body;
    
    const diasArray: string[] = diasDescanso.dias_semana.split(', ').map((dia: string) => dia.trim());
    
    const tipoEjercicioArray: string[] = tipoEjercicios.split(', ').map((tipo: string) => tipo.trim());
    const otrasPartesArray: string[] = musculoentreno.otros_musculos.split(', ').map((tipo: string) => tipo.trim());
    console.log(diasArray)
    console.log(tipoEjercicioArray) 
    console.log('ESTOY AQUIIIIIIIIII')
    
    let dias_entreno: number;
    if (diasArray[0] == ""){
        dias_entreno = 7
    } else{
        dias_entreno = 7 - diasArray.length
    }
    //let dias_entreno: number = diasArray.length === 0 ? 7 : 7 - diasArray.length

    const datosRutina : any = {
        parte_desarrollo: musculoentreno.musculo_desarrollo,
        parte_fuerte: musculoentreno.musculo_fuerte,
        otras_partes: otrasPartesArray,
        dias_entreno: dias_entreno, 
        level: datosPersonales.nivel_experiencia,
        tipo_ejercicio: tipoEjercicioArray
    } 
    console.log(datosRutina) 
    try {
        const response = await axios.post('http://127.0.0.1:5000/rutina', datosRutina)
        res.json(response.data);
        const rutinas = response.data;
        const dias_smn = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
        let dias_entreno: string[] = dias_smn.filter(dia => !diasArray.includes(dia));
        for (let i = 0; i < rutinas.length; i++) {
            const rutina = rutinas[i];
            const dia = dias_entreno[i];
            await Rutina.create({
                username_usuario: datosPersonales.username,
                rutina_dia: rutina,
                dias_semana: dia

            }); 
        }
 
    } catch (error) { 
        res.status(500).json({ error: 'no se pudo acceder a flask' });
    }
} 

export const getRutina = async(req: Request, res: Response) => {
    console.log(`aqui estoy :${req.headers.authorization}`)
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(`aqui estoy :${username}`)


  try{ 
    const listRutina = await Rutina.findAll({where: { username_usuario: username}})
    console.log(listRutina)
    res.json(listRutina)
} catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutinas' });
}

}

export const actualizarRutina = async(req: Request, res: Response) => {
    console.log(`aqui estoy :${req.headers.authorization}`)
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(`aqui estoy :${username}`)
    
  try{ 
    const parte_desarrollo = await MusculosEntreno.findAll({ attributes: ['musculo_desarrollo'], where: { username_usuario: username}});
    const musculo_fuerte = await MusculosEntreno.findAll({ attributes: ['musculo_fuerte'], where: { username_usuario: username}});
    const otros_musculos = await MusculosEntreno.findAll({ attributes: ['otros_musculos'], where: { username_usuario: username}});
    const diasDescanso = await DiasDescanso.findAll({ attributes: ['dias_semana'], where: { username_usuario: username}});
    const level = await User.findAll({ attributes: ['nivel_experiencia'], where: { username: username}});
    const routine = await Rutina.findAll({ attributes: ['rutina_id'], where: { username_usuario: username}});
    const tipoEjercicio = await TipoEjercicio.findAll({ attributes: ['tipoEjercicio'], where: { username_usuario: username}});
    
    //const diasDescanso2 = diasDescanso.map(diasDescanso => diasDescanso.dataValues.dias_semana)
    //console.log('los dias de descanso son: ',diasDescanso2.length)
    
    const diasDescanso2 = diasDescanso.map(diasDescanso => diasDescanso.dataValues.dias_semana).flatMap(dias => dias.split(', '));
    
    const tipoEjercicio2 = tipoEjercicio.map(tipoEjercicio => tipoEjercicio.dataValues.tipoEjercicio).flatMap(tipo => tipo.split(', '));
    const otraspartes2 = otros_musculos.map(otros_musculos => otros_musculos.dataValues.otros_musculos).flatMap(otro => otro.split(', '));
    const routine2 = routine.map(routine => routine.dataValues.rutina_id);

    //let dias_entreno2: number = diasDescanso2.length === 0 ? 7 : 7 - diasDescanso2.length
    let dias_entreno2: number;
    if (diasDescanso2[0] == ""){
        dias_entreno2 = 7
    } else{
        dias_entreno2 = 7 - diasDescanso2.length
    }
    console.log('el numero de dias de descanso es: ',diasDescanso2.length)
    console.log(`Hola soy los dias de descanso: ${diasDescanso2}`)
    const datosRutina : any = {
        parte_desarrollo: parte_desarrollo.map(parte_desarrollo => parte_desarrollo.dataValues.musculo_desarrollo),
        parte_fuerte: musculo_fuerte.map(musculo_fuerte => musculo_fuerte.dataValues.musculo_fuerte),
        otras_partes: otraspartes2,  
        dias_entreno: dias_entreno2,
        level: level.map(level => level.dataValues.nivel_experiencia), 
        tipo_ejercicio: tipoEjercicio2 
    } 
    console.log(datosRutina)
    console.log(routine2) 

    const response = await axios.post('http://127.0.0.1:5000/rutinaActualizar', datosRutina)
        res.json(response.data); 
        console.log(response.data)  
        
        const rutinas = response.data;
        const dias_smn = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
        let dias_entreno: string[] = dias_smn.filter(dia => !diasDescanso2.includes(dia));
        console.log(dias_entreno)
        await Rutina.destroy({
            where: { username_usuario: username }
          })
        for (let i = 0; i < rutinas.length; i++) {
            const rutina = rutinas[i];
            const dia = dias_entreno[i]; 
            const id =  routine2[i]
            await Rutina.create( 
                {   
                  rutina_dia: rutina,  
                  dias_semana: dia,
                  username_usuario: username
                }
              );  
        }  
  
} catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutinas' }); 
}
  
}  
