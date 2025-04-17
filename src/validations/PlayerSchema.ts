import { z } from "zod";

export const PlayerValidation = z.object({
    name: z.string().nonempty("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters"),

    team: z.string().nonempty("Team is required")
        .min(3, "Team must be at least 3 characters").max(
            50,
            "Team must be at most 50 characters",
        ),

    jersyNo: z.number().min(1, "Jersy number must be at least 1").max(
        100,
        "Jersy number must be at most 100",
    ),

    age: z.number().min(1, "Age must be at least 1"),

    role: z.enum(["Batsman", "Bowler", "AllRounder", "Wicket-Keeper"]),

    noOfMatchPlayed: z.number().min(
        0,
        "Number of matches played must be at least 0",
    ),

    totalRuns: z.number().min(0, "Total runs must be at least 0"),
});
