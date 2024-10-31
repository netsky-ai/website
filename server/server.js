const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

const netskySender = "dylan@netsky.ai"
const netskyapppass = process.env.EMAIL_PASS;

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: netskySender,  
        pass: netskyapppass      
    }
});

// Image resize endpoint
app.post('/api/resize-image', upload.single('image'), async (req, res) => {
    try {
        const { adminEmail, userEmail, width, height } = req.body;
        const file = req.file;

        // Send email to admin
        await transporter.sendMail({
            from: netskySender,
            to: adminEmail,
            subject: 'New Image Resize Request',
            html: `
                <h2>New Image Resize Request</h2>
                <p><strong>User Email:</strong> ${userEmail}</p>
                <p><strong>Requested Dimensions:</strong> ${width}x${height}</p>
                <p><strong>Original Filename:</strong> ${file.originalname}</p>
                <p><strong>File Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            `
        });

        res.status(200).json({ message: 'Request received successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// Video conversion endpoint
app.post('/api/convert-video', upload.single('video'), async (req, res) => {
    try {
        const { adminEmail, userEmail, quality } = req.body;
        const file = req.file;

        // Send email to admin
        await transporter.sendMail({
            from: netskySender,
            to: adminEmail,
            subject: 'New Video Conversion Request',
            html: `
                <h2>New Video Conversion Request</h2>
                <p><strong>User Email:</strong> ${userEmail}</p>
                <p><strong>Requested Quality:</strong> ${quality} kbps</p>
                <p><strong>Original Filename:</strong> ${file.originalname}</p>
                <p><strong>File Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            `
        });

        res.status(200).json({ message: 'Request received successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// Audio transcription endpoint
app.post('/api/transcribe-audio', upload.single('audio'), async (req, res) => {
    try {
        const { adminEmail, userEmail, language } = req.body;
        const file = req.file;

        // Send email to admin
        await transporter.sendMail({
            from: netskySender,
            to: adminEmail,
            subject: 'New Audio Transcription Request',
            html: `
                <h2>New Audio Transcription Request</h2>
                <p><strong>User Email:</strong> ${userEmail}</p>
                <p><strong>Language:</strong> ${language}</p>
                <p><strong>Original Filename:</strong> ${file.originalname}</p>
                <p><strong>File Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            `
        });

        res.status(200).json({ message: 'Request received successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 