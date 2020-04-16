var cloudinary = require('cloudinary').v2
const { name } = require('./package.json')
const path = require('path')

module.exports = (
  job,
  settings,
  { params: { input, api_key, cloud_name, api_secret, UploadApiOptions } },
  type
) => {
  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
  })

  console.log('input: ', input)
  console.log('job: ', job.output)

  input = input || job.output

  if (!path.isAbsolute(input)) input = path.join(job.workpath, input)

  const cloudinaryOptions = { resource_type: 'video', ...UploadApiOptions }

  console.log(input)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(input, cloudinaryOptions, function (
      error,
      result
    ) {
      if (typeof error !== 'undefined') {
        settings.logger.log(`Cloudinary Error: `, error)
      }

      resolve(job)
    })
  }).catch((error) => {
    throw error
  })
}
