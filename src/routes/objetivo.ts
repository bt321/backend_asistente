import {Router} from 'express';
import validateToken from './validate-token';
import { getObjetivo, updateObjetivo } from '../controllers/objetivo';

const router = Router();

router.get('/' , validateToken, getObjetivo);
router.post('/updateObjetivo' ,updateObjetivo)

export default router