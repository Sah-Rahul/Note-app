import express from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/notes.controller.js";
import isVerifyUser from "../middleware/isVerifyUser.js";
 
 
const router = express.Router();

router.post("/note/create", isVerifyUser, createNote);
router.put("/note/update/:id", isVerifyUser, updateNote);
router.delete("/note/delete/:id", isVerifyUser, deleteNote);
router.get("/get-note", isVerifyUser, getNotes);
 
 

export default router;