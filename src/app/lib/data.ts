import { unstable_noStore as noStore } from 'next/cache';
import prisma from "@/app/lib/db";

export async function fetchTodos() {
    noStore();

    const todos = await prisma.todo.findMany({});

    return todos;
};

export async function fetchTodoById(id: number) {
    noStore();

    const todos = await prisma.todo.findUnique({
        where: {
            id: id
        }
    });

    return todos;
};
