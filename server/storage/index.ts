import S3 from 'aws-sdk/clients/s3'

const Endpoint = "https://sfo2.digitaloceanspaces.com"
const Bucket = process.env.BUCKET!

console.log(process.env)

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: Endpoint,
})

export const upload: (
  Key: string,
  Body: string
) => Promise<any> = (Key, Body) => new Promise((ok, err) => {
  s3.putObject({ Body, Bucket, Key }, (e, data) => {
    if (e) {
      err(e)
      return
    }

    ok(data)
  })
})

export const download: (
  Key: string
) => Promise<string> = (Key) => new Promise((ok, err) => {
  s3.getObject({ Key, Bucket }, (e, data) => {
    if (e) {
      err(e)
      return
    }

    ok(data?.Body?.toString())
  })
})
