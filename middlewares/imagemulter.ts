import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    let extension = Date.now() + "-vespro-" + makeid(8) + path.extname(fileName);
    cb(null, extension);
    req.body.foto = `${extension}`;
  },
});
const uploadImage = multer({
  fileFilter: (req, file, cb) => {
    var filetypes = /jpeg|jpg|png|svg/;
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      cb(null, true);
    } else {
      req.body.foto = null;
      cb(null, false);
    }
  },
  storage,
}).single("foto");


function makeid(length: Number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export default uploadImage;
