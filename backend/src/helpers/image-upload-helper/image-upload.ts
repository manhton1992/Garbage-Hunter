import multer from 'multer';
import multerS3 from 'multer-s3';
import awsSdk from 'aws-sdk';
import config from 'config';

/** AWS configuration */
awsSdk.config.update({
	secretAccessKey: config.get('aws.AWS_SECRET_ACCESS'),
	accessKeyId: config.get('aws.AWS_ACCESS_KEY'),
	region: config.get('aws.AWS_S3_REGION'),
});

const s3 = new awsSdk.S3();

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
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, Date.now().toString());
		},
	}),
});

/** delete function for aws s3 */
export const deleteFile = (key: string) => {
	s3.deleteObject(
		{
			Bucket: config.get('aws.AWS_S3_BUCKET_NAME'),
			Key: key,
		},
		(error, data) => {
			if (error) {
				console.error('error when removing file');
			} else {
				console.log(key + ' is removed!');
			}
		}
	);
};
