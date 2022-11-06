const fs = require("fs");
const path = require("path");

const project = path.join(__dirname, "project-dist");
const oldAssets = path.join(__dirname, "assets");
const styles = path.join(__dirname, "styles");
const template = path.join(__dirname, "/template.html");
const components = path.join(__dirname, "components");

const newAssets = path.join(project, "assets");
const bundle = path.join(project, "/style.css");
const index = path.join(project, "/index.html");

(async function () {
  try {
    //delete all
    await fs.promises.rm(project, { recursive: true, force: true }, (error) => {
      if (error) console.log(error);
      else console.log("Recursive: Directories Deleted!");
    });

    //create folders => 1.Создаёт папку project-dist.
    await fs.promises.mkdir(project, { recursive: true }, (error) => {
      if (error) console.log("Directory has already exists or something else!");
      else console.log("Directory has been created successfully!");
    });

    //create folders => 1.1Создаёт папку assets.
    await fs.promises.mkdir(newAssets, { recursive: true }, (error) => {
      if (error) console.log("Directory has already exists or something else!");
      else console.log("Directory has been created successfully!");
    });

    // join html => 2.Заменяет шаблонные теги в файле template.html с названиями файлов из папки components
    await myHTML();

    //copy recursive => 3.Копирует папку assets в project-dist/assets
    await fs.promises
      .readdir(oldAssets, { withFileTypes: true }, (error) => {
        if (error) console.error(error);
      })
      .then((dirents) =>
        dirents.forEach((dirent) => {
          const source = path.join(oldAssets, dirent.name);
          const destination = path.join(newAssets, dirent.name);
          copyRecursive(source, destination);
        })
      );

    // bundle css => 4.Собирает в единый файл стили из папки styles и помещает их в файл project-dist/style.css.
    await myCSS();
  } catch (error) {
    console.error(error);
  }
})();

function copyRecursive(source, destination) {
  fs.promises
    .stat(source)
    .then((stats) => stats.isDirectory())
    .then((folder) => {
      if (folder) {
        fs.promises.mkdir(destination, { recursive: true }).then(
          fs.promises.readdir(source).then((items) => {
            items.forEach((item) => {
              copyRecursive(
                path.join(source, item),
                path.join(destination, item)
              );
            });
          })
        );
      } else {
        copyFiles(source, destination);
      }
    });
}

function copyFiles(source, destination) {
  fs.promises.copyFile(source, destination, 0, (error) => {
    if (error) console.log(`Не удалось скопировать ${source} файл!`);
    else console.log(`Файл ${source} успешно скопирован!`);
  });
}

function mkDir(path) {
  fs.promises.mkdir(path, { recursive: true }, (error) => {
    if (error) console.log("Directory has already exists or something else!");
    else console.log("Directory has been created successfully!");
  });
}

async function myHTML() {
  try {
    await fs.promises.readFile(template, "utf-8").then((buffer) => {
      fs.promises
        .readdir(components, { withFileTypes: true }, (error) => {
          if (error) console.error(error);
        })
        .then(
          (files) =>
            files.forEach((file) => {
              if (file.isFile() && path.extname(file.name) === ".html") {
                let fname = file.name.substring(0, file.name.indexOf("."));
                fs.promises
                  .readFile(path.join(components, file.name), "utf-8", () => {})
                  .then((data) => {
                    buffer = buffer.replace(`{{${fname}}}`, data);
                    fs.promises.writeFile(index, buffer);
                  });
              }
            }) //then forEach
        ); //then
    }); // end
  } catch (error) {
    console.error(error);
  }
}

async function myCSS() {
  let writable = fs.createWriteStream(bundle, {
    encoding: "utf-8",
  });

  fs.readdir(styles, { withFileTypes: true }, (error, files) => {
    files.forEach((file) => {
      if (error) console.error(e);
      else {
        if (file.isFile() && path.extname(file.name) === ".css") {
          fs.createReadStream(path.join(styles, file.name), {
            encoding: "utf-8",
          }).pipe(writable);
        }
      }
    });
  });
}
