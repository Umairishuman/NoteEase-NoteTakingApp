import express from "express";
import {
	AddNotes,
	DeleteNote,
	getNoteById,
	getNotes,
	updateNote,
} from "../controllers/NotesControllers.js";

const router = express.Router();

router.get("/", getNotes);

router.get('/:id', getNoteById);

router.post("/", AddNotes);

router.put("/:id", updateNote);

router.delete("/:id", DeleteNote);

export default router;
