import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import {
    allRequest,
    createRequest,
    approveRequest
} from "../controller/request.controller";

const router = Router();

router.get('/request', verifyToken, allRequest);

router.post('/request', verifyToken, createRequest);

router.post('/approve-request/:id', verifyToken, approveRequest);

export default router;
