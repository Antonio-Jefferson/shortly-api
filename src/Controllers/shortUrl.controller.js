import { nanoid } from 'nanoid';
import db from "../Config/db.js"


const isertShortUrl = async (req,res)=> {
    const {url} = req.body
    const userId = res.locals.token 
	console.log(userId)
    try {
		const shortUrl = nanoid(8);
		const { rows } = await db.query(`INSERT INTO shortens (url, short_url, user_id) VALUES ($1, $2, $3) RETURNING id, short_url AS "shortUrl"`,[url, shortUrl, userId]
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
    const { url } = res.locals;
	try {
		res.redirect(url);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

 const deleteUrl = async (req, res)=>{
    const { shortUrl } = res.locals.url;
	const { userId } = res.locals.token;
  try {
    
    const result = await pool.query('SELECT * FROM shortens WHERE short_url = $1 AND user_id = $2', [shortUrl, userId]);

    if (result.rowCount === 1) {
      await pool.query('DELETE FROM shortens WHERE short_url = $1', [shortUrl]);
      res.sendStatus(204);
    } else {
      res.status(401).send('URL não pertence ao usuário autenticado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }

}
export {isertShortUrl, showUrl, visitUrl, deleteUrl}
