"use server";
import { z } from "zod";

// export interface toDoItem {
//     readonly id: number;
//     name: string;
//     IsComplete: boolean;
//     DueDate?: Date;
// }

// console.log("hello");

export const toDoItemSchema = z.object({
    name: z.string().min(2),
    isComplete: z.boolean(),
})


export type toDoFields = z.infer<typeof toDoItemSchema>;