const PATH = require("path");
const FS = require("fs/promises");
const START_FOLDER = PATH.join(__dirname, "files");
const DESTINATION_FOLDER = PATH.join(__dirname, "files-copy");

const clearFolder = async (nameFolder) => {
  await FS.rm(nameFolder, {
    recursive: true,
    force: true,
  });
  await FS.mkdir(nameFolder, { recursive: true });
};

const copyFolder = async (startFolder, destinationFolder) => {
  await clearFolder(destinationFolder);
  const FILES = await FS.readdir(startFolder, { withFileTypes: true });

  for (const elem of FILES) {
    if (elem.isFile()) {
      const OLD_FILE = PATH.join(startFolder, elem.name);
      const NEW_FILE = PATH.join(destinationFolder, elem.name);
      await FS.copyFile(OLD_FILE, NEW_FILE);
    } else if (elem.isDirectory()) {
      copyFolder(PATH.join(startFolder, elem.name), PATH.join(destinationFolder, elem.name));
    }
  }
};

copyFolder(START_FOLDER, DESTINATION_FOLDER);
