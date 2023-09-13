import {Router} from 'express';
import { authCredentialsDriver } from '../controllers/driver/auth_driver/auth_driver';
import { getDrivers, getStateDriver } from '../controllers/driver/crud_driver/get_driver';
import { infoDriver, infoVehicle } from '../controllers/driver/crud_driver/info_driver';
import { postDriver, stateDriver ,postDriverRequest} from '../controllers/driver/crud_driver/post_driver';
import { updateDriver, updateDriverPhoto, updateVehicle } from '../controllers/driver/crud_driver/update_driver';
import uploadImage from '../middlewares/imagemulter'
import { postdriver_validator } from '../validators/driver';
const fs = require("fs");
const path = require("path");
let multer = require('multer');
let formdata = multer();

const router = Router();
router.post(    
    "/",
    uploadImage,    
    postdriver_validator,
    postDriver,
);

router.post(
    "/registro",   
     [formdata.fields([])],
    postDriverRequest,
);

router.get(
    "/",
    getDrivers,
);

router.post(
    "/updatephoto",
    multer({}).single('foto'), function(req, res) {
        req.body.foto = saveImage(req.file);
        updateDriverPhoto(req,res)
    }
);
router.post(
    "/updatedriver",
    [formdata.fields([])],
    updateDriver
);
router.post(
    "/updatevehicle",
    [formdata.fields([])],
    updateVehicle
);
router.post(
    "/infodriver",
    [formdata.fields([])],
    infoDriver
);
router.post(
    "/infovehiculo",
    [formdata.fields([])],
    infoVehicle

);
router.post(
    "/auth",
    [formdata.fields([])],
    authCredentialsDriver,
);
router.post(
    "/getstate",
    [formdata.fields([])],
    getStateDriver
);
router.post(
    "/state",
    [formdata.fields([])],
    stateDriver
);
function makeid(length: Number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < charactersLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

function saveImage  (data:any) {
    const {originalname, buffer}  = data
    const fileName = originalname.replace(/\s/g, "");
    let finalName =Date.now() + "-vespro-" + makeid(8) + path.extname(fileName);
    fs.writeFile(path.join(__dirname, "../public/images/" + finalName),  buffer, (error:any) => {})
    return finalName
  }

export default router;
