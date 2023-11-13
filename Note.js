let mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MANGO_DB_URL;

console.log("connecting to url : ", url);
mongoose
  .connect(url)
  .then(() => console.log("connection sucess"))
  .catch((error) => console.log("failed to connect to database : ", error));

let note_schema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

note_schema.set("toJSON", {
  transform: (document, returned_data) => {
    delete returned_data._id;
    delete returned_data.__v;
  },
});

module.exports = mongoose.model("note", note_schema);
