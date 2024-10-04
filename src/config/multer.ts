import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});

const fileFilter = (req: any, file: any, cb: any) => {
  const ext = path.extname(file.originalname);
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    cb(new Error('File type is not supported'), false);
    return;
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
