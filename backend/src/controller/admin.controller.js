import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
import { unlink } from "node:fs/promises";

const cleanupTempFile = async (tempFilePath) => {
  if (!tempFilePath) return;

  try {
    await unlink(tempFilePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error deleting temp upload file:", error);
    }
  }
};

//helper function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
  const tempFilePath = file?.tempFilePath;

  try {
    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file");
  } finally {
    await cleanupTempFile(tempFilePath);
  }
};

export const createSong = async (req, res, next) => {
  try {
    const audioFile = req.files?.audioFile || req.files?.audiofile;
    const imageFile = req.files?.imageFile || req.files?.imagefile;

    if (!audioFile || !imageFile) {
      return res.status(400).json({ message: "Missing required files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      album: albumId || null,
    });

    await song.save();

    // If the song is associated with an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }

    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.error("Error creating song:", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    if (song.album) {
      await Album.findByIdAndUpdate(song.album, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files?.imageFile || req.files?.imagefile;

    if (!imageFile) {
      return res.status(400).json({ message: "Album artwork is required" });
    }

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();
    res.status(201).json({ message: "Album created successfully", album });
  } catch (error) {
    console.error("Error creating album:", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.updateMany({ album: id }, { $set: { album: null } });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error deleting album:", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
