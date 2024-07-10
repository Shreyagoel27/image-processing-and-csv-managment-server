import axios from "axios";
import sharp from "sharp";
import fs from "fs";
import path, { resolve } from "path";
import fastcsv from "fast-csv";
import Product from "../models/ProductModel.js";
import {
  deleteFileFromPathService,
  fileUploadService,
} from "./commonService.js";

export const imageProcess = async (product) => {
  if (!product.inputImageUrls) {
    return "Image URL is required.";
  }

  try {
    const response = await axios({
      url: product?.inputImageUrls,
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data, "binary");
    const compressedImageBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 50 })
      .toBuffer();

    const timestamp = new Date().getTime();

    const fileName = `${timestamp}compressed.jpg`;
    const uploadPath = path.join("./uploads", fileName);
    fs.writeFileSync(uploadPath, compressedImageBuffer);

    const result = await fileUploadService(
      uploadPath,
      fileName,
      "output",
      false,
      "jpg",
    );

    product.outputImageUrls = result.Location;
    product.status = "Processed";
    await product.save();

    await deleteFileFromPathService(uploadPath);
    return;
  } catch (error) {
    console.error("err");
  }
};

export const createCsv = async (id) => {
  try {
    const products = await Product.find({
      userId: id,
    });

    const result = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const obj = {
        "S.NO": product.S_NO,
        Name: product.Name,
        "Input Image Urls": product.inputImageUrls,
        "Output Image Urls": product.outputImageUrls,
      };

      result.push(obj);
    }
    const timestamp = new Date().getTime();

    const filePath = path.join("./uploads", `${timestamp}_results.csv`);
    const ws = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      fastcsv
        .write(result, { headers: true })
        .on("error", (err) => {
          console.error("Error writing to CSV file:", err);
          reject(err);
        })
        .on("finish", () => {
          console.log("CSV file created successfully", filePath);
          resolve(filePath);
        })
        .pipe(ws);
    });
  } catch (error) {
    console.error(error);
  }
};
