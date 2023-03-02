import db from "../Config/db.js";

export const validateShortUrl = async (req, res, next)=> {
	const { shortUrl } = req.params;
	
	try {
		const url = await db.query(`SELECT * FROM shortens WHERE short_url = $1`,[shortUrl]);
		console.log(url.rowCount)
		if (url.rowCount === 1) {
			await db.query('UPDATE visits SET visti = visti + 1 WHERE short_id = $1',[url.rows[0].id]);
			res.locals.url = url.rows[0];
			next();
		}else{
			return res.status(404).send("Not Found");
		}

	} catch (error) {
		res.status(500).send(error.message);
	}
}