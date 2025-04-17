import { Router } from "express";
import {
    createPlayer,
    deletePlayerById,
    getAllPlayers,
    getPlayerById,
    updatePlayerById,
} from "../controllers/playerController";

const playerRouter = Router();

playerRouter.post("/createPlayer", createPlayer);
playerRouter.get("/getAllPlayers", getAllPlayers);
playerRouter.get("/getPlayer/:id", getPlayerById);
playerRouter.delete("/deletePlayer/:id", deletePlayerById);
playerRouter.put("/updatePlayer/:id", updatePlayerById); // Assuming you want to use the same createPlayer function for update

export default playerRouter;
