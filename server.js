// Line 1 — express library import kero (for making the server)
const express = require("express");

// Line 2 — mongoose library import karo (MongoDB se baat karta hai)
const mongoose = require("mongoose");

// Line 3 — cors import karo (browser ko allow karta hai server se baat karne ke liye)
const cors = require("cors");

// Line 5 — express app banao
const app = express();

// Line 7 — cors middleware lagao
app.use(cors());

// Line 8 — JSON data samajhne ke liye
app.use(express.json());

// Line 10 — Atlas ki link (apna password daalo)
const MONGO_URI = "mongodb+srv://anuragk06469_db_user:Hm0Km1kPHg21mclx@cluster0.xpu1wyr.mongodb.net/studentdata";

// Line 12 — Atlas se connect karo
mongoose.connect(MONGO_URI)
  .then(() => console.log(" Atlas are connected!"))
  .catch((err) => console.log("Error:", err.message));

// Line 16 — Student ka structure batao (Schema)
const Student = mongoose.model("Student", {
  name:   String,
  age:    Number,
  course: String
});

// Line 22 — CREATE — naya student add karo
app.post("/studentdata", async (req, res) => {
  const s = new Student(req.body);
  await s.save();
  res.json({ message: req.body.name + " Added!" });
});

// Line 28 — READ — sab students lao
app.get("/studentdata", async (req, res) => {
  const all = await Student.find();
  res.json(all);
});

// Line 33 — UPDATE — student ki info badlo
app.put("/studentdata/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// Line 38 — DELETE — student hatao
app.delete("/studentdata/:id", async (req, res) => {
  const d = await Student.findByIdAndDelete(req.params.id);
  res.json({ message: d.name + " deleted" });
});

// Line 43 — Server port 5000 pe chalao
app.listen(5000, () => console.log("Server: http://localhost:5000"));