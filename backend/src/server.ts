import express from "express";
import { routes } from "./router";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`🚀Server running on port ${port}🚀`);
  console.log("Press CTRL+C to stop");
});
