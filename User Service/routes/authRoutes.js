const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

require("dotenv").config();

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExist.rows.length > 0) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword]
  );

  return res.status(201).send({
    id: user.rows[0].id,
    username: user.rows[0].username,
    email: user.rows[0].email,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length === 0) {
    return res.status(400).send("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = generateToken({
    id: user.rows[0].id,
    email: user.rows[0].email,
  });

  return res.status(200).send({ token });
});

router.get("/validate", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
});
