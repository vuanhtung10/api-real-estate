const multer = require("multer");
const {formatDateTime} = require('./changeDateTime.service');
const moment = require('moment');

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './media/logo-business');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname +'-'+moment().valueOf()+ '-' + file.originalname);
    }
});

exports.imageFilter = imageFilter;
exports.storage = storage;