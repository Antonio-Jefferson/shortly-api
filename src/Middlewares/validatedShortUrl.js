import db from "../Config/db.js";

export const validateShortUrl = async (req, res, next) => {
	const { shortUrl } = req.params;

	try {
		const result = await db.query(
			'SELECT url FROM shortens WHERE short_url = $1',
			[shortUrl]
		);
		if (result.rows.length === 0) {
			res.status(404).send('URL not found');
			return;
		}

		await db.query(
			'INSERT INTO visits (short_id, visti) VALUES ((SELECT id FROM shortens WHERE short_url = $1), 1)',
			[shortUrl]
		);

		res.locals.url = result.rows[0]
		next();

	} catch (error) {
		res.status(500).send(error.message);
	}
}