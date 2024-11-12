// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {

//       cb(null, file.originalname)
//     }
//   })

// export const upload = multer({ 
//     storage
// })

import multer from 'multer';

// Setup multer storage to store the file temporarily before uploading to Cloudinary
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "./public/temp")  // Temporary folder where files will be stored before Cloudinary upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Naming the file based on timestamp
  }
});

const upload = multer({ storage }).array('images', 5);  // Limiting to 5 images per upload

export { upload };
