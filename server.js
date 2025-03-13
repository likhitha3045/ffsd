const express = require("express");
const app = express();
const path = require("path");

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Define a route
app.get("/", (req, res) => {
  res.render("home", { name: "likki" });
});

app.get("/home2", (req, res) => {
    const data={ name: "likki",hobbies:["playing cricket","sleeping"] };
    res.render('home2' , {data : data});

  });
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
