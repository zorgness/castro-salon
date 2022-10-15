import aws from 'aws-sdk';
import crypto from 'crypto';



  const region = process.env.AWS_S3_REGION;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const publicKey = process.env.AWS_S3_PUBLIC_KEY;
  const privateKey = process.env.AWS_S3_PRIVATE_KEY;

  const s3 = new aws.S3({

    region, publicKey, privateKey, signatureVersion: 'v4'
  })

    const generateUploadUrl = async () =>  {
    const ranBytes = await crypto.randomBytes(16);
    const imageName = ranBytes.toString('hex');

    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
  }


  export default generateUploadUrl;
