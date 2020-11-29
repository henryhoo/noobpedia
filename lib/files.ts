import fs from "fs";

export function getFileContent(filePath: string): string {
  if (!fs.lstatSync(filePath).isDirectory()) {
    return fs.readFileSync(filePath, "utf-8");
  }
  return "";
}

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

export function getAllFileContentsInDir(dirPath: string): Map<string, string> {
  var data = new Map();
  readFilesInDirSync(dirPath, function (filename: string, content: string) {
    data.set(filename, content);
  });
  return data;
}
