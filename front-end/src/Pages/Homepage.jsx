import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import Note from "../components/Note";
import api from "../utils/axios";
import NotesNotFound from "../components/NoNotes";

const Homepage = () => {
	const [rateLimited, setRateLimited] = useState(false);
	const [Notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const res = await api.get("/notes");

				setNotes(res.data);
				setRateLimited(false);
				console.log(res.data);
			} catch (error) {
				if (error.response && error.response.status === 429) {
					setRateLimited(true);
				} else {
					toast.error("Failed to Load Notes");
				}
				console.log("Error occurred:");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchNotes();
	}, []);

	return (
		<div className="min-h-screen">
			<Navbar />
			{rateLimited && <RateLimited />}
			<div className="max-w-7xl mx-auto p-4 mt-6">
				{loading && <Loading />}

				{Notes.length === 0 && !loading && !rateLimited && (
					<NotesNotFound />
				)}

				{Notes.length > 0 && !rateLimited && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Notes.map((note, index) => {
							return (
								<Note
									key={note._id}
									note={note}
									setNotes={setNotes}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Homepage;
