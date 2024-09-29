import cloudinary from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadImageOptions {
  file: string | Buffer;
  folder?: string;
  publicId?: string;
}

/**
 * Upload an image to Cloudinary and return the URL.
 * @param options - Options for uploading the image
 * @returns A promise that resolves to the image URL
 */
const uploadImageToCloudinary = async (options: UploadImageOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: cloudinary.UploadApiOptions = {
      folder: options.folder,
      public_id: options.publicId,
    };

    if (typeof options.file === 'string') {
      // Handle file path or URL
      cloudinary.v2.uploader.upload(options.file, uploadOptions, (error, result) => {
        if (error) {
          return reject(new Error(`Failed to upload image: ${error.message}`));
        }
        resolve(result ? result.secure_url : '');
      });
    } else {
      const readableStream = new Readable();
      readableStream.push(options.file);
      readableStream.push(null); 
      cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) {
          return reject(new Error(`Failed to upload image: ${error.message}`));
        }
        resolve(result ? result.secure_url : '');
      }).end(readableStream.read());
    }
  });
};

export default uploadImageToCloudinary;
