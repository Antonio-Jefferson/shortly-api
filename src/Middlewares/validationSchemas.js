import db from "../Config/db.js"

 const  validatSchemas = (schema)=> {
    return (req, res, next) => {
      const {email, password} = req.body
      const result =  db.query(`SELECT * FROM users WHERE email = $1;`, [email,]);

      if(result.rowCount > 0) return res.status(409).send({ message: "email já existente" })
      
      const { error } = schema.validate(req.body,{ abortEarly: false })
      if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
      }
      next()
    }
  }
  
  const validateId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const url = await db.query(`SELECT id, short_url ,url FROM shortens WHERE id = $1`, [id]);
      if (url.rowCount === 0) {
        return res.status(404).send("Not Found");
      }
      res.locals.url = url.rows[0];
      next();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }



  export {validatSchemas, validateId}