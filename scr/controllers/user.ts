import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
import { Objetivo } from '../models/objetivo';
import { DiasDescanso } from '../models/diasdescanso';
import { MusculosEntreno } from '../models/musculosentreno';
import { TipoEjercicio } from '../models/tipoejercicio';


//funcion para comprobar si el usuario ya esta registrado
export const comprobarUser = async(req: Request, res: Response) => {
    const {username, password, nombre, apellidos, genero, altura, nivel_experiencia, dias_entreno} = req.body;

    //comprobamos que el usuario existe en la base de datos
    const user = await User.findOne({where: { username: username}});
    if(user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el mismo nombre ${username}`
        })
    }else{
        res.json({
            msg : `Usuario ${username} creado con exito`
        }); 
    }
} 


export const newUser = async(req: Request, res: Response) => {
    //const {username, password, nombre, apellidos, genero, altura, nivel_experiencia, dias_entreno, musculo_desarrollo} = req.body;
    const {datosPersonales, musculoentreno, objetivo, diasDescanso, tipoEjercicios}  = req.body;
    //comprobamos que el usuario existe en la base de datos
    const user = await User.findOne({where: { username: datosPersonales.username}});
    if(user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el mismo nombre ${datosPersonales.username}`
        })
    }
    const hashPassword = await bcrypt.hash(datosPersonales.password, 10);

    try { 
       //guardamos el usuario dentro de la base de datos
        await User.create({ 
            username: datosPersonales.username,
            nombre: datosPersonales.nombre,
            apellidos: datosPersonales.apellidos,
            password: hashPassword,  
            email: datosPersonales.email,
            genero: datosPersonales.genero,
            altura:datosPersonales.altura,
            nivel_experiencia:datosPersonales.nivel_experiencia
       
        });

        await Objetivo.create({
            tipo_objetivo: objetivo.tipo_objetivo,
            peso_actual: objetivo.peso_actual,
            peso_objetivo: objetivo.peso_objetivo,
            username_usuarios: datosPersonales.username

        });

        await MusculosEntreno.create({
            musculo_desarrollo:musculoentreno.musculo_desarrollo,
            musculo_fuerte: musculoentreno.musculo_fuerte,
            otros_musculos: musculoentreno.otros_musculos,
            username_usuario: datosPersonales.username 
        });

        await DiasDescanso.create({
            dias_semana: diasDescanso.dias_semana,
            username_usuario: datosPersonales.username
        });
        
        await TipoEjercicio.create({
            tipoEjercicio: tipoEjercicios,
            username_usuario: datosPersonales.username
        });

        
    
        res.json({
            msg : `Usuario ${datosPersonales.username} creado con exito`
        });
        
    } catch (error) {
        res.status(400).json({ 
            msg: `ups ocurrio un error ${datosPersonales.username}` ,
            error
        })
    }
}



export const loginUser = async(req: Request, res: Response) => {
    const {username, password} = req.body;

    
    //comprobamos que el usuario existe en la base de datos
    const user: any = await User.findOne({where: { username: username}});
    if(!user)
        return res.status(400).json({
    msg: `No existe un usuario con el nombre ${username} en la base de datos`
    })
    //validamos la contraseña
    const passwordvalid = await bcrypt.compare(password, user.password);
    console.log(passwordvalid)
    if(!passwordvalid){
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        })
    }


    //generamos token 
    const token = jwt.sign({ 
        username : username},
        process.env.SECRET_KEY || 'holamundo123');
    res.json(token);
}

export const updateDescanso = async(req: Request, res: Response) => {
    const datos = req.body;  
     
    const token = datos.token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try {
        await DiasDescanso.update( 
            {   
                dias_semana: datos.dias_descanso  
            
            },
            {
            where: { 
                username_usuario: username
            } 
            }
            
        );
        res.json({
            msg : `Usuario ${datos.username} creado con exito`
        });
    }catch (error) {
        res.status(400).json({ 
            msg: `ups ocurrio un error al actualizar dias de descanso ${datos.username}` ,
            error
        })
    }
    
}

export const updateMusculos = async(req: Request, res: Response) => {
    const datos = req.body;
    
    const token = datos.token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(username)
    try {
        await MusculosEntreno.update( 
            {    
                musculo_desarrollo: datos.data.musculo_desarrollo,
                musculo_fuerte: datos.data.musculo_fuerte,
                otros_musculos: datos.data.otros_musculos 
            
            },
            {
            where: { 
                username_usuario: username
            } 
            }
            
        );
        res.json({
            msg : `Usuario ${datos.username} creado con exito`
        });
    }catch (error) {
        res.status(400).json({ 
            msg: `ups ocurrio un error al actualizar dias de descanso ${datos.username}` ,
            error
        })
    }
}

export const updateTipoEjer = async(req: Request, res: Response) => {
    const datos = req.body;
    
    const token = datos.token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(username)
    console.log(datos)
    try {
        await TipoEjercicio.update( 
            {    
                tipoEjercicio: datos.data,
            
            },
            {
            where: { 
                username_usuario: username
            } 
            }
            
        );
        res.json({
            msg : `Usuario ${datos.username} creado con exito`
        });
    }catch (error) {
        res.status(400).json({ 
            msg: `ups ocurrio un error al actualizar tipo de ejercicios ${datos.username}` ,
            error
        })
    }
}

export const getDatosPersonales = async(req: Request, res: Response) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try{ 
        const datosPersonales = await User.findAll({where: { username: username}})
        console.log(datosPersonales)
        res.json(datosPersonales)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
}

export const updateDatosPersonales = async(req: Request, res: Response) => {
   
    
    const datos = req.body;
    console.log(datos)
    const token = datos.token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try{ 
        await User.update( 
            {    
                nombre: datos.data.nombre,
                apellidos: datos.data.apellidos,
                altura: datos.data.altura,
                genero: datos.data.genero,
                nivel_experiencia: datos.data.nivel_experiencia,
                email: datos.data.email
            
            },
            {
            where: { 
                username: username
            } 
            });
            res.json({
                msg : `Usuario ${datos.username} creado con exito`
            });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
}

 
