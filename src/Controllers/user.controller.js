import db from "../Config/db.js"

export const getByIdUser = async (req, res) => {
    const {user_id}  = res.locals.token;
	const userId = user_id
    console.log(user_id)
  
    try {
        const result = await db.query(`
        SELECT 
        users.id,
        users.name,
        COALESCE(SUM(visits.visti), 0) as visitCount,
        json_agg(
            json_build_object(
                'id', shortens.id,
                'shortUrl', shortens.short_url,
                'url', shortens.url,
                'visitCount', COALESCE(visits.visti, 0)
            ) ORDER BY shortens.id
        ) as shortenedUrls
    FROM 
        users 
    LEFT JOIN 
        shortens  ON users.id = shortens.user_id
    LEFT JOIN 
        (SELECT 
            short_id, SUM(visti) as visti 
        FROM 
            visits 
        GROUP BY 
            short_id) as visits ON shortens.id = visits.short_id
    WHERE 
        users.id = $1
    GROUP BY 
        users.id;
                `, [userId]);
        const userInfo = result.rows[0];
        res.status(200).send(userInfo);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getRanking = async (_, res) => {
    try {
        const { rows } = await db.query(`
        SELECT 
            u.id,
            u.name,
            COALESCE(COUNT(DISTINCT s.id), 0) as linksCount,
            COALESCE(SUM(v.visti), 0) as visitCount
        FROM 
            users u
        LEFT JOIN 
            shortens s ON u.id = s.user_id
        LEFT JOIN 
            (SELECT 
                short_id, SUM(visti) as visti 
            FROM 
                visits 
            GROUP BY 
                short_id) v ON s.id = v.short_id
        GROUP BY 
            u.id
        ORDER BY 
            u.id
        LIMIT
            10
        `);
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}