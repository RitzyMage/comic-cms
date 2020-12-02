export default function getFileExtension(data: string) {
  var lowerCase = data.toLowerCase();
  if (lowerCase.indexOf("png") !== -1) {
    return "png";
  } else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1) {
    return "jpg";
  }
  return "raw";
}
