import db from "../Config/db.js";

export const validateShortUrl = async (req, res, next)=> {
	const { shortUrl } = req.params;
	
	try {
		const url = await db.query(`SELECT * FROM shortens WHERE short_url = $1`,[shortUrl]);
		if (result.rowCount === 1) {
			await pool.query('UPDATE visits SET visti = visti + 1 WHERE short_id = $1', [url.rows[0].id]);
			res.locals.url = url.rows[0];
			next();
		}
		if (url.rowCount === 0) {
			return res.status(404).send("Not Found");
		}

	} catch (error) {
		res.status(500).send(error.message);
	}
}