const path = require("path");
const uuid = require("uuid");

const productPath = path.join(__dirname, "..", "assets", "product");

const savePhoto = async (req) => {
  const { img } = req.files;
  const fileName = uuid.v4() + ".jpg";

  img.mv(`${productPath}/${fileName}`);
  return fileName;
};

module.exports = {
  savePhoto,
};
