
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./db/connection");


const blogRoutes = require('./Routers/blogRoutes');
const userRoutes = require('./Routers/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

const PORT = process.env.PORT || 5000; // Use a default port if PORT is not set

app.use("/api", blogRoutes);
app.use('/api', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
