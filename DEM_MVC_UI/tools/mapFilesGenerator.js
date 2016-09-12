/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint no-unused-vars: "off" */
/* eslint import/no-extraneous-dependencies: "off" */

import fs from 'fs';
import colors from 'colors';

const MapFilesGenerator = {
  pathToFolderArray: [],
  fileName: "",
  init: (pathToFolderArray, fileName = "_all.js") => {
    MapFilesGenerator.pathToFolderArray = pathToFolderArray;
    MapFilesGenerator.fileName = fileName;
  },
  getFileAndComponentNamesDictionary: (pathToFolder) => {
    let fileNamesInFolder = fs.readdirSync(pathToFolder);
    let i = fileNamesInFolder.indexOf("_all.js");
    if(i != -1) {
      fileNamesInFolder.splice(i, 1);
    }

    let mapObjectDictionary = [];
    for (let fileNameInFolder of fileNamesInFolder) {
      mapObjectDictionary.push(`${fileNameInFolder.replace(/\.[^/.]+$/, "")}`);
    }

    return mapObjectDictionary;
  },
  prepareFileContant: (mapObjectDictionary) => {
    let contant = "";
    for (let mapObject of mapObjectDictionary) {
      contant += `import ${mapObject} from "./${mapObject}";\n`;
    }

    contant += "\n";
    contant += "export {\n";

    for (let mapObject of mapObjectDictionary) {
      contant += `  ${mapObject},\n`;
    }
    contant = contant.replace(/,\s*$/, "");
    contant += "\n};";
    return contant;
  },
  saveMapFile: (pathToFolder, content) => {
    fs.writeFile(`${pathToFolder}/${MapFilesGenerator.fileName}`, content, function(err) {
      if(err) {
        return console.log(err.red);
      }
      console.log(`The ${pathToFolder}/${MapFilesGenerator.fileName} was saved!`.green);
    });
  },
  generateMapFiles: () => {
    for(let path of MapFilesGenerator.pathToFolderArray){
      let mapObjectDictionary = MapFilesGenerator.getFileAndComponentNamesDictionary(path);
      let fileContant = MapFilesGenerator.prepareFileContant(mapObjectDictionary);
      MapFilesGenerator.saveMapFile(path, fileContant);
    }
  }
};


MapFilesGenerator.init([
  "./src/scripts/components",
  "./src/scripts/containers",
  "./src/scripts/reactLess",
  "./testHelpers",
]);
MapFilesGenerator.generateMapFiles();
