import db from "../Config/db.js";
import { v4 as uuid } from 'uuid'

const  signUp = async (req, res)=>{
    const {email, password, name} = req.body;
    try {
      await db.query( `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, password])
      res.status(201).send()
    } catch (error) {
      console.log(error)
      res.status(500).send(error.message)
    }
}

const signIn = async (req, res)=>{
  const { email, password } = req.body
  console.log('cheguei aqui')
  try {
    let token = uuid();
    const result = await db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password])
    const user_id = result.rows[0].id
    if(result.rowCount > 0){
      await db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`,
      [user_id, token])  
      return res.status(200).send({token})
    }

  } catch (error) {
    res.status(500).send(error.message)
  }
}
export {signUp, signIn};