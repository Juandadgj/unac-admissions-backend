import { Router } from "express";
import {
    allProcess,
    processByID
} from "../controller/process.controller";

const router = Router();

router.get('/process', allProcess);

router.get('/process/:id', processByID);

export default router;
