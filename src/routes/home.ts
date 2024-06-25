import {Router} from 'express';
import validateToken from './validate-token';
import { getDatosUser } from '../controllers/home';

const router = Router();

router.get('/' , validateToken, getDatosUser);

export default router