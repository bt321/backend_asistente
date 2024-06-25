import {Request, Response, Router} from 'express';
import { Rutina } from '../models/rutina';
import jwt from 'jsonwebtoken'
import { User } from '../models/user';
import { MusculosEntreno } from '../models/musculosentreno';
import { DiasDescanso } from '../models/diasdescanso';
import { TipoEjercicio } from '../models/tipoejercicio';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const router = Router();
export const actualizarPasswd = async(req: Request, res: Response) =>{
    const data = req.body
    
    const tokenOld = data.token;
    const decoded: any = jwt.verify(tokenOld, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    
    //const contraUser = await User.findOne({ attributes: ['password'], where: { username: username}})
    const user: any = await User.findOne({where: { username: username}});
    
    
    console.log(user.password)
    const passwordvalid = await bcrypt.compare(data.oldPasswd, user.password);
    if(!passwordvalid){
        return res.status(400).json({
           msg: 'Contraseña antigua incorrecta'
        }) 
    }
    const hashPassword = await bcrypt.hash(data.newPasswd, 10);
    await User.update( 
        {   
          password: hashPassword  
          
        },
        {
          where: { 
            username: username
          } 
        }
      );
      const token = jwt.sign({
        username : username},
        process.env.SECRET_KEY || 'holamundo123');
        res.json(token);  

}

export const recuperarPasswd = async(req: Request, res: Response) =>{
  const datos = req.body;

  try {
    // Verificar si el email existe en la base de datos
    const user = await User.findOne({ where:  {email : datos.email} });

    if (!user) {
      return res.status(404).json({ message: 'Email no encontrado' });
    }

    
    // Generar un token JWT para la recuperación de la contraseña
    const token = jwt.sign({
      username : datos.username},
      process.env.SECRET_KEY || 'holamundo123');

    // Crear el enlace de recuperación
    const resetLink = `http://localhost:4200/recuperarPasswd2?token=${token}`;


    // Configurar el correo electrónico
    const mailOptions = {
      from: 'asistentenutricionalfitness@gmail.com',
      to: datos.email,
      subject: 'Recuperación de contraseña',
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
      html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer contraseña</a></p>`
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'asistentenutricionalfitness@gmail.com',
        pass: 'plho olvi tnjk myij'
      }
    });
    
    

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo de recuperación enviado', token });
  } catch (error) {
    console.error('Error al enviar correo de recuperación:', error);
    res.status(500).json({ message: 'Error al enviar correo de recuperación' });
  }
}

export const actualizarPasswd2 = async(req: Request, res: Response) =>{
  const data = req.body
  console.log(data)
  const tokenOld = data.token;
  const decoded: any = jwt.verify(tokenOld, process.env.SECRET_KEY || 'holamundo123');
  const username = decoded.username;
  console.log(username)
  //const contraUser = await User.findOne({ attributes: ['password'], where: { username: username}})  
  
  const hashPassword = await bcrypt.hash(data.newPasswd, 10);
  await User.update( 
      {   
        password: hashPassword  
        
      },
      {
        where: { 
          username: username
        } 
      }
    );
    const token = jwt.sign({
      username : username},
      process.env.SECRET_KEY || 'holamundo123');
      res.json(token);  



}