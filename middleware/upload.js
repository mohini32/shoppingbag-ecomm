const { S3Client } = require('@aws-sdk/client-s3');
const multerS3=require('multer-s3');
const multer=require('multer');
const path=require('path');
const fs=require('fs');

const s3=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
});

const createMulter=(folder)=>{
    return multer({
        storage:multerS3({
            s3:s3,
            bucket:process.env.AWS_BUCKET,
            acl:'public-read',
            contentType:multerS3.AUTO_CONTENT_TYPE,
            metadata:(req,file,cb)=>{
                cb(null,{fieldName:file.fieldname});
            },
            key:(req,file,cb)=>{
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, folder + '/' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
            },
        }),
        fileFilter:(req,file,cb)=>{
          const allowedTypes=['image/jpeg','image/png','image/gif'];
          if(allowedTypes.includes(file.mimetype)){
            cb(null,true);
          }
            else{
                cb(new Error('Invalid file type'));
            }
        },
        limits:{
            fileSize:1024*1024*5
        }
    })
}
module.exports={createMulter};


