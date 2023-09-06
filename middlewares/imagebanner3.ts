import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    var fileNameNotExtension = fileName.replace(/\.(jpg|jpeg|png)$/, "");

    let extension = "banner3"+".png"
    cb(null, extension);
    req.body.foto = `${extension}`;
  },
});
const uploadImage3 = multer({
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





export default uploadImage3;
