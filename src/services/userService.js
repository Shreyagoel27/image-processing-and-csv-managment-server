import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import fs from "fs";
import csv from "csv-parser";
import { createCsv, imageProcess } from "./img-csv-processor.js";
import {
  deleteFileFromPathService,
  fileUploadService,
} from "./commonService.js";

export const userService = async (filePath) => {
  try {
    const user = new User({
      status: "Processing",
    });

    await user.save();
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (data) => {
        const arr = data["Input Image Urls"].split(",");
        for (let i = 0; i < arr.length; i++) {
          const product = new Product({
            S_NO: data["S.NO"],
            Name: data["Product Name"],
            inputImageUrls: arr[i],
            status: "Processing",
            userId: user._id,
            createdAt: new Date(),
          });
          await product.save();
          imageProcess(product);
        }
        data.userId = user._id;
        results.push(data);
      })
      .on("end", async () => {
        user.status = "Processed";
        await user.save();
        deleteFileFromPathService(filePath);
      });
    return user.id;
  } catch (error) {
    console.error(error);
  }
};

export const userStatusService = async (id) => {
  try {
    const user = await User.findById(id);
    let result = "";

    if (user.status === "Processing") {
      result = await Product.find({ userId: id, status: "Processing" });
      return `${result.length} images are still processing`;
    }
    const createdCSV = await createCsv(id);

    const uploadCSV = await fileUploadService(
      createdCSV,
      `${id}.csv`,
      "output",
      true,
      "csv",
    );

    await deleteFileFromPathService(createdCSV);
    return uploadCSV.Location;
  } catch (error) {
    console.error(error);
  }
};
