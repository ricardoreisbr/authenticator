const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

// FAKE DATABASE
const users = [
  {
    id: "1",
    email: "ricardoreis@outlook.com",
    cellphone: "973367188",
    password: "123",
  },
  {
    id: "2",
    email: "guto@outlook.com",
    cellphone: "973367189",
    password: "123",
  },
];

const secretKey = process.env.SECRET_KEY || "guto";
const port = process.env.PORT || 3002;

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

function handleProfilePage(user) {
  return { email: user.email, cellphone: user.cellphone };
}

app.get("/profile", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = users.filter((item) => item.email == decoded.email);
    const result = handleProfilePage(user[0]);

    res.json(result);
  } catch (err) {
    res.json({});
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
