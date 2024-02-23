/* eslint-disable import/no-extraneous-dependencies */
import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const storage: StorageEngine = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, 'src/images/');
  },

  filename(req: Request, file: Express.Multer.File, cb) {
    cb(null, uuidv4() + file.originalname.slice(-4));
  },
});

const imageTypes: string = 'image/*';

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
