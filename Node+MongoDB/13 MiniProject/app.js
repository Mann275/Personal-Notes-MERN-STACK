const express = require("express");
const app = express();
const UserModel = require("./models/user");
const PostModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("./config/multerconfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile/upload", (req, res) => {
  res.render("profileupload");
});

app.post("/upload", isloggedin, upload.single("image"), async (req, res) => {
  let user = await UserModel.findOne({ email: req.user.email });
  user.profilePic = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

app.get("/profile", isloggedin, async (req, res) => {
  let user = await UserModel.findOne({ email: req.user.email }).populate(
    "posts",
  );
  res.render("profile", { user });
});

app.get("/like/:id", isloggedin, async (req, res) => {
  let post = await PostModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isloggedin, async (req, res) => {
  let post = await PostModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/update/:id", isloggedin, async (req, res) => {
  let post = await PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content },
  );
  res.redirect("/profile");
});

app.get("/delete/:id", isloggedin, async (req, res) => {
  try {
    let post = await PostModel.findOne({ _id: req.params.id });

    // Remove post from user's posts array
    await UserModel.updateOne(
      { _id: post.user },
      { $pull: { posts: post._id } },
    );

    // Delete the post
    await PostModel.findOneAndDelete({ _id: req.params.id });

    res.redirect("/profile");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
  }
});

app.post("/post", isloggedin, async (req, res) => {
  let user = await UserModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await PostModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).send("User already exists");
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await UserModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user._id }, "shhh");
      res.cookie("token", token);
      res.send("User registered successfully");
    });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).send("Something went wrong");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isloggedin(req, res, next) {
  if (!req.cookies.token || req.cookies.token === "") res.redirect("/login");
  else {
    try {
      let data = jwt.verify(req.cookies.token, "shhh");
      req.user = data;
      next();
    } catch (error) {
      res.cookie("token", "");
      res.redirect("/login");
    }
  }
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
