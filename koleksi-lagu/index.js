const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request masuk");
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  next();
});

const PORT = process.env.PORT || 3000;

const sequelize = require("./config/database");
const Song = require("./models/SongModel");

app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/songs", async (req, res) => {
  try {
    const { judul, penyanyi, album, tahun } = req.body;
    const newSong = await Song.create({ judul, penyanyi, album, tahun });
    res.status(201).json({
      message: "Lagu baru berhasil ditambahkan ke koleksi",
      data: newSong,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan lagu",
      error: error.message,
    });
  }
});

app.get("/api/songs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ message: "Lagu tidak ditemukan" });
    }
    res.json({ message: "Data lagu berhasil diambil", data: song });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/songs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [updatedRows] = await Song.update(req.body, { where: { id } });
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Lagu tidak ditemukan" });
    }
    const updatedSong = await Song.findByPk(id);
    res.json({ message: "Data lagu berhasil diperbarui", data: updatedSong });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/songs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Song.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Lagu tidak ditemukan" });
    }
    res.json({ message: "Lagu berhasil dihapus dari koleksi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Koneksi Database berhasil.");
    await sequelize.sync();
    console.log("Semua model telah disinkronkan.");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
}
startServer();
