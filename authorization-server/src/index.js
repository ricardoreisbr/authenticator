const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const secretKey = "guto";

// FAKE DATABASE
const users = [
  {
    id: "1",
    email: "ricardoreis@outlook.com",
    password: "123",
  },
  {
    id: "2",
    email: "guto@outlook.com",
    password: "123",
  },
];

var port = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({ title: "Hello, world (again)!" });
});

function createToken(email) {
  const payload = { email };
  const token = jwt.sign(payload, secretKey);

  return {
    access_token: token,
    token_type: "Bearer",
  };
}

function authorization(user) {
  const { email, password } = user;

  data = users.filter(
    (item) => item.email == email && item.password == password
  );
  return data.length ? createToken(email) : {};
}

app.get("/login", (req, res) => {
  const token = authorization(req.body);
  res.json(token);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
