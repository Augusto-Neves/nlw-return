import express from "express";
import { routes } from "./router";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`🚀Server running on port ${port}🚀`);
  console.log("Press CTRL+C to stop");
});
