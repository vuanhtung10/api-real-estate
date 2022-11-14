const mediaRouter = require('express').Router();
const { uploadImage } = require('../utils/upload-s3.js'); 
mediaRouter.post('/upload-single-image-thumnail', uploadImage.single('image'), function(req, res, next) {
  try {
    req.file.imagePath = req.file.location
    res.send(req.file);
  } catch (error) {
    console.log('error', error)
  }
})
mediaRouter.post('/upload-single-image', uploadImage.single('image'), function(req, res, next) {
  try {
    req.file.imagePath = req.file.location
    res.send(req.file);
  } catch (error) {
    console.log('error', error)
  }
})
module.exports = mediaRouter;