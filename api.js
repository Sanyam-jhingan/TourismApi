const client = require("./connection")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 3300
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

client.connect()

app.get("/" , (req, res) => {
    res.send("Go to /states")
})

app.get("/states", (req, res) => {
  client.query("SELECT * FROM states", (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(result.rows)
    }
  })
})

app.get("/states/:state_id", (req, res) => {
  client.query(
    `SELECT * FROM tourist_places WHERE state_id = ${req.params.state_id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (result.rows.length === 0) {
        res.sendStatus(404)
      } else {
        res.send(result.rows)
      }
    }
  )
})

app.get("/states/:state_id/:tourist_place_id", (req, res) => {
  client.query(
    `SELECT * FROM tourist_places WHERE state_id = ${req.params.state_id} AND id = ${req.params.tourist_place_id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (result.rows.length === 0) {
        res.sendStatus(404)
      } else {
        res.send(result.rows)
      }
    }
  )
})

app.post("/states/:state_id", (req, res) => {
  client.query(
    `INSERT INTO tourist_places (name, description, state_id) VALUES ('${req.body.name}', '${req.body.description}', ${req.params.state_id})`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        res.sendStatus(201)
      }
    }
  )
})

app.post("/states", (req, res) => {
  const name = req.body["name"]
  client.query(
    `INSERT INTO states (name) VALUES ('${name}')`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        res.sendStatus(201)
      }
    }
  )
})

app.put("/states/:id", (req, res) => {
  const id = req.params.id
  const name = req.body["name"]
  client.query(
    `UPDATE states SET name = '${name}' WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (result.rowCount === 0) {
        res.sendStatus(404)
      } else {
        res.send("Updated")
      }
    }
  )
})

app.put("/states/:state_id/:tourist_place_id", (req, res) => {
  const state_id = req.params.state_id
  const tourist_place_id = req.params.tourist_place_id
  const name = req.body["name"]
  const description = req.body["description"]
  client.query(
    `UPDATE tourist_places SET name = '${name}', description = '${description}' WHERE state_id = ${state_id} AND id = ${tourist_place_id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (result.rowCount === 0) {
        res.sendStatus(404)
      } else {
        res.send("Updated")
      }
    }
  )
})

app.delete("/states/:id", (req, res) => {
  const id = req.params.id
  client.query(`DELETE FROM states WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else if (result.rowCount === 0) {
      res.sendStatus(404)
    } else {
      res.send("Deleted")
    }
  })
})

app.delete("/states/:state_id/:tourist_place_id", (req, res) => {
  const state_id = req.params.state_id
  const tourist_place_id = req.params.tourist_place_id
  client.query(
    `DELETE FROM tourist_places WHERE state_id = ${state_id} AND id = ${tourist_place_id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (result.rowCount === 0) {
        res.sendStatus(404)
      } else {
        res.send("Deleted")
      }
    }
  )
})
