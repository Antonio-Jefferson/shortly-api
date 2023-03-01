export const validateShortUrl = async (req, res, next)=> {
	const { shortUrl } = req.params;
	try {
		const url = await db.query(
			`SELECT * FROM shortens WHERE short_url = $1`,
			[shortUrl]
		);
		if (url.rowCount === 0) {
			return res.status(404).send("Not Found");
		}
		res.locals.url = url.rows[0];
		next();
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
}