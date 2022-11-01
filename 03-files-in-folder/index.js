const { promises: fs } = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "secret-folder");

(async function (pathFiles) {
  (await fs.readdir(pathFiles, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => {
      const filePath = path.join(__dirname, "secret-folder", dirent.name);
      (async function (fp) {
        const stats = await fs.stat(fp);
        let res = stats.size;
        console.log(
          `${dirent.name.substring(0, dirent.name.indexOf("."))} - ${path
            .extname(filePath)
            .substring(1)} - ${(res / 1024).toFixed(1)}kb`
        );
      })(filePath);
    });
  /*
  try {
    for (const file of files) {
      const pp = path.join(__dirname, "secret-folder", file);
      let res;
      (async function (p) {
        const stats = await fs.stat(p);
        res = stats.size;
        console.log(
          `${file.substring(0, file.indexOf("."))} - ${path
            .extname(file)
            .substring(1)} - ${(res / 1024).toFixed(1)}kb`
        );
      })(pp);
    }
  } catch (err) {
    console.error(err);
  }
*/
})(dirPath);
