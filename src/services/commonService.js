import fs from "fs";
import AWS from "aws-sdk";
import { config } from "../../config/index.js";
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

export const fileUploadService = async (
  filePath,
  nameOfFile,
  bucketFolder,
  downloadable = false,
  type,
) => {
  try {
    console.log(filePath, nameOfFile, bucketFolder, downloadable, type);
    const s3 = new AWS.S3();
    const path = filePath;
    const buffer = fs.readFileSync(path);
    const fileName = nameOfFile;

    const params = {
      Body: buffer,
      Bucket: config.AWS_BUCKET_NAME,
      ContentType: type,
      Key: `${bucketFolder}/${fileName}.${type}`,
    };

    if (downloadable === true) {
      params.ContentDisposition = "attachment";
    }

    let result = await s3.upload(params).promise();

    return result;
  } catch (err) {
    console.error(err);
  }
};

export const deleteFileFromPathService = async (path) => {
  try {
    // Delete File
    fs.unlink(path, () => {});

    // Resolve Promise
    return Promise.resolve();
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};
