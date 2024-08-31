const db = require("../model/albumModel");

async function getAllAlbums(req, res) {
  try {
    const results = await db.getAllAlbums();
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Please add the details, the table is empty" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "unable to connect to the db" });
  }
}

async function getAlbum(req, res) {
  let { id } = req.params;
  try {
    const results = await db.getAlbum(id);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Record not found for the given ID" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Error in database" });
  }
}

async function createAlbum(req, res) {
  const albumData = [
    req.body.title,
    req.body.artist,
    req.body.genre,
    req.body.release_year,
    req.body.rating,
    req.body.cover_image
  ];

  try {
    await db.createAlbum(albumData);
    res.status(201).json({
      message: "Album added successfully",
      cab: req.body,
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Database error" });
  }
}

async function updateAlbum(req, res) {
  let { id } = req.params;
  if (id == null || id == undefined) {
    res.status(404).send("give the proper id");
    return;
  }
  try {
    const checkData = await db.getAlbum(id);
    if (checkData.length === 0) {
      return res
        .status(404)
        .json({ message: "Record not found for the given ID" });
    }
    let { title, artist, genre, release_year, rating, cover_image } = req.body;

    const albumData = [
      title ?? checkData.title,
      artist ?? checkData.artist,
      genre ?? checkData.genre,
      release_year ?? checkData.release_year,
      rating ?? checkData.rating,
      cover_image ?? checkData.cover_image
    ];

    await db.updateAlbum(id, albumData);

    res.status(200).json({
      message: "Album details edited successfully",
      cab: {
        title: title ?? checkData.title,
        artist: artist ?? checkData.artist,
        genre: genre ?? checkData.genre,
        release_year: release_year ?? checkData.release_year,
        rating: rating ?? checkData.rating,
        cover_image: cover_image ?? checkData.cover_image,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Error in database" });
  }
}

async function deleteAlbum(req, res) {
  let { id } = req.params;
  try {
    const results = await db.getAlbum(id);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Invalid ID. No record found with the given ID." });
    }
    await db.deleteAlbum(id);
    res
      .status(200)
      .json({
        message: "Album record deleted successfully",
        deletedRow: results[0],
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error in database" });
  }
}

module.exports = { getAllAlbums, getAlbum, createAlbum, updateAlbum, deleteAlbum };
