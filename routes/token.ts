import {Router} from 'express';
import { getTokensDrivers } from '../controllers/token/crud_token/getDriverTokens';
import { getTokensPassengers } from '../controllers/token/crud_token/getPassengerToken';
import { postToken } from '../controllers/token/crud_token/postToken';
import { pushCustomNotifyDriver, pushNotifyDriver } from '../controllers/token/notification/pushDrivers';
import { pushNotifyPassenger } from '../controllers/token/notification/pushPassenger';

let multer = require('multer');
let formdata = multer();

const router = Router();
router.post(
    "/",
    [formdata.fields([])],
    postToken,
);

router.post(
    "/pushpassenger",
    [formdata.fields([])],
    pushNotifyPassenger,
);
router.post(
    "/pushdriver",
    [formdata.fields([])],
    pushNotifyDriver,
);
router.post(
    "/pushcustomdriver",
    [formdata.fields([])],
    pushCustomNotifyDriver,
);
router.get(
    "/",
    getTokensDrivers,
);
router.get(
    "/passengers",
    getTokensPassengers,
);

export default router;
