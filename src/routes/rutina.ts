import {Router} from 'express';
import { actualizarRutina, generarRutina, getRutina } from '../controllers/rutina';
import validateToken from './validate-token';

const router = Router();

router.post('/' ,generarRutina);
router.get('/getRutina', validateToken ,getRutina);
router.get('/actualizarRutina', validateToken , actualizarRutina);

export default router;