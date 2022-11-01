const { promises: fs } = require("fs");
const path = require("path");

const oldPath = path.join(__dirname, "files");
const newPath = path.join(__dirname, "files-copy");

(async function () {
  try {
    //delete
    await fs.rm(newPath, { recursive: true, force: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Recursive: Directories Deleted!");
      }
    });
    console.log("Directory deleted!");
    //create dir
    await fs.mkdir(newPath, { recursive: true }, (error) => {
      if (error) {
        console.log("Directory has already exists or something else!");
      } else {
        console.log("Directory has been created successfully!");
      }
    });
    console.log("Directory was created successfully!");
    //copy file
    const files = await fs.readdir(oldPath);

    for (const file of files) {
      const oldFile = path.join(__dirname, "files", file);
      const newFile = path.join(__dirname, "files-copy", file);
      await fs.copyFile(oldFile, newFile, 0, (error) => {
        if (error) {
          console.log(
            `Не удалось скопировать файл: /${file}/. Он уже существует!`
          );
        } else {
          console.log(`Файл /${file}/ успешно скопирован!`);
        }
      });
    }
    console.log("All source files were copied to the new destination.");
  } catch (error) {
    console.error(error);
  }
})();

function callback(err) {
  if (err) throw err;
  console.log("Source file was copied to destination");
}
/*
(error) => {
        if (error) {
          console.log(
            `Не удалось скопировать файл: /${file}/. Он уже существует!`
          );
        } else {
          console.log(`Файл /${file}/ успешно скопирован!`);
        }
      }
      */
