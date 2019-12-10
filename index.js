var cloudinary = require("cloudinary").v2;
const { name } = require("./package.json");
const path = require("path");

module.exports = (job, settings, { input }, type) => {
  return new Promise((resolve, reject) => {
    input = input || job.output;

    if (!path.isAbsolute(input)) input = path.join(job.workpath, input);

    cloudinary.uploader.upload(
      input,
      {
        resource_type: "video",
        public_id: "videos",
        overwrite: true,
        notification_url: ""
      },
      function(error, result) {
        console.log(result, error);
      }
    );

    resolve(job);
  });
};
