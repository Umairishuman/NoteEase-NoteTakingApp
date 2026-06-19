import { Link, useNavigate } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../utils/utils.js";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../utils/axios.js";
const Note = ({ note, setNotes }) => {
	console.log(note);

	const navigate = useNavigate();

	const [deleting, setDeleting] = useState(false);

	const handleDelete = async (e, _id) => {
		e.preventDefault();
		setDeleting(true);

		try {
			await api.delete(`/notes/${_id}`);
			setNotes((prev) => prev.filter((note) => note._id != _id));
			toast.success("Note Deleted Successfully!");
			navigate("/");
		} catch (error) {
			console.log("Error Deleting Note. ", error);
			toast.error("Failed to Delete Note. Try again!!");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<Link
			to={`/notes/${note._id}`}
			className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]"
		>
			<div className="card-body">
				<h2 className="card-title text-base-content">{note.title}</h2>
				<p className="text-base-content/70  line-clamp-3">
					{note.content}
				</p>
				<div className="card-actions justify-between items-center mt-4">
					<span className="text-sm text-base-content/60">
						{formatDate(new Date(note.createdAt))}
					</span>
					<div className="flex items-center gap-1">
						<PenSquareIcon className="size-4" />
						<button
							className="btn btn-ghost btn-xs text-error"
							onClick={(e) => handleDelete(e, note._id)}
							disabled={deleting}
						>
							{deleting ? "..." : <Trash2Icon />}
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Note;
