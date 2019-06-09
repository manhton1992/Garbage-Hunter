import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import config from 'config';

/** AWS configuration */
AWS.config.update({
    secretAccessKey: config.get('aws.AWS_SECRET_ACCESS'),
    accessKeyId: config.get('aws.AWS_ACCESS_KEY'),
    region: config.get('aws.AWS_S3_REGION'),
});

const s3 = new AWS.S3();

/** filter function to allow only image's type being uploaded */
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
};

/** upload function from multer & multer-s3 */
export const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: config.get('aws.AWS_S3_BUCKET_NAME'),
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
