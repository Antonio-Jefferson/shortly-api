import db from "../Config/db.js"

export function validatSchemas(schema) {
    return (req, res, next) => {
      const result = db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
      if(result.rowCount > 0) return res.status(409).send({ message: "email já existente" })
      const { error } = schema.validate(req.body,{ abortEarly: false })
      if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
      }
      next()
    }
  }