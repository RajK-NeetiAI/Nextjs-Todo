"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@/app/lib/db";

const TodoSchema = z.object({
    id: z.number(),
    title: z.string(),
    isCompleted: z.string(),
    createdAt: z.string()
});

const CreateTodo = TodoSchema.omit({ id: true, isCompleted: true, createdAt: true });
const UpdateTodo = TodoSchema.omit({ createdAt: true });
const DeleteTodo = TodoSchema.omit({ isCompleted: true, createdAt: true, title: true })

export async function createTodo(formData: FormData) {

    const { title } = CreateTodo.parse({ title: formData.get('title') });

    await prisma.todo.create({
        data: {
            title: title,
            isCompleted: '0'
        }
    })

    revalidatePath('/');
    redirect('/');
}

export async function updateTodo(formData: FormData) {

    const { id, title, isCompleted } = UpdateTodo.parse({ id: Number(formData.get('id')), title: formData.get('title'), isCompleted: formData.get('isCompleted') });

    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: title,
            isCompleted: isCompleted
        }
    })

    revalidatePath('/');
    redirect('/');
}

export async function deleteTodo(id: number) {

    await prisma.todo.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/');
}
