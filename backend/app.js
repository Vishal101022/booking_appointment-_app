const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/userRoutes");
const db = require("./util/db");
const cors = require("cors");


const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', router);


async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

testConnection();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});