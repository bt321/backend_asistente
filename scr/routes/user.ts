import {Router} from 'express';
import { comprobarUser, getDatosPersonales, loginUser, newUser, updateDatosPersonales, updateDescanso, updateMusculos, updateTipoEjer, } from '../controllers/user';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.post('/comprobarUser', comprobarUser);
router.post('/updateDescanso', updateDescanso);
router.post('/updateMusculos', updateMusculos); 
router.post('/updateTipoEjer', updateTipoEjer);
router.get('/getDatosPersonales', getDatosPersonales);
router.post('/updateDatosPersonales', updateDatosPersonales)

export default router