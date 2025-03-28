const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Set up storage engine (you can also use diskStorage to control file naming)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            if(!fs.existsSync(`./public/images/wallpapers/${req?.user?.username}`)){
                fs.mkdirSync(`./public/images/wallpapers/${req?.user?.username}`, { recursive: true });
                console.log('Directory created successfully (Sync)');
            }
          } catch (err) {
            console.error('Error creating directory (Sync):', err); // Handles error
          }
        cb(null, `./public/images/wallpapers/${req?.user?.username}`)
    },
    filename: function (req, file, cb) {
        cb(null, `${req?.user?.upload ? req.user.upload + 1 : 1}_${file.originalname}`)
    }
  })

// Initialize multer with the storage configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // Limit the file size (e.g., 5MB)
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
