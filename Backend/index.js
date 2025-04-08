const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const uploadRoute = require('./routes/upload');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve files

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Dummy auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === "fake-token") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Routes
app.post("/api/upload", authMiddleware, upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded" });
});

app.get("/api/files", authMiddleware, (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading files" });
    const fileList = files.map(file => ({
      name: file,
      url: `http://localhost:${PORT}/uploads/${file}`
    }));
    res.json(fileList);
  });
});

app.delete("/api/delete/:fileName", authMiddleware, (req, res) => {
  const filePath = path.join("uploads", req.params.fileName);
  fs.unlink(filePath, err => {
    if (err) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
