import db from "../Config/db.js"

export const getByIdUser = async (req, res) => {
    const { userId } = res.locals.user;
    try {
        const result = await db.query(`
        SELECT 
        u.id,
        u.name,
        COALESCE(SUM(v.visit), 0) as visitCount,
        json_agg(
            json_build_object(
                'id', s.id,
                'shortUrl', s.short_url,
                'url', s.url,
                'visitCount', COALESCE(v.visit, 0)
            ) ORDER BY s.id
        ) as shortenedUrls
    FROM 
        users u
    LEFT JOIN 
        shortens s ON u.id = s.user_id
    LEFT JOIN 
        (SELECT 
             short_id, SUM(visti) as visit 
         FROM 
             visits 
         GROUP BY 
             short_id) v ON s.id = v.short_id
    WHERE 
        u.id = $1
    GROUP BY 
        u.id    
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
    COALESCE(SUM(v.visit), 0) as visitCount
FROM 
    users u
LEFT JOIN 
    shortens s ON u.id = s.user_id
LEFT JOIN 
    (SELECT 
         short_id, SUM(visti) as visit 
     FROM 
         visits 
     GROUP BY 
         short_id) v ON s.id = v.short_id
GROUP BY 
    u.id
ORDER BY 
    u.id
        `);
        res.status(200).send(rows);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
}

export { getRanking };