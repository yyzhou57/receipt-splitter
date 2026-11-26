import express from 'express'
import multer from 'multer'
import cors from 'cors'

const app = express()
// file handler
const upload = multer({dest: 'uploads/'})
const PORT = 3000

// frontend runs on a different port, so the browser blocks requests without CORS
app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/health', (req, res) => {
    res.json({"status": "ok"})
})

app.post('/receipts', upload.single('receipt'), (req, res) => {
    if(!req.file){
        // no file
        return res.status(400).json({error: 'no file found!'})
    }
    res.status(201).json({ filename: req.file.filename})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})