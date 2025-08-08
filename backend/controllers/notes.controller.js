import notesModel from "../models/notes.model.js";

export const createNote = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, content, important, tags } = req.body;

    if (!title || !content || !tags) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const newNote = await notesModel.create({
      title,
      content,
      userId,
      important,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Check if note belongs to logged-in user
    if (note.userId.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to update this note",
      });
    }

    const updatedNote = await notesModel.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await notesModel.findByIdAndDelete(noteId);

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;

    const notes = await notesModel.find({ userId });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notes found for this user",
      });
    }

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
