const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

// Disk storage configuration for multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/upload");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, name) => {
      console.log(name);
      let fn = name.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

// Export Upload Variable

const upload = multer({ storage: storage });

module.exports = upload;
