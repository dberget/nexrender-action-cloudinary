# nexrender-action-cloudinary

# Installation

```
npm i -g nexrender-action-cloudinary
```

Example Postrender action

```
"postrender": [
      {
        "module": "@nexrender/action-encode",
        "preset": "mp4",
        "output": "encoded.mp4"
      },
      {
        "module": "nexrender-action-cloudinary",
        "input": "encoded.mp4",
        "params": {
          "api_key": "Cloudinary api key",
          "cloud_name": "Cloudinary Bucket",
          "api_secret": "Cloudinary api secret",
          "UploadApiOptions": {} // Directly passed to cloudinary.
        }
      }
    ]
```

[See Cloudinary docs for UploadApiOptions](https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters)
