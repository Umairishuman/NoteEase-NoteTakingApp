import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Databse connected");
	} catch (error) {
		console.log("Error connecting to the dataBase", error);
		process.exit(1);
	}
};
