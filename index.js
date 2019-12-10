var cloudinary = require("cloudinary").v2;
const { name } = require("./package.json");
const path = require("path");

module.exports = (
  job,
  settings,
  { input, api_key, cloud_name, api_secret },
  type
) => {
  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
  });

  input = input || job.output;

  if (!path.isAbsolute(input)) input = path.join(job.workpath, input);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      input,
      {
        resource_type: "video",
        public_id: `videos/${job.uid}`,
        overwrite: true,
        notification_url: "",
        eager: [{ streaming_profile: "hd", format: "m3u8", quality: "50" }]
      },
      function(error, result) {
        console.log(result, error);

        resolve(job);
      }
    );
  }).catch(error => {
    throw error;
  });
};
