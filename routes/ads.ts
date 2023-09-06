import {Router} from 'express';
import { postPhoto } from '../controllers/ads/ads';
import uploadImage1 from '../middlewares/imagebanner1'

import uploadImage2 from '../middlewares/imagebanner2'
import uploadImage3 from '../middlewares/imagebanner3'

let multer = require('multer');

const router = Router();
router.post(
    "/photo1",
    uploadImage1,    
    postPhoto,
);
router.post(
    "/photo2",
    uploadImage2,    
    postPhoto,
);
router.post(
    "/photo3",
    uploadImage3,    
    postPhoto,
);
export default router;
