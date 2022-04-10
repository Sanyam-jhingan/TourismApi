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
    `SELECT * FROM states WHERE state_id = ${req.params.state_id}`,
    (err, result) => {
      if(err){
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
  
  app.get("/places", (req, res) => {
    client.query("SELECT * FROM tourist_places", (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        res.send(result.rows)
      }
    })
  })
  
  app.get("/states/:state_id/places", (req, res) => {
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

app.get("/states/:state_id/places/:tourist_place_id", (req, res) => {
  client.query(
    `SELECT * FROM tourist_places WHERE state_id = ${req.params.state_id} AND place_id = ${req.params.tourist_place_id}`,
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

app.get("/places/:place_id", (req, res) => {
  client.query(
    `SELECT * FROM tourist_places WHERE place_id = ${req.params.place_id}`,
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

app.post("/states/:state_id/places", (req, res) => {
  client.query(
    `INSERT INTO tourist_places (name, description, image_url, state_id) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.image_url}', ${req.params.state_id})`,
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
  const { name, image_url } = req.body
  client.query(
    `INSERT INTO states (name, image_url) VALUES ('${name}', '${image_url}')`,
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

app.put("/states/:state_id", (req, res) => {
  const id = req.params.id
  const { name, image_url } = req.body
  client.query(
    `UPDATE states SET name = '${name}', image_url = '${image_url}' WHERE state_id = ${state_id}`,
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

app.put("/states/:state_id/places/:tourist_place_id", (req, res) => {
  const { name, description, image_url } = req.body
  const state_id = req.params.state_id
  const tourist_place_id = req.params.tourist_place_id
  client.query(
    `UPDATE tourist_places SET name = '${name}', description = '${description}', image_url = '${image_url}' WHERE state_id = ${state_id} AND place_id = ${tourist_place_id}`,
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

app.delete("/states/:state_id", (req, res) => {
  const state_id = req.params.state_id
  client.query(`DELETE FROM states WHERE state_id = ${state_id}`, (err, result) => {
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

app.delete("/states/:state_id/places/:tourist_place_id", (req, res) => {
  const state_id = req.params.state_id
  const tourist_place_id = req.params.tourist_place_id
  client.query(
    `DELETE FROM tourist_places WHERE state_id = ${state_id} AND place_id = ${tourist_place_id}`,
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

app.delete("/places/:place_id", (req, res) => {
  client.query(
    `DELETE FROM tourist_places WHERE place_id = ${req.params.place_id}`,
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
