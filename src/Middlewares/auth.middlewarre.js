import db from '../Config/db.js'

export async function authValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')

  if (!token) return res.status(422).send("Informe o token!")
  try {
    const checkSession = await db.query(`SELECT * FROM sessions WHERE token = $1 `,[token])
    if (checkSession.rowCount === 0) return res.status(401).send("Você não possue acesso!")
    const id = checkSession.rows[0]
    res.locals.token = id
    next()

  } catch (error) {
    res.status(500).send(error)
  }
}

export async function auth(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')
  console.log('chegueia qui')
  if (!token) return res.status(401).send("Informe o token!")
  try {
    const checkSession = await db.query(`SELECT * FROM sessions WHERE token = $1 `,[token])
    if (checkSession.rowCount === 0) return res.status(401).send("Você não possue acesso!")
    const id = checkSession.rows[0].user_id
    console.log(id)
    res.locals.user = id
    next()
  } catch (error) {
    res.status(500).send(error)
  }
}