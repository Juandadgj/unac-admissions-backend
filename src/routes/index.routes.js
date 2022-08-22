import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to UNAC API! :D');
});

export default router;