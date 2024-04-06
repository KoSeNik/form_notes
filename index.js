require("dotenv").config();

const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { addNote, getNotes } = require("./notes.controller");
const { addUser, loginUser } = require("./users.controller");
const auth = require("./middlewares/auth");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/");
  } catch (e) {
    res.render("login", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);

    res.redirect("/login");
  } catch (e) {
    if (e.code === 11000) {
      res.render("register", {
        title: "Express App",
        error: "Email is already registered",
      });

      return;
    }
    res.render("register", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });

  res.redirect("/login");
});

app.use(auth);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Запись к врачу",
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(
      req.body.fio,
      req.body.phoneNumber,
      req.body.descriptionProblem
    );
    res.status(200).send("Note add successfully");
  } catch (error) {
    console.error("Creation error", error);
    res.status(500).send("Error add note");
  }
});

app.get("/notes", async (req, res) => {
  try {
    res.render("notes", {
      title: "Заявки с формы",
      notes: await getNotes(),
    });
  } catch (error) {
    console.error("Error output notes:", error);
  }
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
  });
});
