//stdin.pipe(writable);// запись с клавиатуры в поток напрямую
const fs = require("fs");
const path = require("path");
const process = require("process");

const wtitePath = path.join(__dirname, "/temp.txt");

let writable = fs.createWriteStream(wtitePath, {
  encoding: "utf-8",
});

process.stdout.write(
  "Please, write here something except the word 'exit:" + "\n"
);

process.stdin.on("data", function (data, key) {
  if (data.toString().trim() === "exit") {
    process.stdout.write("Bye, when the word 'exit' is typed ..." + "\n");
    process.exit();
  }

  writable.write(data);
});

process.on("SIGINT", function () {
  console.log("Bye, when Ctrl+Break is pressed ...");
  process.exit();
});
