const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dateFns = require("date-fns");
const cors = require("cors");
const User = require("./models/user");
const Student = require("./models/student");
const Class = require("./models/class");
const Challan = require("./models/challan");
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

    const students = await Student.find({ className, mode: [2, 4, 1] }).lean();

    //MODE 1 CODE

    // const modeOneStudents = students.filter((item) => {
    //   return item.mode === 1;
    // });

    // const newArray = students.filter((item) => {
    //   return item.mode !== 1;
    // });

    //Generating Issue Date
    const dateObj = new Date();
    let date = ("0" + dateObj.getDate()).slice(-2);
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let year = dateObj.getFullYear();
    const issueDate = year + "-" + month + "-" + date;

    let finalFees, finalIssueData, finalDueDate;

    students.forEach((element) => {
      let d = new Date();
      d.setDate(d.getDate() + 21 * element.mode);
      const dueDate = JSON.stringify(d).split("T")[0].slice(1);

      finalFees = element.mode * fees;
      finalIssueData = issueDate;
      finalDueDate = dueDate;

      const saveChallan = async () => {
        const newChallan = await Challan.create({
          fees: finalFees,
          issueDate: finalIssueData,
          dueDate: finalDueDate,
          challan: element._id,
          mode: element.mode,
        });
        // console.log("doc", newChallan);
        if (newChallan.mode === 1) {
          const str = finalDueDate;
          const date = new Date(str);

          //add one month
          const addedMonthDate = dateFns.addMonths(date, 1);

          //set date to 1st
          const changedIssueDate = dateFns.setDate(addedMonthDate, 1);

          const changedIssueDateCopy = new Date(changedIssueDate);

          //add 3 weeks in issue date to make due date
          let changedDueDate = changedIssueDateCopy.setDate(
            changedIssueDateCopy.getDate() + 21
          );
          const changedDueDateLatest = new Date(changedDueDate);

          const changedIssueDateStr = JSON.stringify(changedIssueDate)
            .split("T")[0]
            .slice(1);

          const changedDueDateStr = JSON.stringify(changedDueDateLatest)
            .split("T")[0]
            .slice(1);

          const newChallan = await Challan.create({
            fees: finalFees,
            issueDate: changedIssueDateStr,
            dueDate: changedDueDateStr,
            challan: element._id,
            mode: element.mode,
          });
        }
      };
      saveChallan();
    });

    res.send("challans generated");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.get("/display-challan", async (req, res) => {
  // const result = await Challan.find({}).populate({
  //   path: "challan",
  //   options: { sort: "firstName" },
  // });
  // const result = await Challan.find({}).populate("challan").sort({ mode: 1 });
  const result = await Challan.find({}).populate("challan");
  res.send(result);
});

app.post("/update-status", async (req, res) => {
  const { challanId, status } = req.body;

  console.log(req.body);

  const challan = await Challan.findOneAndUpdate(
    { _id: challanId },
    { status },
    { new: true }
  );

  console.log(challan);

  res.send(challan);
});

app.listen(PORT, () => {
  `Server is up & running at port ${PORT}`;
});
