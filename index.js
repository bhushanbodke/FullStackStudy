require("dotenv").config();

let morgan = require("morgan");
let express = require("express");
let cors = require("cors");
let app = express();
let Note = require("./Note");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  Note.find({}).then((data) => res.json(data));
});

app.get("/info", (req, res) => {
  let response = `<h1>PhoneBook Has ${
    entries.length
  } entries</h1> </hr><h2>${Date()}</h2>`;
  res.send(response);
});

app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  res.json(entries.find((i) => i.id === id));
});

app.delete("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  let entry = entries.find((i) => i.id === id);
  if (entry) {
    entries = entries.filter((i) => i !== entry);
    res.sendStatus(200);
    res.end();
  } else {
    res.sendStatus(404);
    res.end();
  }
});

app.post("/api/persons", (req, res) => {
  let maxId = Math.max(...entries.map((i) => i.id));
  let [name, number] = [req.body.name, req.body.number];
  if (entries.find((i) => i.name === name)) {
    res.json({ error: "already contains someone with name " });
  }
  let new_person = {
    id: maxId + 1,
    name: name,
    number: number,
  };
  entries = entries.concat(new_person);
  res.json(new_person);
});

app.listen(process.env.PORT, () =>
  console.log(
    "----------------------server started on port 3001 ----------------"
  )
);
