import db from "../Config/db.js"

export const getByIdUser = async (req, res)=>{
    const { userId } = res.locals.user;
    try {
        const result = await db.query(`
            SELECT 
                users.id, 
                users.name, 
                SUM(visits.visti) AS "visitCount", 
                JSON_AGG(JSON_BUILD_OBJECT(
                'id', shortens.id, 
                'shortUrl', shortens."shortUrl", 
                'url', shortens."url", 
                'visitCount', visits."visti") ORDER BY shortens.id) AS "shortenedUrls"
            FROM 
                users
                JOIN "shortens" ON "shortens"."userId" = users.id
                JOIN visits ON "shortens"."linkId" = visits.id
            WHERE
                users.id = $1
            GROUP BY users.id 
        `, [userId]);
        const userInfo = result.rows[0];
		res.status(200).send(userInfo);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getRanking = async(_, res) => {
	try {
		const { rows } = await db.query(`
        SELECT
            users.id,
            users.name,
            COUNT("shortens".*) AS "linksCount",
            SUM(visits."visti") AS "visitCount"
        FROM
        
        `);
		res.status(200).send(rows);
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
}

export { getRanking };