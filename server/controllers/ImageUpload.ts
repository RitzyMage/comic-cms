import path from "path";
import sizeOf from "image-size";
import getFileExtension from "../utils/fileExtension";
import { promises as fs } from "fs";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

export default class ImageUpload {
  public async uploadImage(image: string, index: number) {
    let extension = getFileExtension(image);
    let baseImagePath = "/img/comics";
    let imageDirectory = `${__dirname}/../../client/static${baseImagePath}`;

    let filename = `${imageDirectory}/comic-${index}.${extension}`;

    let imageData = image.split(";base64,").pop() as string;
    await fs.writeFile(filename, imageData, "base64");
    const [{ destinationPath }] = await imagemin([filename], {
      destination: imageDirectory,
      plugins: [imageminWebp({ quality: 20, resize: { height: 300, width: 0 } })],
    });

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
