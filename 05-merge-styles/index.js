const { promises: fs } = require("fs");
const path = require("path");

const styles = path.join(__dirname, "styles");
const bundle = path.join(__dirname, "project-dist", "/bundle.css");

let writable = fs.createWriteStream(bundle, {
  encoding: "utf-8",
});

(async function myMerge(){
await fs.readdir(styles, { withFileTypes: true }, (e, files) => {
  files.forEach((file) => {
    if (path.extname(file.name) === ".css") {
      await fs.createReadStream(path.join(styles, file.name), {
        encoding: "utf-8",
      }).pipe(writable); // запись в файл из потока/файла
    }
  });
});
}
)();
