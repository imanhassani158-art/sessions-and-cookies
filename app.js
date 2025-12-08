const express = require('express')
const app = express()
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorhandling");
app.use(express.json());
app.use("/posts", postRoutes);
app.use(errorHandler);

app.listen(3000, () => console.log("Server running"));