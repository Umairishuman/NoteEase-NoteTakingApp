import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
	try {
		const { success } = await rateLimit.limit("key");

		if (!success) {
			return res.status(429).json({ message: "Rate Limit Exceeded" });
		}
		next();
	} catch (error) {
		console.log(`Rate Limit Error ${error}`);
		next(error);
	}
};

export default rateLimiter;
