const fs = require("fs");
const path = require("path");
const process = require("process");

const readPath = path.join(__dirname, "/text.txt");
const wtitePath = path.join(__dirname, "/temp.txt");

let readable = fs.createReadStream(readPath, {
  encoding: "utf-8",
});

readable.pipe(process.stdout); //вывод текста в консоль

let writable = fs.createWriteStream(wtitePath, {
  encoding: "utf-8",
});

readable.pipe(writable); // запись в файл из потока

/*
readable.on("data", (data) => {
  console.log(data);
  //writable.write(data);
});
*/
//https://www.geeksforgeeks.org/difference-between-process-stdout-write-and-console-log-in-node-js/
