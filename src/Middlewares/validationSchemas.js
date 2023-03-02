import db from "../Config/db.js"

 const  validatUser = async (req, res, next)=> { 
      const {email} = req.body
      try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
        if(result.rowCount > 0) return res.status(409).send("usuario já existente")
        next();
      } catch (error) {
        res.status(500).send(error.message);
      }
  }
  const signInValidation = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
      if (!result.rows[0] || result.rows[0].password !== password) {
        res.status(401).send("Email ou senha incorretos");
      } else {
       
        next();
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const validateId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const url = await db.query(`SELECT id, short_url AS "shortUrl", url FROM shortens WHERE id = $1`, [id]);
    
      if (url.rowCount === 0) {
        return res.status(404).send();
      }
      res.locals.url = url.rows[0];
      next();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  export {validatUser, signInValidation, validateId}