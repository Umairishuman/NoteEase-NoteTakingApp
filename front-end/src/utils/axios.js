import axios from "axios";

const Base =
	import.meta.env.MODE === "development"
		? "http://localhost:5000/api"
		: "/api";

const api = axios.create({
	baseURL: Base,
});
export default api;
