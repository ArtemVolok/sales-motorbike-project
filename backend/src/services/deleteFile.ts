import fs from 'fs/promises';

const findAndDeleteFile = async (pathToImage: string) => {
  try {
    await fs.unlink(pathToImage);
  } catch (err) {
    console.error('Error:', err);
  }
};

export default findAndDeleteFile;
