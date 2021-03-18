import path from "path";
import sizeOf from "image-size";
import getFileExtension from "../utils/fileExtension";
import { promises as fs } from "fs";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import ServerError from "../utils/ServerError";
import ClientController from "./ClientController";
import ClientError from "../utils/ClientError";

export default class ImageUpload {
  public async uploadImage(image: string, index: number) {
    let extension = getFileExtension(image);
    let baseImagePath = "/img/comics";
    let imageDirectory = `${__dirname}/../../client/static${baseImagePath}`;

    let filename = `${imageDirectory}/comic-${index}.${extension}`;

    let imageData = image.split(";base64,").pop();
    if (!imageData) {
      return new ClientError(`${imageData} is not a valid base64 image`);
    }

    let destinationPath;
    try {
      await fs.writeFile(filename, imageData, "base64");
      [{ destinationPath }] = await imagemin([filename], {
        destination: imageDirectory,
        plugins: [imageminWebp({ quality: 20, resize: { height: 300, width: 0 } })],
      });
    } catch (e) {
      return new ServerError("Could not save new images");
    }

    let lowresPath = baseImagePath + "/" + path.basename(destinationPath);
    let imagePath = baseImagePath + "/" + path.basename(filename);
    let { height = 0, width = 0 } = sizeOf(filename);

    return {
      height,
      width,
      image: imagePath,
      image_lowres: lowresPath,
    };
  }
}
