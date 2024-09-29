"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const stream_1 = require("stream");
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Upload an image to Cloudinary and return the URL.
 * @param options - Options for uploading the image
 * @returns A promise that resolves to the image URL
 */
const uploadImageToCloudinary = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder: options.folder,
            public_id: options.publicId,
        };
        if (typeof options.file === 'string') {
            // Handle file path or URL
            cloudinary_1.default.v2.uploader.upload(options.file, uploadOptions, (error, result) => {
                if (error) {
                    return reject(new Error(`Failed to upload image: ${error.message}`));
                }
                resolve(result ? result.secure_url : '');
            });
        }
        else {
            const readableStream = new stream_1.Readable();
            readableStream.push(options.file);
            readableStream.push(null);
            cloudinary_1.default.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    return reject(new Error(`Failed to upload image: ${error.message}`));
                }
                resolve(result ? result.secure_url : '');
            }).end(readableStream.read());
        }
    });
});
exports.default = uploadImageToCloudinary;
