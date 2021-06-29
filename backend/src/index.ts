require("dotenv").config();
import express from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is runniddng at https://localhost:${PORT}`);
});
