import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import dotenv from "dotenv";
import connection from "./db/connection.js";

const app = express();

dotenv.config();

connection();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(route);

app.listen(port, () => console.log(`Server is running on port: ${port}`));

export default app;
