const path = require("path");

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "googleapis.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
