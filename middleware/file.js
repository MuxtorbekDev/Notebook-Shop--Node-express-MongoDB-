const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const imageFilter = ["image/png", "image/jpg", "image/jpeg"];

const filterFile = (req, file, cb) => {
  if (imageFilter.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  filterFile,
});
