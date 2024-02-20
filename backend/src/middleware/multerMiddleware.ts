import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, 'images/');
  },

  filename(req: Request, file: Express.Multer.File, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const imageTypes: string = 'image/png';

const typesFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (imageTypes.localeCompare(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter: typesFilter });

export default upload;
