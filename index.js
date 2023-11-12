let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

let morgan = require("morgan");
let express = require("express");
let cors = require("cors");

let app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  res.json(entries);
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

app.listen(3001);
