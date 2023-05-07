const PATH = require("path");
const PROCESS = require("process");
const FS = require("fs/promises");

const SECRET_FOLDER = PATH.join(__dirname, "secret-folder");

const infoFile = async (fileName, nameFolder) => {
  const TYPE_FILE = PATH.extname(fileName);
  const NAME_FILE = PATH.basename(fileName, TYPE_FILE);
  const LINK_FILE = PATH.join(nameFolder, fileName);
  const SIZE_FILE = (await FS.stat(LINK_FILE)).size;

  PROCESS.stdout.write(`${NAME_FILE} - ${TYPE_FILE.slice(1)} - ${SIZE_FILE} b \n`);
};

const infoFolder = async (nameFolder) => {
  const FILES = await FS.readdir(nameFolder, { withFileTypes: true });

  FILES.forEach((elem) => {
    if (elem.isFile()) {
      infoFile(elem.name, nameFolder);
    // так и не понял по условию заданию нужно ли вывести файлы во вложенных директориях или нет
    // Если раскрементировать следующие 2 строки, то выведет рекурсивно все файлы во вложенных директориях
    // } else if (elem.isDirectory()) {
    //  infoFolder(PATH.join(nameFolder, elem.name));
    }
  });
};

infoFolder(SECRET_FOLDER);
