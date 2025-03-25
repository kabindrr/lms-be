import { unlink } from "fs";
import { resolve } from "path";
//deletes the file\
export const deleteFiles = (filePath) => {
  try {
    unlink(resolve(filePath), () => {
      console.log(filePath, "has been deleted");
    });
  } catch (error) {
    console.log(error);
  }
};

//is it single file or array of files to be deleted
export const deleteUploadedFiles = (req) => {
  //single file
  if (req.file) {
    deleteFiles(req.file.path);
    return;
  }

  if (req.files) {
    req.files.map((f) => deleteFiles(f.path));
  }
};
