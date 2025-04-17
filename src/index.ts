import express, { Express } from "express";
import { config } from "dotenv";
import playerRouter from "./routes/playerRoutes";

const app: Express = express();
config();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/player", playerRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
