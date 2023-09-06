import {Router} from 'express';
import { authCredentials } from '../controllers/passenger/auth_passenger/auth_credentials';
import { postSocialMedia } from '../controllers/passenger/auth_passenger/auth_socialmedia';
import { postPassenger, resetPassenger } from '../controllers/passenger/crud_passenger/post_passengerr';
import { postAuthOpt } from '../controllers/passenger/auth_passenger/auth_optsms';
import { auth_credentials, getplace_validator, postplace_validator, register_optsms, register_socialmedia, register_validator, update_validator } from '../validators/passenger';
import { updatePassenger } from '../controllers/passenger/crud_passenger/update_passenger';
import { postPlaces } from '../controllers/passenger/crud_places/post_places';
import { getPlaces } from '../controllers/passenger/crud_places/get_places';
import { deletePlace } from '../controllers/passenger/crud_places/delete_places';
import { searchPassenger } from '../controllers/passenger/crud_passenger/search_passenger';

let multer = require('multer');
let formdata = multer();

const router = Router();
router.post(
    "/register",
    [formdata.fields([])],
    register_validator,
    postPassenger
);

router.post(
    "/authsocialmedia",
    [formdata.fields([])],
    register_socialmedia,
    postSocialMedia
);

router.post(
    "/authoptsms",
    [formdata.fields([])],
    register_optsms,
    postAuthOpt
);
router.post(
    "/search",
    [formdata.fields([])],
    searchPassenger
);

//Auth Methods
router.post(
    "/authcredentials",
    [formdata.fields([])],
    auth_credentials,
    authCredentials
);
router.post(
    "/update",
    [formdata.fields([])],
    update_validator,
    updatePassenger
);
router.post(
    "/places",
    [formdata.fields([])],
    postplace_validator,
  //  validaJWTPassenger,
    postPlaces,
);
router.post(
    "/delete",
    [formdata.fields([])],
     deletePlace,
);

router.post(
    "/getplaces",
    [formdata.fields([])],
    getplace_validator,
    getPlaces,
);

//reset password
 router.post(
    "/resetpassword",
    [formdata.fields([])],
    resetPassenger
);


export default router;
