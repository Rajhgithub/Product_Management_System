const mysql = require("mysql");

const productPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

exports.getAllProducts = (req, res) => {
  productPool.query("SELECT * FROM product", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.status(200).json({ data: results });
  });
};

exports.addProduct = (req, res) => {
  const { productName, price, quantity } = req.body;
  if (!productName || !price || !quantity) return res.status(400).json({ message: "All fields required" });

  productPool.query(
    "INSERT INTO product (ProductName, Price, Quantity) VALUES (?, ?, ?)",
    [productName, price, quantity],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Insert failed", error: err });
      res.status(201).json({ message: "Product added", productId: result.insertId });
    }
  );
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  productPool.query("SELECT * FROM product WHERE ID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Fetch failed", error: err });
    if (!result.length) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ data: result[0] });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { productName, price, quantity } = req.body;
  if (!productName || !price || !quantity) return res.status(400).json({ message: "All fields required" });

  productPool.query(
    "UPDATE product SET ProductName = ?, Price = ?, Quantity = ? WHERE ID = ?",
    [productName, price, quantity, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Update failed", error: err });
      res.status(200).json({ message: "Product updated" });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  productPool.query("DELETE FROM product WHERE ID = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    res.status(200).json({ message: "Product deleted" });
  });
};