var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: 'QR3FjtwMWkcmr9ytLe5huNGzhw3K4WBA0ynFucYu',
  accessKeyId: 'AKIATPMX33RKGIVZ2FOR',
// secretAccessKey: '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',
// accessKeyId: 'AKIATPMX33RKI6LIAYUX',
// secretAccessKey: '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',
// accessKeyId: 'AKIATPMX33RKLVOKOPU4',
  region: 'ap-southeast-1'
});

// const S3_BUCKET = 'd2t-fashion';
const s3 = new aws.S3();

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadImage = multer({
    fileFilter: imageFilter,
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: 'real-estate-vn',
        // metadata: function (req, file, cb) {
        //     cb(null, {fieldName: file.fieldname});
        //   },
        key(req, file, cb) {
            console.log('file', file)
            const patt = /\.[0-9a-z]+$/i
            const fileExtension = file.originalname.match(patt)[0]
            cb(null, `upload/${Date.now().toString()}${fileExtension}`)
        },
    }),
})  

exports.uploadImage = uploadImage;