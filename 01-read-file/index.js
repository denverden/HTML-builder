const FS = require("fs");
const PATH = require("path");
const FILE_NAME = "text.txt";

FS.createReadStream(PATH.join(__dirname, FILE_NAME), "utf8").pipe(process.stdout);
