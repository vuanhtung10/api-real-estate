const mediaRouter = require('express').Router();
const { uploadImage } = require('../utils/upload-s3.js'); 
mediaRouter.post('/upload-single-image-thumnail', uploadImage.single('image'), function(req, res, next) {
  try {
    console.log('req.file', req.file)
    req.file.imagePath = req.file.location
    res.send(req.file);
  } catch (error) {
    console.log('error', error)
  }
  
})

module.exports = mediaRouter;