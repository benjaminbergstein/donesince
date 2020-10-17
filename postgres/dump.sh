#!/bin/bash

set -ex

pg_dump $RAW_DATABASE_URL > dump.sql

timestamp() {
  date +"%Y-%m-%dT%H:%M:%S"
}

S3_HOST=sfo2.digitaloceanspaces.com

upload() {
  s3cmd --host=${S3_HOST} \
        --host-bucket="%(bucket).${S3_HOST}" \
        --region=sfo2 \
        --access_key=${AWS_ACCESS_KEY_ID} \
        --secret_key=${AWS_SECRET_ACCESS_KEY} \
        put ./dump.sql s3://${BUCKET}/dumps/$1.sql
}

upload latest
upload $(timestamp)
