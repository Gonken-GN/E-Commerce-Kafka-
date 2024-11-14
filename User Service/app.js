const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
});
