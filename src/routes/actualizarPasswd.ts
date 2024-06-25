import {Router} from 'express';
import validateToken from './validate-token';
import { actualizarPasswd, actualizarPasswd2, recuperarPasswd } from '../controllers/actualizarPasswd';

const router = Router();

router.post('/' , actualizarPasswd);
router.post('/recuperarPasswd' , recuperarPasswd);
router.post('/updatePasswd' , actualizarPasswd2);

export default router; 