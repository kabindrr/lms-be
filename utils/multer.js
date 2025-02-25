import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const filePathDestination = path.join(__dirname, "public/images");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check if directory exist or not if no then create new folder

    !fs.existsSync(filePathDestination) &&
      fs.mkdirSync(filePathDestination, { recursive: true });

    cb(null, filePathDestination);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = uniqueSuffix + "-" + file.originalname;
    cb(null, filePath);
  },
});

//multer filter for controlling which files are accepted

const fileFilter = (req, file, cb) => {
  const allowedFileType = /jpeg|jpg|png|jif|webp/;
  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFileType.test(extName);
  const mimetype = allowedFileType.test(file.mimetype);

  if (isAllowedExt && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only /jpeg|jpg|png|jif|webp/ file type allowed"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});
