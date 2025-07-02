const multer = require("multer");
const path = require("path");

const uploadPath = path.resolve(__dirname, "../../public/image");

console.log("Upload path:", uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
