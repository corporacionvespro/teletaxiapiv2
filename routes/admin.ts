import {Router} from 'express';
import { authSystem } from '../controllers/administrator/auth/auth_system';
import { postAdministrator } from '../controllers/administrator/crud/post_administrator';
import { getPassenger } from '../controllers/passenger/crud_passenger/get_passenger';
import { register_admin , auth_admin} from '../validators/admin';

let multer = require('multer');
let formdata = multer();

const router = Router();
router.post(
    "/register",
    [formdata.fields([])],
    register_admin,
    postAdministrator,
);
router.get(
    "/passengers",
    getPassenger,
);
router.post(
    "/auth",
    [formdata.fields([])],
    auth_admin,
    authSystem,
);
export default router;
