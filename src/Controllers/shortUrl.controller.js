import { nanoid } from 'nanoid';
import db from "../Config/db.js"


const isertShortUrl = async (req,res)=> {
    const {url} = req.body
    const userId = res.locals.token 
	console.log(userId)
    try {
		const shortUrl = nanoid(8);
		const { rows } = await db.query(`INSERT INTO shortens (url, short_url, user_id) VALUES ($1, $2, $3) RETURNING id, short_url`,[url, shortUrl, userId]
		);
		console.log(rows)
		res.status(201).send(rows[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

const showUrl = (_, res)=>{
    try {
		const body = res.locals.url;
		res.status(200).send(body);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

const visitUrl = async (req, res)=>{
    const { id, url } = res.locals.url;
	try {
		await db.query(
			`UPDATE visits SET visit = visit + 1 WHERE id = $1`,
			[id]
		);
		res.redirect(url);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

 const deleteUrl = async (req, res)=>{
    const { id } = res.locals.url;
	const { userId } = res.locals.token;
	try {
		const { rows } = await db.query(
			`SELECT * FROM shortens WHERE user_Id = $1`,[userId]
		);
		if (rows.length === 0) {
			return res.sendStatus(401);
		}
		await db.query(`DELETE FROM shortens WHERE id = $1`, [id]);
		res.sendStatus(204);
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}

}
export {isertShortUrl, showUrl, visitUrl, deleteUrl}
