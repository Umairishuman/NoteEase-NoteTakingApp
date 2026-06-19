import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
	try {
		const notes = await Note.find().sort({ createdAt: 1 });
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getNoteById = async (req, res) => {
	try {
		let id = req.params.id;
		const foundNote = await Note.findById(id);
		if (!foundNote) return res.status(404).json({ message: "Not found" });
		res.status(200).json(foundNote);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const AddNotes = async (req, res) => {
	console.log(req.body);

	try {
		const { title, content } = req.body;

		console.log(title, content);
		const newNote = new Note({ title, content });

		const createdNote = await newNote.save();
		res.status(201).json(createdNote);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//for put requests
export const updateNote = async (req, res) => {
	try {
		let id = req.params.id;
		const { title, content } = req.body;
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{ title, content },
			{ new: true }
		);

		if (!updatedNote)
			return res.status(404).json({ message: "Note not found " });

		res.status(200).json(updatedNote);
	} catch (error) {
		res.status(500).json({ message: "Error updating Note" });
	}
};

export const DeleteNote = async (req, res) => {
	try {
		let id = req.params.id;
		const deletedNote = await Note.findByIdAndDelete(id);
		if (!deletedNote) {
			return res.status(404).json({ message: "Note not found" });
		}
		res.status(200).json({
			message: "Note deleted successfully",
			deletedNote: deletedNote,
		});
	} catch (error) {
		res.status(500).json({ message: "Error Deleting Note" });
	}
};
