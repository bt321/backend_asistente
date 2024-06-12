import {Router} from 'express';
import validateToken from './validate-token';
import { actualizarDieta, getDieta } from '../controllers/dieta';

const router = Router();

router.get('/' ,getDieta);
router.get('/actualizarDieta' ,actualizarDieta);

export default router  