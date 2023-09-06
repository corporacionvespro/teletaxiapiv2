import {Router} from 'express';
import { infoRequest } from '../controllers/request/actions_request/actions_request';
import { aceptRequest,aceptTemporal,updateLocationDriver,updateRequestConfirm } from '../controllers/request/crud_request/acept_request';
import { cancelRequest } from '../controllers/request/crud_request/cancel_request';
import { finishRequest, opinion, opinionConductor } from '../controllers/request/crud_request/finish_request';
import { getRequest, getRequestPending, getRequestToday, getRequestTotal,deleteTemporal, getRequestTemporals } from '../controllers/request/crud_request/get_request';
import { postRequest,postRequestTemporal,isActiveCity } from '../controllers/request/crud_request/post_request';
import { postRequestWeb } from '../controllers/request/crud_request/post_requestweb';
import { stateDriveRequest } from '../controllers/request/crud_request/state_driver_request';
import { statePassengerRequest } from '../controllers/request/crud_request/state_passenger_request';
import { request_validator } from '../validators/request';

let multer = require('multer');
let formdata = multer();

const router = Router();
router.post(
    "/",
    [formdata.fields([])],
    request_validator,
    postRequest,
);
router.post(
    "/temporal",
    [formdata.fields([])],
    postRequestTemporal,
);
router.post(
    "/isactive",
    [formdata.fields([])],
    isActiveCity,
);
router.post(
    "/deletetemporal",
    [formdata.fields([])],
    deleteTemporal,
);


router.get( 
    "/temporal/:id_solicitud",      
    [formdata.fields([])],
              
    getRequestTemporals,

);
    

router.post(
    "/web",
    [formdata.fields([])],
    postRequestWeb,
);
router.post(
    "/info",
    [formdata.fields([])],
    infoRequest,
);
router.post(
    "/aceptar",
    [formdata.fields([])],
    aceptRequest,
);
router.post(
    "/aceptartemporal",
    [formdata.fields([])],
    aceptTemporal,
);
router.post(
    "/confirmartemporal",
    [formdata.fields([])],
    updateRequestConfirm,
);
router.post(
    "/updatelocation",
    [formdata.fields([])],
    updateLocationDriver,
);

router.post(
    "/finalizar",
    [formdata.fields([])],
    finishRequest,
);
router.post(
    "/opinion",
    [formdata.fields([])],
    opinion,
);
router.post(
    "/opinionconductor",
    [formdata.fields([])],
    opinionConductor,
);
router.post(
    "/driverstate",
    [formdata.fields([])],
    stateDriveRequest,
);
router.post(
    "/passengerstate",
    [formdata.fields([])],
    statePassengerRequest,
);
router.post(
    "/delete",
    [formdata.fields([])],
    cancelRequest,
);
router.get(
    "/",
    getRequest,
);
router.get(
    "/pendientes",
    getRequestPending,
);


router.get(
    "/total",
    getRequestTotal,
);
router.get(
    "/today",
    getRequestToday,
);


export default router;
