const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./models/user");
const Student = require("./models/student");
const Class = require("./models/class");
const isAuth = require("./middleware/auth");
const dbConnection = require("./connection/connection");
dbConnection();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validation for all fields
    if (!name || !email || !password) {
      return res.status(400).send("Please provide all fields");
    }

    //check if user already exists
    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
      return res.status(409).send("User is already registered");
    }

    //hashing the password

    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    //creating token
    const token = jwt.sign({ _id: user._id.toString() }, "Pm1qWmxsbP", {
      expiresIn: "1h",
    });

    user.token = token;

    await user.save();

    res.status(200).send({ user });
  } catch (e) {}
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation for all fields
    if (!email || !password) {
      return res.status(409).send("Please provide all fields");
    }

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ error: "no_user_found" });
    }

    //match password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.send({ error: "invalid_details" });
    }

    //creating token

    const token = jwt.sign({ _id: user._id.toString() }, "Pm1qWmxsbP", {
      expiresIn: "1h",
    });

    user.token = token;

    await user.save();

    //send user details
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

app.post("/add-student", async (req, res) => {
  try {
    const { firstName, lastName, className, mode } = req.body;

    if (!firstName || !lastName || !className || !mode) {
      return res.status(409).send("Please provide all fields");
    }

    const result = await Student.create({
      firstName,
      lastName,
      className,
      mode,
    });

    if (result) {
      res.send("Student has been added successfully");
    }
  } catch (e) {
    res.send(e);
  }
});

app.post("/add-class", async (req, res) => {
  try {
    const { addClass, classFees } = req.body;

    const Isduplicate = await Class.findOne({ className: addClass });

    if (Isduplicate) {
      return res.send({ error: "Class already exists" });
    }

    const result = await Class.create({
      className: addClass,
      fees: classFees,
    });

    if (result) {
      res.send("Class has been added successfully");
    }
  } catch (e) {
    res.send(e);
  }
});

app.get("/get-class-name", async (req, res) => {
  const data = await Class.find();
  res.send(data);
});

app.post("/dashboard", isAuth, (req, res) => {
  res.send("welcome to dashboard");
});

app.post("/generate-challan", async (req, res) => {
  try {
    const { className } = req.body;

    const result = await Class.findOne({ className }).lean();
    const { fees } = result;

    const students = await Student.find({ className, mode: [2, 4] }).lean();

    //Generating Issue Date
    const dateObj = new Date();
    let date = ("0" + dateObj.getDate()).slice(-2);
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let year = dateObj.getFullYear();
    const issueDate = year + "-" + month + "-" + date;

    // console.log("Issue Date:", issueDate);
    // console.log("Due Date", dueDate);

    students.forEach((element) => {
      //Generating Due Date
      let d = new Date();
      d.setDate(d.getDate() + 21 * element.mode);
      const dueDate = JSON.stringify(d).split("T")[0].slice(1);

      element.fees = element.mode * fees;
      element.issueDate = issueDate;
      element.dueDate = dueDate;
    });

    res.send(students);
  } catch (e) {
    res.send(e);
  }
});

app.listen(PORT, () => {
  `Server is up & running at port ${PORT}`;
});