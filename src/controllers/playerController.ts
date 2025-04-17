import prisma from "../config/database";
import { Request, Response } from "express";
import { Player } from "../model/player";
import { PlayerValidation } from "../validations/PlayerSchema";
import { z, ZodError } from "zod";

//saving Player
export const createPlayer = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const player: Player = req.body;
        PlayerValidation.parse(player); // Validate the player data using Zod

        //checking if user already exists
        const existingPlayer = await prisma.player.findUnique({
            where: { jersyNo: player.jersyNo },
        });

        if (existingPlayer) {
            return res.status(400).json({
                error: `Player already exists with jersyNo ${player.jersyNo}`,
            });
        }

        //creating player
        const newPlayer = await prisma.player.create({
            data: player as any,
        });
        return res.status(201).json("Player created successfully");
    } catch (error) {
        if (error instanceof ZodError) {
            const errorObj: Record<string, string> = {};
            console.error("Zod validation error:", error.errors);

            error.errors.forEach((err) => {
                const field = err.path[0] as string;
                errorObj[field] = err.message;
            });

            if (Object.keys(errorObj).length > 0) {
                return res.status(400).json({ errors: errorObj });
            }
        }

        console.error("Error creating player:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//getting all players
export const getAllPlayers = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const players: Player[] = await prisma.player.findMany();

        if (players.length === 0) {
            return res.status(404).json({ error: "No players found" });
        }
        return res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//getting player by id
export const getPlayerById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const id: string = req.params.id;

        if (id == undefined || id == null || id == "") {
            return res.status(400).json({ error: "Id is required" });
        }
        const player: Player | null = await prisma.player.findUnique({
            where: { id: parseInt(id) },
        });

        if (player == null) {
            return res.status(404).json({ error: "Player not found" });
        }
        return res.status(200).json(player);
    } catch (error) {
        console.error("Error fetching player:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//delete player by id

export const deletePlayerById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const id = req.params.id;
        if (id == undefined || id == null || id == "") {
            return res.status(400).json({ error: "Id is required" });
        }

        await prisma.player.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
        console.error("Error deleting player:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//updating player by id
export const updatePlayerById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const id: string = req.params.id;
        const player: Player = req.body;

        if (id == undefined || id == null || id == "") {
            return res.status(400).json({ error: "Id is required" });
        }

        await prisma.player.update({
            where: { id: parseInt(id) },
            data: player as any,
        });
        return res.status(200).json({ message: "Player updated successfully" });
    } catch (error) {
        console.error("Error updating player:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
