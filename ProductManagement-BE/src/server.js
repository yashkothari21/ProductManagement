const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
require("./db/db.config");


app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
