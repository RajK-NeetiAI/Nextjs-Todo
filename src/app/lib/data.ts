import { unstable_noStore as noStore } from 'next/cache';
import bcrypt from "bcryptjs"

import prisma from "@/app/lib/db";
import env from "@/app/lib/env";

export async function fetchTodos() {
    noStore();
    const todos = await prisma.todo.findMany({});

    return todos;
};

export async function fetchTodoById(id: string) {
    noStore();
    const todos = await prisma.todo.findUnique({
        where: {
            id: id
        }
    });

    return todos;
};

export async function getOrCreateUser(email: string, password: string) {
    noStore();
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    const hashedPassword = await bcrypt.hash(password, Number(env.HASH_SALT));
    if (existingUser) {
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
        if (isPasswordMatch) return existingUser;
        return null;
    }
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    });

    return user;
}
