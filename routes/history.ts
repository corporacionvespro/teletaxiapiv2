import {Router} from 'express';
import { historyDate, historyDateDriver } from '../controllers/history/historyDate/historyDate';
import { historyDefault, historyDefaultDriver, walletDriver } from '../controllers/history/historyDefault/historyDefault';

let multer = require('multer');
let formdata = multer();

const router = Router();
router.post(
    "/",
    [formdata.fields([])],
    historyDate
);

router.post(
    "/datedriver",
    [formdata.fields([])],
    historyDateDriver
);
router.post(
    "/default",
    [formdata.fields([])],
    historyDefault
   
);
router.post(
    "/defaultdriver",
    [formdata.fields([])],
    historyDefaultDriver
);

router.post(
    "/walletDriver",
    [formdata.fields([])],
    walletDriver
);

export default router;
