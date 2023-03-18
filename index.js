const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { ServerApiVersion } = require("mongodb");
const StudentsSingUpRouter = require("./Controller/Router/Student/StudentsRouter/StudentsSingUpRouter");
const StudentLoginRouter = require("./Controller/Router/Student/StudentsRouter/StudentLoginRouter");
const TeacherSingupRouter = require("./Controller/Router/Teacher/TeachersRouter/TeacherSingUpRouter");
const StudnetProfileRouter = require("./Controller/Router//Student/StudentsRouter/StudentProfileRouter");
const Role = require("./Controller/Router/RoleRouter/Role");
const AdminMakeRouter = require("./Controller/Router/Admin/AdminRotuer/AdminMakeRouter");
const PostRouter = require("./Controller/Router/PostRouter/PostRouter");
const AddCourseRouter = require("./Controller/Router/Course/AddCourseRouter");
const BuyCorseRouter = require("./Controller/Router/Course/BuyCourseRouter")
const ModuleRouter = require("./Controller/Router/Module/ModuleRouter");
// const NodeMailerRouter = require("./Controller/Router/NodeMailer/NodeMailer");

app = express();
// running  message
app.get("/", (req, res) => {
  res.send("Running server");
});

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// database connect..............

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("database connect success");
  })
  .catch((err) => {
    console.log(err);
  });

// router controller

app.use("/student", StudentsSingUpRouter);
app.use("/login", StudentLoginRouter);
app.use("/teacher", TeacherSingupRouter);
app.use("/profile", StudnetProfileRouter);
app.use("/admin", AdminMakeRouter);
app.use("/role", Role);
app.use("/post", PostRouter);
app.use("/course", AddCourseRouter);
app.use('/module' , ModuleRouter)
app.use('/buy' , BuyCorseRouter)
// app.use('/email' , NodeMailerRouter)



app.listen(process.env.PORT, () => {
  console.log(`app listening to port: ${process.env.PORT}`);
});
