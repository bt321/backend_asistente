import {Router} from 'express';
import validateToken from './validate-token';
import { actualizarDieta, getDieta } from '../controllers/dieta';

const router = Router();

router.get('/' , validateToken, getDieta);
router.get('/actualizarDieta' , validateToken, actualizarDieta);

export default router  