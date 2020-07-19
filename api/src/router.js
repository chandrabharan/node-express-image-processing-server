const {Router} = require('express');
const router = Router();
const multer = require('multer');
const storage = multer.diskStorage(
    {destination: 'api/uploads/', filename: filename});

const upload = multer({fileFilter: fileFilter, storage: storage});

/**
 *
 * @param {*} request
 * @param {*} file
 * @param {*} callback
 */
function filename(request, file, callback) {
  callback(null, file.originalname);
}

/**
 *
 * @param {*} request
 * @param {*} file
 * @param {*} callback
 */
function fileFilter(request, file, callback) {
  if (file.mimetype !== 'image/png') {
    request.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
  } else {
    callback(null, true);
  }
}

router.post('/upload', upload.single('photo'), (request, response)=>{
  if (request.fileValidationError) {
    response.status(400).json({error: request.fileValidationError});
  }
  response.status(201).json({success: true});
});

module.exports = router;

