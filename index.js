// dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const bodyParser = require("body-parser");
const port = 3000 || process.env.PORT;

// app
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/user", routes.user);
app.use("/booking", routes.booking);

// listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
