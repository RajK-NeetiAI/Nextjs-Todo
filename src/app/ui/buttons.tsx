import { deleteTodo } from "@/app/lib/actions";
import Link from "next/link";

export function DeleteTodo({ id }: { id: number }) {
    const deleteTodoWithId = deleteTodo.bind(null, id);
    return (
        <form action={deleteTodoWithId}>
            <button>Delete</button>
        </form>
    );
}

export function UpdateTodo({ id }: { id: number }) {
    return (
        <Link href={`/todos/${id}/edit`}>Edit</Link>
    );
}