import aws from 'aws-sdk';

const region = process.env.REACT_APP_AWS_S3_REGION;
export const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
const accessKeyId= process.env.REACT_APP_AWS_S3_PUBLIC_KEY;
const secretAccessKey= process.env.REACT_APP_AWS_S3_PRIVATE_KEY;

export const uid =  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const s3 = new aws.S3({
  bucketName, region, accessKeyId, secretAccessKey, signatureVersion: 'v4'
});
