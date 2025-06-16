const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const pool = mysql.createPool({
  connectionLimit:10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", { msg: "Please Enter Your Email and Password", msg_type: "error",});
    }

    pool.query("select * from users where email=?",[email], async (error, result) => {
        console.log(result);
        if (result.length <= 0) {
          return res.status(401).render("login", { msg: "Please Enter Your Email and Password", msg_type: "error",});
        } else {
          if (!(await bcrypt.compare(password, result[0].PASS))) {
            return res.status(401).render("login", { msg: "Please Enter Your Email and Password", msg_type: "error",});
          } else {
            const id = result[0].ID;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN, });
            console.log("Token is : " + token);

            const cookieOptions = { expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), httpOnly: true,};
            res.cookie("Rajh_keyName", token, cookieOptions);
            res.status(200).redirect("/home");
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.register = (req, res) => {
    console.log(req.body);
  const { name, email, password, confirm_password } = req.body;
  pool.query("select email from users where email=?", [email], async (error, result) => {
      if (error) {
        confirm.log(error);
      }
      if (result.length > 0) {
        return res.render("register", {msg: "Email id already Taken", msg_type: "error",});
      } 
      else if (password !== confirm_password) {
        return res.render("register", { msg: "Passwords not match", msg_type: "error", });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      //console.log(hashedPassword);
      pool.query("insert into users set ?", { name: name, email: email, pass: hashedPassword }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            return res.render("register", { msg: "User Registration Success", msg_type: "good",});
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.Rajh_keyName) {
    try {
      const decode = await promisify(jwt.verify)(req.cookies.Rajh_keyName, process.env.JWT_SECRET);
      //console.log(decode);
      pool.query("select * from users where id=?", [decode.id], (err, results) => {
          // console.log(results);
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("Rajh_keyName", "logout", { expires: new Date(Date.now() + 2 * 1000), httpOnly: true,});
  res.status(200).redirect("/");
};

// exports.view = (req, res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err
//     // console.log("Connection success");
//     connection.query("select * from product", (err,rows)=>{
//       connection.release();
//       if(!err){
//         console.log("Success");
//         res.render("home", { rows, user: req.user });
//       }
//       else{
//         console.log("Error in listing Data : " + err);
//       }
//     });
//   });
// };

// exports.addproduct = (req, res)=>{
//   return res.status(400).render("addproduct", { rows: [], user: req.user});
// };

// exports.save = (req, res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err
//     try {
//     const{productName, price, quantity} = req.body;

//     if (!productName || !price || !quantity) {
     
//     return res.status(400).render("addproduct", { rows: [], user: req.user, msg: "Please enter Product name, price and Quantity", msg_type: "error"});

//     }
//     connection.query("INSERT INTO product (ProductName, Price, Quantity) VALUES (?, ?, ?)", [productName, price, quantity], (err,rows)=>{
//       connection.release();
//       if(!err){
//         console.log("Successfully Inserted");
      
//         return res.status(400).render("addproduct", { rows: [], user: req.user, msg: "Product Details Successfully Added", msg_type: "good"});
//       }
//       else{
//         console.log("Error in listing Data : " + err);
//       }

//     });

//     }catch (error) {
//      console.log(error);
//   }
//   });
// };

// exports.editproduct = (req, res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err
//     // Get ID from url
//     let id = req.params.id;

//     connection.query("select * from product where ID=?", [id] , (err,rows)=>{
//       connection.release();
//       if(!err){
//          res.render("editproduct", { rows, user: req.user });
//       }
//       else{
//         console.log("Error in Editing Data : " + err);
//       }
//     });
//   });
// };

// exports.edit = (req, res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err
    
//     try {
//     const{productName, price, quantity} = req.body;
//       let id = req.params.id;

//     if (!productName || !price || !quantity) {
 
//       return res.status(400).render("editproduct", { rows: [], user: req.user, msg: "Please enter Product name, price and Quantity", msg_type: "error"});

//     }
//     connection.query("update product set ProductName=?, Price=?, Quantity=? where ID=?", [productName, price, quantity, id], (err,rows)=>{
//       connection.release();
//       if(!err){
//         console.log("Successfully Updated");
//         res.render("addproduct", { rows, user: req.user, msg: "Product Details Successfully Edited", msg_type: "good" });
//       }
//       else{
//         console.log("Error in Updated Data : " + err);
//       }
//     });

//     }catch (error) {
//      console.log(error);
//   }
//   });
// };

// exports.delete = (req, res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err
//     try {
//       let id = req.params.id;
//     connection.query("delete from product where ID=?", [id], (err,rows)=>{
//       connection.release();
//       if(!err){
//         console.log("Product Successfully Deleted");
//         res.redirect("/home");
//       }
//       else{
//         console.log("Error in Deleting Data : " + err);
//       }
//     });
//     }catch (error) {
//      console.log(error);
//   }
//   });
// };




 