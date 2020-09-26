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
    cellphone: "973367189",
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
const port = process.env.PORT || 3001;

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

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

app.post("/login", (req, res) => {
  const token = authorization(req.body);
  res.json(token);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
