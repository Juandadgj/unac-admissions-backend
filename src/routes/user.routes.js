import { Router } from 'express';
import {
    signup,
    signin,
    updateUser,
    deleteUser
} from '../controller/user.controller';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.post('/signup', verifyToken, signup);

router.post('/signin', signin);

router.put('/user', verifyToken, updateUser);

router.delete('/user', verifyToken, deleteUser);

export default router;
