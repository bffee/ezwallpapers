const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Set up storage engine (you can also use diskStorage to control file naming)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/images/profile_pictures/`)
    },
    filename: function (req, file, cb) {
        const filename = `${req.body.username}${path.extname(file.originalname)}`;
        cb(null, filename)
    }
  })

// Initialize multer with the storage configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // Limit the file size (e.g., 15MB)
  },
  fileFilter: (req, file, cb) => {
    // Allow only certain file types
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed.'));
  }
});

module.exports = upload;
