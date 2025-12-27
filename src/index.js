const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const port = process.env.PORT || 5001;

const seedAdmin = require("./seeders/adminSeeder");

connectDB().then(() => {
  seedAdmin();
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/admin/auth", require("./routes/admin/authRoutes"));
app.use("/api/admin/products", require("./routes/admin/productRoutes"));
app.use(
  "/uploads",
  express.static(require("path").join(__dirname, "../public/uploads"))
);

app.get("/", (req, res) => {
  res.send("Store API is running");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
