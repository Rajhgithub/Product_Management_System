const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit:10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

exports.view = (req, res)=>{
  pool.getConnection((err, connection)=>{
    if(err) throw err
    // console.log("Connection success");
    connection.query("select * from product", (err,rows)=>{
      connection.release();
      if(!err){
        console.log("Success");
        res.render("home", { rows, user: req.user });
      }
      else{
        console.log("Error in listing Data : " + err);
      }
    });
  });
};

exports.addproduct = (req, res)=>{
  return res.status(400).render("addproduct", { rows: [], user: req.user});
};

exports.save = (req, res)=>{
  pool.getConnection((err, connection)=>{
    if(err) throw err
    try {
    const{productName, price, quantity} = req.body;

    if (!productName || !price || !quantity) {
     
    return res.status(400).render("addproduct", { rows: [], user: req.user, msg: "Please enter Product name, price and Quantity", msg_type: "error"});

    }
    connection.query("INSERT INTO product (ProductName, Price, Quantity) VALUES (?, ?, ?)", [productName, price, quantity], (err,rows)=>{
      connection.release();
      if(!err){
        console.log("Successfully Inserted");
      
        return res.status(400).render("addproduct", { rows: [], user: req.user, msg: "Product Details Successfully Added", msg_type: "good"});
      }
      else{
        console.log("Error in listing Data : " + err);
      }

    });

    }catch (error) {
     console.log(error);
  }
  });
};

exports.editproduct = (req, res)=>{
  pool.getConnection((err, connection)=>{
    if(err) throw err
    // Get ID from url
    let id = req.params.id;

    connection.query("select * from product where ID=?", [id] , (err,rows)=>{
      connection.release();
      if(!err){
         res.render("editproduct", { rows, user: req.user });
      }
      else{
        console.log("Error in Editing Data : " + err);
      }
    });
  });
};

exports.edit = (req, res)=>{
  pool.getConnection((err, connection)=>{
    if(err) throw err
    
    try {
    const{productName, price, quantity} = req.body;
      let id = req.params.id;

    if (!productName || !price || !quantity) {
 
      return res.status(400).render("editproduct", { rows: [], user: req.user, msg: "Please enter Product name, price and Quantity", msg_type: "error"});

    }
    connection.query("update product set ProductName=?, Price=?, Quantity=? where ID=?", [productName, price, quantity, id], (err,rows)=>{
      connection.release();
      if(!err){
        console.log("Successfully Updated");
        res.render("addproduct", { rows, user: req.user, msg: "Product Details Successfully Edited", msg_type: "good" });
      }
      else{
        console.log("Error in Updated Data : " + err);
      }
    });

    }catch (error) {
     console.log(error);
  }
  });
};

exports.delete = (req, res)=>{
  pool.getConnection((err, connection)=>{
    if(err) throw err
    try {
      let id = req.params.id;
    connection.query("delete from product where ID=?", [id], (err,rows)=>{
      connection.release();
      if(!err){
        console.log("Product Successfully Deleted");
        res.redirect("/home");
      }
      else{
        console.log("Error in Deleting Data : " + err);
      }
    });
    }catch (error) {
     console.log(error);
  }
  });
};
