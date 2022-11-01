const fs = require("fs");
const path = require("path");

const styles = path.join(__dirname, "styles");
const bundle = path.join(__dirname, "project-dist", "/bundle.css");

let writable = fs.createWriteStream(bundle, {
  encoding: "utf-8",
});

fs.readdir(styles, { withFileTypes: true }, (e, files) => {
  files.forEach((file) => {
    if (e) console.error(e);
    else {
      if (path.extname(file.name) === ".css") {
        fs.createReadStream(path.join(styles, file.name), {
          encoding: "utf-8",
        }).pipe(writable); // запись в файл из потока/файла
      }
    }
  });
  console.log("Bundle has been successful!");
});
