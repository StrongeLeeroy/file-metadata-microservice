import express from 'express';
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
export const app = express();

app.use('/', express.static('client')); // Relative to entry file! (index.js)

app.post('/upload', upload.single('data'), (req, res) => {
	if (req.file) {
		res.status(200).json({
			filename: req.file.originalname,
			size: req.file.size,
			type: req.file.mimetype
		});
	} else {
		res.status(500).json({ error: `No file was provided in the 'data' field` });
	}
});