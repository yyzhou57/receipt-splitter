import express from 'express'
import multer from 'multer'
import cors from 'cors'

// import for S3
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto' // unique id generator

const app = express()
// file handler
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 mb max file size
})

// s3 region
const region = process.env.AWS_REGION
if(!region){
    throw new Error('AWS_REGION is not set in .env')
}
const s3= new S3Client({region})

// s3 bucket
const bucket = process.env.S3_BUCKET
if(!bucket){
    throw new Error('S3_BUCKET is not set in .env')
}


const PORT = 3000

// frontend runs on a different port, so the browser blocks requests without CORS
app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/health', (req, res) => {
    res.json({"status": "ok"})
})

app.post('/receipts', upload.single('receipt'), async (req, res) => {
    if(!req.file){
        // no file
        return res.status(400).json({error: 'no file found!'})
    }
    // make unique names for s3, so same names don't override each other
    const key = `receipts/${randomUUID()}-${req.file.originalname}`

    try{
        await s3.send(new PutObjectCommand({ // put object command is instruction for uploading a file to s3, came from the receipt-api-dev IAM user
            Bucket: bucket,
            Key: key,
            Body: req.file.buffer, // file bytes
            ContentType: req.file.mimetype, // ex. image/jpeg
        }))
        res.status(201).json({key})
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'upload failed'})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})