import aws from 'aws-sdk';

const region = process.env.REACT_APP_AWS_S3_REGION;

export const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
const accessKeyId= process.env.REACT_APP_AWS_S3_PUBLIC_KEY;
const secretAccessKey= process.env.REACT_APP_AWS_S3_PRIVATE_KEY;

export const uid =  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const s3 = new aws.S3({
  bucketName, region, accessKeyId, secretAccessKey, signatureVersion: 'v4'
});

export const transformFileName = (file) => {
    const filename = file.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const fileExtension = file.name.split('.').pop();
    // Define the image name
    let mainImgName = filename + '-' + uid + '.' + fileExtension;

    return mainImgName;
  }

export const uploadImageBlob = async (blob) => {

  const file = new File([blob], blob.name)

  try {

    const params = ({
      Body: file,
      Bucket: bucketName,
      Key: transformFileName(file),
      Expires: 60
    })

    return await s3.upload(params).promise()

  } catch (err) {

    console.log(err.message);
  }
};


export const uploadImageFile = async (file) => {

  try {
    const params = ({
      Body: file,
      Bucket: bucketName,
      Key: transformFileName(file),
      Expires: 60
    })

    return await s3.upload(params).promise()

  } catch (e) {

    console.log(e.message);
  }
};

export const deleteImageFromS3 = async (key) => {

  return new Promise((resolve, reject) => {
  try {
    const params = { Bucket: bucketName, Key: key }
    s3.deleteObject(params, function(err, data) {
      if (err) reject(err);
      // an error occurred
      else resolve(data); // successful response
  });

  } catch (err) {

    reject(err);
  }

 });
}
