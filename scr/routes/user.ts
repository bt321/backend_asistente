import {Router} from 'express';
import { comprobarUser, getDatosPersonales, loginUser, newUser, updateDatosPersonales, updateDescanso, updateMusculos, updateTipoEjer, } from '../controllers/user';
import validateToken from './validate-token';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.post('/comprobarUser', comprobarUser);
router.post('/updateDescanso', updateDescanso);
router.post('/updateMusculos', updateMusculos); 
router.post('/updateTipoEjer', updateTipoEjer);
router.get('/getDatosPersonales', validateToken, getDatosPersonales);
router.post('/updateDatosPersonales', updateDatosPersonales)

export default router