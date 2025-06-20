const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

exports.register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  pool.query("SELECT email FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (result.length > 0) return res.status(400).json({ message: "Email already exists" });
    if (password !== confirm_password) return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 8);
    pool.query("INSERT INTO users SET ?", { name, email, pass: hashedPassword }, (err) => {
      if (err) return res.status(500).json({ message: "Failed to register", error: err });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  pool.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (result.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, result[0].PASS);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: result[0].ID }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ message: "Login successful", token });
  });
};

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    pool.query("SELECT * FROM users WHERE ID = ?", [decoded.id], (err, result) => {
      if (err || !result.length) return res.status(401).json({ message: "Invalid token" });
      req.user = result[0];
      next();
    });
  } catch (err) {
    res.status(401).json({ message: "Token verification failed" });
  }
};





 