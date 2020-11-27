import fs from "fs";

function readFilesInDirSync(
  dirPath: string,
  onFileContent: (fileName: string, content: string) => void
): void {
  const filenames = fs.readdirSync(dirPath);
  filenames.forEach(async function (filename) {
    const path = dirPath + filename;
    if (!fs.lstatSync(path).isDirectory()) {
      const content = fs.readFileSync(path, "utf-8");
      onFileContent(filename, content);
    }
  });
}

export function getAllFileContentsInDir(dirPath: string): {} {
  var data = {};
  readFilesInDirSync(dirPath, function (filename: string, content: string) {
    data[filename] = content;
  });
  return data;
}
