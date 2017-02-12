"use strict"

const express       = require('express')
const bodyParser    = require('body-parser')
const mysql         = require('mysql')
const cors          = require('cors')
const jwt           = require('jsonwebtoken')
const passwordHash  = require('password-hash')
const config        = require('./config')
const path          = require('path');

const app = express()
const apiRoute = express.Router()

const conn = mysql.createConnection(config.database)

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cors()) //enable all CORS requests
app.use(express.static(path.join(__dirname, 'public'))) //serve static files

app.set('secretstuff', config.secret)

//LOGIN
apiRoute.post('/login', (req, res) => {

  var user = req.body.user

  conn.query('SELECT * FROM kayttajat WHERE tunnus = ?', [user], (err, results, fields) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      if(results.length !== 0 && results[0].tunnus === user) {
        if(passwordHash.verify(req.body.pass, results[0].salasana)){
          var token = jwt.sign(user, app.get('secretstuff')) //create new token
          var userObj = {tunnus: results[0].tunnus, nimi: results[0].nimi, token: token}
          res.json(userObj) //return userObj
        } else { res.sendStatus(401) }
      } else { res.sendStatus(401) }
    }
  }) //conn.query

}) //apiRoute.post

//SET AUTHED ROUTES
apiRoute.use((req, res, next) => {

	var token = req.body.token || req.query.token || req.headers['x-access-token']

	if(token) {
		jwt.verify(token, app.get('secretstuff'), (err, decoded) => {
			if(err) {
				return res.sendStatus(401) //verify failed => send unauthorized
			} else {
				req.decoded = decoded //save request for other routes
				next() //continue to route
			}
		})
	} else {
		res.sendStatus(401)
	}

}) //apiRoute.use

//GET
apiRoute.get('/data/:tbl', (req, res) => {

	conn.query(`SELECT * FROM ${req.params.tbl} ORDER BY id DESC`, (err, results, fields) => {
		if(err) {
			console.log(err)
			res.sendStatus(500)
		} else {
			res.json(results)
		}
	}) //conn.query

}) //apiRoute.get

//ADD NEW
apiRoute.post('/data/:tbl', (req, res) => {

	conn.query(`INSERT INTO ${req.params.tbl} SET ?`, req.body.data, (err, results, fields) => {
		if(err) {
			console.log(err)
      res.sendStatus(500)
		} else {
			console.log(`Added id ${results.insertId}`)
			res.json(results)
		}
	}) //conn.query

}) //apiRoute.post

//UPDATE EXISTING
apiRoute.post('/data/:tbl/:id', (req, res) => {

	conn.query(`UPDATE ${req.params.tbl} SET ? WHERE id = ?`, [req.body.data, req.params.id], (err, results, fields) => {
		if(err) {
			console.log(err)
      res.sendStatus(500)
		} else {
			console.log(`Updated ${results.affectedRows} row`)
			res.json(results)
		}
	}) //conn.query

}) //apiRoute.post

//DELETE ROW
apiRoute.delete('/data/:tbl/:id', (req, res) => {

	conn.query(`DELETE FROM ${req.params.tbl} WHERE id = ?`, req.params.id, (err, results, fields) => {
		if(err) {
			console.log(err)
      res.sendStatus(500)
		} else {
			res.json(results)
			console.log(`Deleted ${results.affectedRows} row`)
		}
	}) //conn.query

}) //apiRoute.delete

//MOVE TO
apiRoute.post('/move/:id/:to/:from', (req, res) => {

  var insertId;

  conn.beginTransaction( (err) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    }

		conn.query(`INSERT INTO ${req.params.to} SET ?`, req.body.data, (error, results, fields) => {
      if(error) {
        return conn.rollback( () => {
          console.log(error)
          res.sendStatus(500)
				})
			}
      else { insertId = results.insertId }
		}) //conn.query

		conn.query(`DELETE FROM ${req.params.from} WHERE id = ?`, req.params.id, (error, results, fields) => {
			if(error || results.affectedRows === 0) {
				return conn.rollback( () => {
					console.log(error)
          res.sendStatus(500)
				})
			}

      conn.commit( (err) => {
        if (err) {
          return conn.rollback( () => {
            console.log(err)
            res.sendStatus(501)
          })
        } else {
          console.log('Transaction success!')
					res.json({insertId:insertId})
        }
      }) //conn.commit

    }) //conn.query

  }) //conn.beginTransaction

}) //apiRoute.post

apiRoute.get('/find/:tbl/:reg', (req, res) => {

	conn.query(`SELECT COUNT(*) AS count FROM ${req.params.tbl} WHERE reknro = ?`, req.params.reg, (err, results, fields) => {
		if(err) {
			console.log(err)
			res.sendStatus(500)
		} else {
			res.send(results)
		}
	}) //conn.query

}) //apiRoute.get

app.use('/api', apiRoute)

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
