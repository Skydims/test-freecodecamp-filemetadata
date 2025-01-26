var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Untuk menangani file upload
require('dotenv').config();

var app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

// Routing ke halaman utama
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Konfigurasi Multer untuk file upload
const upload = multer({
  storage: multer.memoryStorage(), // Menyimpan file di memori sementara
  limits: { fileSize: 10 * 1024 * 1024 }, // Batas ukuran file 10 MB
});

// Endpoint untuk upload file
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Mengambil informasi file
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size, // Ukuran dalam byte
  };

  // Mengembalikan informasi file dalam format JSON
  res.json(fileInfo);
});

// Menjalankan server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
