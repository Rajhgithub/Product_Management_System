const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/users");
const productsContoller = require("../controllers/products");

router.get(["/", "/login"], (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", userContoller.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// view all records
router.get("/home", userContoller.isLoggedIn, productsContoller.view, (req, res) => {
  if (req.user) {
    res.render("home", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// Add new products (addproduct butten click)
router.get("/addproduct", userContoller.isLoggedIn, productsContoller.addproduct, (req, res) => {
  if (req.user) {
    res.render("addproduct", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// Add new products (Save butten click)
router.post("/addproduct", userContoller.isLoggedIn, productsContoller.save, (req, res) => {
  if (req.user) {
    res.render("addproduct", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// Update product Details (Display form with former details)
router.get("/editproduct/:id", userContoller.isLoggedIn, productsContoller.editproduct, (req, res) => {
  if (req.user) {
    res.render("editproduct", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// Updated former product Details for submission
router.post("/editproduct/:id", userContoller.isLoggedIn, productsContoller.edit, (req, res) => {
  if (req.user) {
    res.render("editproduct", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// Updated former product Details for submission
router.get("/deleteproduct/:id", userContoller.isLoggedIn, productsContoller.delete, (req, res) => {
  if (req.user) {
    res.render("deleteproduct", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;