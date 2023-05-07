const FS = require("fs");
const PATH = require("path");
const PROCESS = require("process");
const READ_LINE = require("readline");

const WRITE_STREAM = FS.createWriteStream(PATH.join(__dirname, "text.txt"), {
  flags: "a",
  encoding: "utf-8",
});
const RL = READ_LINE.createInterface({
  input: PROCESS.stdin,
  output: PROCESS.stdout,
});

PROCESS.stdout.write("Welcom! Enter your text (Exit Ctrl+C): \n");

const EXIT = () => {
  WRITE_STREAM.end();
  RL.close();
  PROCESS.stdout.write("Goodbye!!! \n");
};

RL.on("line", (input) => {
  if (input.trim() !== "exit") {
    WRITE_STREAM.write(`${input} \n`);
  } else {
    EXIT();
  }
});

RL.on("SIGINT", () => EXIT());
